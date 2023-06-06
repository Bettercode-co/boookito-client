import Axios from "axios"


export let AxiosInstance = Axios.create({
    baseURL : "https://api.boookito.ir/api/v2"
})