import axios from "axios"

const API = axios.create({
   baseURL : "http://localhost:3131",
    withCredentials : true
})
export default API;