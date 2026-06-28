// export default function Login() {
//     return(

//     <div className="flex  items-center min-h-screen justify-center ">
//     <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm ">
//     <h1 className="text-3xl">This is LOgin page</h1>
//     </div>
//     </div>

//     );

// }

import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios"


export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      //save token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name)
      localStorage.setItem("role", res.data.user.role);



      setMsg("Login Successfull")
      //Redirect to home page
      // 


      // for admin and user both
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        setTimeout(()=>{
        navigate("/");
      },1000)
      }

    } catch (err) {
      setMsg(err.response?.data?.message || "An error occured")
    }
    
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

  <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-green-100 p-8">

    {/* Logo */}
    <div className="flex flex-col items-center mb-6">
      <img
        src="/Logo.png"
        alt="Quick Cart"
        className="w-64 object-contain"
      />

      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        Welcome Back 👋
      </h2>

      <p className="text-gray-500 text-center mt-2">
        Login to continue shopping fresh groceries
      </p>
    </div>

    {msg && (
      <div className="mb-4 text-center text-sm text-green-700 bg-green-100 py-3 rounded-xl">
        {msg}
      </div>
    )}

    {/* Social Login */}
    <div className="flex flex-col gap-3">

      <button
        type="button"
        className="flex items-center justify-center gap-3 border border-gray-300 bg-white py-3 rounded-xl font-medium hover:bg-gray-50 transition"
        onClick={()=>alert("UnderProcess")}
      >
        <img src="google.png" alt="google" className="w-5 h-5" />
        Continue with Google
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
        onClick={()=>alert("UnderProcess")}
      >
        <img src="apple.png" alt="apple" className="w-5 h-5" />
        Continue with Apple
      </button>

    </div>

    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="px-3 text-gray-500 text-sm">OR</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>

    {/* Login Form */}
    <form onSubmit={handleLogin} className="space-y-4">

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="relative">
        <input
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-sm font-medium"
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-green-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition duration-300"
      >
        Login
      </button>

    </form>

    <div className="mt-6 text-center text-gray-600">
      Don't have an account?
      <span
        onClick={() => navigate("/signup")}
        className="text-green-600 font-semibold ml-2 cursor-pointer hover:underline"
      >
        Create Account
      </span>
    </div>

  </div>

</div>
  );
};

