import { useEffect } from "react";
import { AxiosInstance } from "../../utils/http";
import { useRouter } from "next/router";

export default function ApiMiddleware () {
    const router = useRouter();
    useEffect(()=>{

        AxiosInstance.get('/ping').then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            router.push('/update')
        })

    },[])
    


    return null
}