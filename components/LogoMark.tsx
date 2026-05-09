import Image from "next/image";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-zj.svg"
      alt="Zakariya Jabbar ZJ logo"
      width={433}
      height={497}
      priority
      draggable={false}
      className={`logo-mark select-none ${className}`}
      style={{ height: "auto" }}
    />
  );
}
