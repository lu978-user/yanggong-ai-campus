type GooseParticle = {
  x: string;
  y: string;
  size: number;
  delay: string;
  duration: string;
  rotate: string;
  opacity: string;
  tint: "white" | "warm";
  mobile?: boolean;
};

const particles: GooseParticle[] = [
  { x: "8%", y: "18%", size: 30, delay: "0s", duration: "18s", rotate: "-8deg", opacity: "0.12", tint: "warm", mobile: true },
  { x: "18%", y: "76%", size: 22, delay: "-5s", duration: "16s", rotate: "5deg", opacity: "0.1", tint: "white" },
  { x: "34%", y: "28%", size: 18, delay: "-9s", duration: "20s", rotate: "-3deg", opacity: "0.09", tint: "white" },
  { x: "48%", y: "82%", size: 26, delay: "-2s", duration: "17s", rotate: "7deg", opacity: "0.11", tint: "warm", mobile: true },
  { x: "62%", y: "16%", size: 20, delay: "-7s", duration: "19s", rotate: "-4deg", opacity: "0.09", tint: "white" },
  { x: "72%", y: "62%", size: 42, delay: "-3s", duration: "22s", rotate: "4deg", opacity: "0.14", tint: "white", mobile: true },
  { x: "86%", y: "22%", size: 28, delay: "-11s", duration: "18s", rotate: "-9deg", opacity: "0.1", tint: "warm" },
  { x: "92%", y: "78%", size: 20, delay: "-4s", duration: "15s", rotate: "6deg", opacity: "0.08", tint: "white" },
  { x: "12%", y: "48%", size: 16, delay: "-13s", duration: "21s", rotate: "-6deg", opacity: "0.08", tint: "white" },
  { x: "42%", y: "8%", size: 24, delay: "-6s", duration: "18s", rotate: "5deg", opacity: "0.09", tint: "warm" },
  { x: "58%", y: "44%", size: 18, delay: "-10s", duration: "16s", rotate: "-2deg", opacity: "0.08", tint: "white", mobile: true },
  { x: "80%", y: "42%", size: 22, delay: "-8s", duration: "20s", rotate: "8deg", opacity: "0.09", tint: "warm" },
];

function GooseIcon() {
  return (
    <svg viewBox="0 0 72 48" aria-hidden="true" className="block h-full w-full">
      <path
        d="M15.9 34.6c2.7-9.1 10.5-15.3 20.1-15.3h11.3c4.4 0 8.6 1.7 11.7 4.8l2.6 2.6-5.6 1.6c-2.7.8-5.7.4-8.1-1l-2.9-1.7h-8.6c-6.9 0-12.4 4.1-14.5 10.5l-.9 2.7H15l.9-4.2Z"
        fill="currentColor"
      />
      <path
        d="M32.6 20.4c-1.4-6.2 1-12 6.2-15.2 3.6-2.2 7.9-2.5 11.6-.9l2.9 1.3-2.8 1.6c-3.8 2.2-5.8 5.4-5.8 9.5v4.6H34.1l-1.5-.9Z"
        fill="currentColor"
      />
      <path
        d="M48.5 11.1c2.4-1.6 5.4-1.8 8.5-.4l4.1 1.8-3.5 2c-2 1.1-4.5.9-6.3-.5l-2.8-2.9Z"
        fill="currentColor"
      />
      <path
        d="M10.7 38.4h46.1c-4.7 5.1-12 7.9-22.2 7.9H10.1c-2.6 0-4.7-2.1-4.7-4.7 0-1.8 1.1-3.3 2.6-4l2.7.8Z"
        fill="currentColor"
      />
      <circle cx="53.6" cy="10.8" r="1.4" fill="#0F2A5F" opacity="0.5" />
    </svg>
  );
}

export function WhiteGooseParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`${particle.x}-${particle.y}-${index}`}
          className={`ypi-goose-particle absolute ${particle.mobile ? "block" : "hidden md:block"} ${
            particle.tint === "warm" ? "text-[#FFF7E6]" : "text-white"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: Math.round(particle.size * 0.66),
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            ["--goose-rotate" as string]: particle.rotate,
          }}
        >
          <GooseIcon />
        </span>
      ))}
    </div>
  );
}
