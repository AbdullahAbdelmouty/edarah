// Small viewfinder-style corner brackets — a restrained nod to
// surveillance/targeting UI, reused across sections as the site's
// one shared security-brand signature motif.
export default function CornerBrackets({
  className = "",
  color = "white",
  inset = "inset-3",
}) {
  return (
    <div className={`pointer-events-none absolute ${inset} ${className}`}>
      {[
        "top-0 right-0 border-t-2 border-r-2 rounded-tr-md",
        "top-0 left-0 border-t-2 border-l-2 rounded-tl-md",
        "bottom-0 right-0 border-b-2 border-r-2 rounded-br-md",
        "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute h-3 w-3 sm:h-4 sm:w-4 ${pos} transition-all duration-500 group-hover:h-5 group-hover:w-5 sm:group-hover:h-6 sm:group-hover:w-6`}
          style={{ borderColor: color, opacity: 0.55 }}
        />
      ))}
    </div>
  );
}
