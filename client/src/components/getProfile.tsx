import { BiLogOut, BiUser } from "react-icons/bi"
import API from "../api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdSettingsApplications } from "react-icons/md"
import { AiOutlineHome } from "react-icons/ai"

function Profile() {

  const [userEmail , setUserEmail] = useState("")

  useEffect(()=>{
    getProfile()
  },[])

  const handleLogout = async () => {
  try {
    await API.post("/logout");
    window.location.href = "/login";
  } catch (err) {
    console.log(err);
  }
}; 

  const getProfile = async ()=>{
    try {
        const res = await API.get("/profile")
        setUserEmail(res.data.user.email)
       
    } catch (err : any) {
        console.log(err)
        if(err.response?.status === 401){
 window.location.href = "/login"       }
    }   
  }
   
  return (
 <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-white flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-green-100">

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-5 rounded-full shadow-inner">
            <BiUser className="text-6xl text-green-600" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Profile
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your account
          </p>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-md border border-gray-100">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-gray-800 text-lg font-semibold break-all mt-1">
            {userEmail}
          </p>
        </div>

        {/* Settings */}
        <div className="mt-6 flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100 hover:shadow transition">
          <MdSettingsApplications className="text-3xl text-green-600" />
          <span className="text-gray-700 font-medium">Account Settings</span>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">

          <Link
            to="/Homepage"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            <AiOutlineHome />
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white py-3 rounded-xl font-semibold transition"
          >
            <BiLogOut />
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}

export default Profile