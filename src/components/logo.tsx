import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** inverted = light logo for dark backgrounds */
  variant?: "default" | "inverted";
};

export function Logo({
  className = "h-9 w-auto",
  priority = false,
  variant = "default",
}: LogoProps) {
  const src =
    variant === "inverted"
      ? "/obkladerielogosvetle2.webp"
      : "/obkladerielogotmave.webp";

  return (
    <Image
      src={src}
      alt="Obkladerie"
      width={280}
      height={56}
      priority={priority}
      className={`max-w-[min(11.5rem,55vw)] object-contain object-left ${className}`}
    />
  );
}
