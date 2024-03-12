import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      router.push("/");
    }
  });

  return null;
};

export default Logout;
