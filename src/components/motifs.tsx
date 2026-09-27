/** A small gold line-art leaf sprig, used as an ornament in dividers and cards. */
export function FloralMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 21 C12 16 12 10 12 3" />
      <path d="M12 13 C8 11 6.5 7.5 8.5 4.5 C11 6.5 12 10 12 13 Z" />
      <path d="M12 13 C16 11 17.5 7.5 15.5 4.5 C13 6.5 12 10 12 13 Z" />
    </svg>
  );
}

export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
      <FloralMotif className="h-4 w-4 text-gold" />
      <span className="h-2 w-2 rotate-45 border border-gold/70" />
      <FloralMotif className="h-4 w-4 text-gold" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

