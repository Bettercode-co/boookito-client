import { useRouter } from "next/router";
import Login from "../components/Login";
import { useEffect } from "react";

export default function login() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      router.push("/");
    }
  }, []);
  return <Login />;
}
