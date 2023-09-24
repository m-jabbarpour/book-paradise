import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const SocialLogo: React.FC<Props> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      width={32}
      height={32}
      alt={alt}
      className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
    />
  );
};

export default SocialLogo;
