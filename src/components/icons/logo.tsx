import React from "react";

interface LogoProps {
  width: number;
  height: number;
}

interface WrappedLogoProps {
  scale: number;
  adjusted: boolean;
}

export function Logo({ width, height }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <path
        d="m0 0h24v24h-24z"
        fill="#fff"
        opacity="0"
        transform="matrix(-1 0 0 -1 24 24)"
      />
      <g fill="#E86A2F">
        <path d="m3.24 7.29 8.52 4.63a.51.51 0 0 0 .48 0l8.52-4.63a.44.44 0 0 0 -.05-.81l-8.52-3.48a.5.5 0 0 0 -.38 0l-8.52 3.48a.44.44 0 0 0 -.05.81z" />
        <path d="m20.71 10.66-1.83-.78-6.64 3.61a.51.51 0 0 1 -.48 0l-6.64-3.61-1.83.78a.48.48 0 0 0 0 .85l8.52 4.9a.46.46 0 0 0 .48 0l8.52-4.9a.48.48 0 0 0 -.1-.85z" />
        <path d="m20.71 15.1-1.56-.68-6.91 3.76a.51.51 0 0 1 -.48 0l-6.91-3.76-1.56.68a.49.49 0 0 0 0 .87l8.52 5a.51.51 0 0 0 .48 0l8.52-5a.49.49 0 0 0 -.1-.87z" />
      </g>
    </svg>
  );
}

export function WrappedLogo({ scale, adjusted }: WrappedLogoProps) {
  return (
    <div
      className={`flex justify-center items-center gap-1`}
      style={{ transform: `scale(${scale})`, position: "relative" }}
    >
      <div className={`flex ${adjusted ? "absolute -left-7" : "relative"}`}>
        <Logo width={24} height={24} />
      </div>
      <div className="font-bold text-xl whitespace-nowrap">Stackster</div>
    </div>
  );
}
