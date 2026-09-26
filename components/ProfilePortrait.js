import Image from "next/image";

export function ProfilePortrait() {
  return (
    <Image
      src="/profile-optimized.jpg"
      alt="Portrait of Ayan Dutta, full-stack software engineer in Kolkata"
      width={500}
      height={625}
      quality={90}
      sizes="(min-width: 900px) 31rem, calc(100vw - 1.5rem)"
      className="about-image"
    />
  );
}
