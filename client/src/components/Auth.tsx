import  {  useState } from 'react'
import API from '../api';
import {  useNavigate } from 'react-router-dom';

function Auth() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const navigate = useNavigate();


    const handleSignup = async () => {
  try {
    setError("");
    setSuccess("");
    await API.post("/signup", { email, password });
    setSuccess("User created successfully! Please log in.");
  } catch (err) {
    setError("enter valid inputs dude.");
    console.log(err);
  }
};

const handleLogin = async () => {
  try {
    setError("");
    setSuccess("");
    await API.post("/login", { email, password });

     setSuccess("Logged in successfully!");
     navigate("/homepage");
    
  } catch (err : any) {
    const mesg = err.response?.data?.message ||
    err.response?.data?.errors?.email?._errors?.[0] ||
    err.response?.data?.errors?.password?._errors?.[0] ||
     "Error logging in";
    setError(mesg);
   
  }
};


 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-200">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login / Signup
        </h1>

        <input
          className="w-full border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 mb-4 p-3 rounded-xl h-12 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 mb-6 p-3 rounded-xl h-12 outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 font-semibold text-center mb-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 font-semibold text-center mb-3">
            {success}
          </p>
        )}

        <div className="flex gap-3">

          <button
            onClick={handleLogin}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-bold transition"
          >
            Login
          </button>

          <button
            onClick={handleSignup}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl font-bold transition"
          >
            Signup
          </button>

        </div>

      </div>
    </div>
  );
}



export default Auth