import Image from "next/image";
import React from "react";
export default function LogoApplication() {
  return (
    <Image
      src="/images/logo.svg"
      alt="The logo could not be loaded"
      width={50}
      height={50}
      className="mx-auto  my-3"
    />
  );
}
