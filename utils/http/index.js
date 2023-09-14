import Axios from "axios"


export let AxiosInstance = Axios.create({
    //baseURL : "http://localhost:5000/api/v2"
    baseURL : "https://api.boookito.ir/api/v2"

})