
import  { useRouter } from "next/router"

export default function Logout(){
    const router=useRouter();
    if (typeof window !== "undefined") {
        localStorage.clear()
        router.push('/login')
      }
   
    return <div>logout</div>
}