/**
 * Edarah job applications -> Google Sheet + Google Drive
 *
 * SETUP
 * 1. Create a Google Sheet (any name). Open  Extensions > Apps Script  and paste this file.
 * 2. Create a Drive folder for the uploaded files and copy its ID
 *    (the last part of the folder URL).
 * 3. Fill in SECRET and DRIVE_FOLDER_ID below. SECRET can be any long random string;
 *    the same value goes into GOOGLE_SCRIPT_SECRET in your Next.js .env.
 * 4. Deploy > New deployment > type "Web app"
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Approve the Sheets + Drive permissions, then copy the "Web app URL"
 *    into GOOGLE_SCRIPT_URL in your .env.
 * 5. After you change this code, use Deploy > Manage deployments > Edit > New version.
 */

const SECRET =
  "bupU61SOdIHi8I5Yf99GUJ9YR0RVx89RlqJJmlphuJZb50DEeO3561b9LIvQgQGqhSTy6qLYhw0FjBcdGxEooM2fylFAeTEutSqX0SbfZeC67lyQzAMvQFJw7ElhZwfTJvzfq";
const DRIVE_FOLDER_ID = "CHANGE_ME_DRIVE_FOLDER_ID";
const SHEET_NAME = "Applications";
const TIMEZONE = "Asia/Riyadh";

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET)
      return out({ ok: false, error: "unauthorized" });

    const record = body.record || {};
    const files = body.files || [];
    const now = new Date();

    // 1) Save uploaded files to a new Drive sub-folder, keep the links
    if (files.length) {
      const root = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const stamp = Utilities.formatDate(now, TIMEZONE, "yyyy-MM-dd_HHmmss");
      const person = String(record["Full Name"] || "applicant")
        .replace(/[\\\/:*?"<>|]/g, "")
        .slice(0, 40);
      const folder = root.createFolder(stamp + " - " + person);

      const links = {};
      files.forEach(function (f) {
        const blob = Utilities.newBlob(
          Utilities.base64Decode(f.content),
          f.mimeType,
          f.name,
        );
        const file = folder.createFile(blob);
        (links[f.column] = links[f.column] || []).push(file.getUrl());
      });
      Object.keys(links).forEach(function (col) {
        record[col] = links[col].join("\n");
      });
      record["Files Folder"] = folder.getUrl();
    }

    // 2) Append a row. Columns are matched by header name, so new fields
    //    just create new columns and old rows are never shifted.
    const ordered = {
      "Submitted At": Utilities.formatDate(
        now,
        TIMEZONE,
        "yyyy-MM-dd HH:mm:ss",
      ),
    };
    Object.keys(record).forEach(function (k) {
      ordered[k] = record[k];
    });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const lastCol = sheet.getLastColumn();
    const headers = lastCol
      ? sheet.getRange(1, 1, 1, lastCol).getValues()[0]
      : [];
    Object.keys(ordered).forEach(function (h) {
      if (headers.indexOf(h) === -1) headers.push(h);
    });
    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight("bold");
    sheet.setFrozenRows(1);

    const row = headers.map(function (h) {
      return ordered[h] === undefined || ordered[h] === null
        ? ""
        : String(ordered[h]);
    });
    const target = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    // Text format: keeps leading zeros (0127...), long IDs/IBANs, and stops "=..." being run as a formula
    target.setNumberFormat("@").setValues([row]);

    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
