// app/api/career/route.ts
// Receives the multi-step application (JSON in "data" + files as "file:<field>")
// and forwards it to a Google Apps Script web app that writes a row to Google Sheets
// and stores the uploaded files in Google Drive.
//
// Env: GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_SECRET
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60; // Drive uploads can take a few seconds

const MAX_FILE = 5 * 1024 * 1024;
const MAX_TOTAL = 20 * 1024 * 1024;
const MAX_FILES = 8;
const EXTS = [".pdf", ".jpg", ".jpeg", ".png"];
const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

// form field id -> sheet column header (this is also the column order)
const COLUMNS: [string, string][] = [
  ["fullName", "Full Name"],
  ["birthDate", "Date of Birth"],
  ["nationality", "Nationality"],
  ["gender", "Gender"],
  ["marital", "Marital Status"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["city", "City"],
  ["education", "Education"],
  ["major", "Field of Study"],
  ["height", "Height (cm)"],
  ["weight", "Weight (kg)"],
  ["nationalId", "National ID / Iqama"],
  ["iban", "IBAN"],
  ["position", "Position"],
  ["shift", "Preferred Shift"],
  ["preferredCity", "Preferred Location"],
  ["years", "Years of Experience"],
  ["companies", "Previous Companies"],
  ["hasCourses", "Has Courses / Certificates"],
  ["coursesText", "Courses & Certificates"],
  ["sensitiveSites", "Worked at Sensitive Sites"],
  ["sensitiveSiteType", "Sensitive Site Type"],
  ["siteTypes", "Site Types Worked In"],
  ["cctv", "CCTV Experience"],
  ["reports", "Report Writing Experience"],
  ["access", "Access Control Experience"],
  ["firstAid", "First Aid / Emergency Experience"],
  ["standing", "Can Work / Stand Long Hours"],
  ["healthIssue", "Health / Physical Limitation"],
  ["readiness", "Availability to Join"],
  ["locale", "Form Language"],
];

// uploaded file field -> sheet column that receives the Drive link(s)
const FILE_COLUMNS: Record<string, string> = {
  idCopy: "ID Copy",
  coursesFiles: "Course / Certificate Files",
  cv: "CV",
};

// readable (English) values for the coded options
const LABELS: Record<string, Record<string, string>> = {
  gender: { male: "Male", female: "Female" },
  marital: { single: "Single", married: "Married" },
  education: {
    primary: "Primary",
    intermediate: "Intermediate",
    secondary: "Secondary",
    diploma: "Diploma",
    bachelor: "Bachelor's degree",
    postgrad: "Postgraduate",
  },
  position: {
    guard: "Security guard",
    supervisor: "Field supervisor",
    control: "Control room operator",
    events: "Events & crowd management",
    admin: "Administration",
    other: "Other",
  },
  shift: { morning: "Morning", evening: "Evening", midnight: "After midnight" },
  years: {
    none: "No experience",
    lt1: "Less than 1 year",
    "1to3": "1 to 3 years",
    "3to5": "3 to 5 years",
    gt5: "More than 5 years",
  },
  siteTypes: {
    hospitals: "Hospitals",
    malls: "Shopping centres",
    factories: "Factories",
    residential: "Residential sites",
    government: "Government facilities",
    construction: "Construction projects",
  },
  readiness: {
    now: "Immediately",
    week: "Within a week",
    two_weeks: "Within two weeks",
    month: "Within a month",
  },
};
const YESNO = new Set([
  "hasCourses",
  "sensitiveSites",
  "cctv",
  "reports",
  "access",
  "firstAid",
  "standing",
  "healthIssue",
]);

const REQUIRED = [
  "fullName",
  "birthDate",
  "nationality",
  "gender",
  "marital",
  "phone",
  "city",
  "education",
  "height",
  "weight",
  "nationalId",
  "position",
  "shift",
  "years",
  "hasCourses",
  "sensitiveSites",
  "cctv",
  "reports",
  "access",
  "firstAid",
  "standing",
  "healthIssue",
  "readiness",
];

const clean = (v: unknown) =>
  String(v ?? "")
    .trim()
    .slice(0, 2000);

function readable(key: string, raw: unknown): string {
  if (Array.isArray(raw)) {
    const sep = key === "companies" ? "; " : ", ";
    return raw
      .map((x) => LABELS[key]?.[String(x)] ?? clean(x))
      .filter(Boolean)
      .join(sep);
  }
  const s = clean(raw);
  if (YESNO.has(key)) return s === "yes" ? "Yes" : s === "no" ? "No" : s;
  return LABELS[key]?.[s] ?? s;
}

export async function POST(req: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!scriptUrl || !secret) {
    return NextResponse.json(
      { error: "Sheets is not configured" },
      { status: 500 },
    );
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(String(fd.get("data") ?? "{}"));
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // honeypot: pretend success so bots learn nothing
  if (clean(data.company) !== "") return NextResponse.json({ ok: true });

  for (const k of REQUIRED) {
    if (
      !clean(Array.isArray(data[k]) ? (data[k] as unknown[]).join("") : data[k])
    ) {
      return NextResponse.json({ error: `Missing ${k}` }, { status: 422 });
    }
  }
  if (data.agree !== true) {
    return NextResponse.json(
      { error: "Declaration required" },
      { status: 422 },
    );
  }
  const email = clean(data.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // ---- files -> base64 for Apps Script ----
  const files: {
    column: string;
    name: string;
    mimeType: string;
    content: string;
  }[] = [];
  let total = 0;
  for (const [key, value] of fd.entries()) {
    if (
      !key.startsWith("file:") ||
      !(value instanceof File) ||
      value.size === 0
    )
      continue;
    const column = FILE_COLUMNS[key.slice(5)];
    const ext = EXTS.find((x) => value.name.toLowerCase().endsWith(x));
    total += value.size;
    if (
      !column ||
      !ext ||
      value.size > MAX_FILE ||
      total > MAX_TOTAL ||
      files.length >= MAX_FILES
    ) {
      return NextResponse.json({ error: "Invalid file" }, { status: 422 });
    }
    files.push({
      column,
      name: value.name.replace(/[^\w.\- ]/g, "_"),
      mimeType: MIME[ext],
      content: Buffer.from(await value.arrayBuffer()).toString("base64"),
    });
  }
  if (!files.some((f) => f.column === FILE_COLUMNS.idCopy)) {
    return NextResponse.json({ error: "ID copy required" }, { status: 422 });
  }

  // ---- build the row ----
  const record: Record<string, string> = {};
  for (const [id, header] of COLUMNS) record[header] = readable(id, data[id]);

  // ---- send to Google ----
  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, record, files }),
      redirect: "follow",
    });
    console.log("HTTP status:", res.status);
    console.log("Final URL:", res.url);
    console.log("Redirected:", res.redirected);
    console.log("Content-Type:", res.headers.get("content-type"));

    const text = await res.text();

    console.log("Response preview:", text.slice(0, 1000));
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      /* Apps Script returned an HTML error page */
    }
    if (!res.ok || !result.ok) {
      console.error("Google Sheets error:", result.error ?? text.slice(0, 300));
      return NextResponse.json({ error: "Save failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Google Sheets request failed:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
