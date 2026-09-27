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
    variant === "inverted" ? "/obkladerielogo2.webp" : "/obkladerielogo.webp";

  return (
    <Image
      src={src}
      alt="Obkladérie"
      width={280}
      height={56}
      priority={priority}
      className={className}
    />
  );
}
