import axios from "axios"

const API = axios.create({
//    baseURL : "http://localhost:3131",
   baseURL : "https://expense-tracker-4inm.onrender.com",
    withCredentials : true
})
export default API;