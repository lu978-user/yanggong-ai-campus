"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    setEnabled(finePointer.matches && window.innerWidth >= 768);

    function handleMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
      setRingPosition((current) => ({
        x: current.x + (event.clientX - current.x) * 0.22,
        y: current.y + (event.clientY - current.y) * 0.22,
      }));
    }

    function handlePointerOver(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a,button,input,textarea,select,[role='button']")));
    }

    function handleDown() {
      setClicking(true);
    }

    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest(
        "a,button,[role='button']",
      ) as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "interaction-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      target.classList.add("ripple-surface");
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    }

    function handleUp() {
      setClicking(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[99999] hidden md:block">
      <span
        className={`fixed rounded-full bg-blue-600 mix-blend-multiply transition-[width,height,background-color] duration-150 dark:bg-white ${
          clicking ? "size-1" : "size-2"
        }`}
        style={{ left: position.x, top: position.y, transform: "translate(-50%, -50%)" }}
      />
      <span
        className={`fixed rounded-full border border-blue-500/70 bg-cyan-300/10 transition-[width,height,border-color,background-color] duration-200 dark:border-white/70 ${
          hovering ? "size-14 border-cyan-400 bg-cyan-300/15" : clicking ? "size-6" : "size-9"
        }`}
        style={{ left: ringPosition.x, top: ringPosition.y, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
