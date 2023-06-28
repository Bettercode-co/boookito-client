import { useState } from "react";
import Image from 'next/image';
export default function BlurImage({image}) {
  const [isLoading, setLoading] = useState(true);

  
  return (
        <Image
          alt="not loaded"
          unoptimized={true}
          quality={50}
          src={image}
          loading="lazy"
          layout="fill"
          objectFit="cover"
          className={`
        h-96
          duration-700 ease-in-out group-hover:opacity-75
            ${
              isLoading
                ? "scale-0 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            })`}
          onLoadingComplete={() => setLoading(false)}
        />
  );
}
