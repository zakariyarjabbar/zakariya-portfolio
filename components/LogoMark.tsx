import Image from "next/image";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-zj.svg"
      alt="Zakariya Jabbar ZJ logo"
      width={35}
      height={46}
      priority
      draggable={false}
      className={`logo-mark select-none ${className}`}
    />
  );
}
