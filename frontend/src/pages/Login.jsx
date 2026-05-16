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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55]">

      <div className="w-[380px] bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl text-white text-center">

        <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
        <p className="text-gray-300 mb-5">Login to your account</p>
        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">{msg}</div>
        )}
        {/* SOCIAL LOGIN */}
        <div className="flex flex-col gap-3">

          <button className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md cursor-pointer font-semibold hover:bg-gray-200">
            <img src="google.png" alt="google" className="w-5" />
            Continue with Google
          </button>

          <button className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md cursor-pointer font-semibold hover:bg-gray-800">
            <img src="apple.png" alt="apple" className="w-5" />
            Continue with Apple
          </button>

        </div>

        <div className="my-4 text-gray-300 text-sm">OR</div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-2 rounded-md border border-gray-300 text-black outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded-md  border border-gray-300 text-black outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2 text-sm cursor-pointer text-white-700"
            >
              {showPass ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black  cursor-pointer font-bold py-2 rounded-md hover:bg-orange-500"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-400 cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
};

