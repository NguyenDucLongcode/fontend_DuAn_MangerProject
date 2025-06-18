"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { handlerLogin } from "@/services/auth.services/auth.services";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login } from "@/lib/redux/slices/auth/reducer";
import { useRouter } from "next/navigation";
import { findUserFromToken } from "@/utils/token/decodeTokenFindUser";

const FormLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  //handler submit api
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call api login
    const res = await handlerLogin({ username: email, password });
    if (res.statusCode === 200) {
      toast.success("Login Success");
      const dataUser = await findUserFromToken(res.data.access_token);

      // dispatch Action
      if (dataUser?.role === "ADMIN") {
        router.push("/admin/dashboard");
      }
      const { access_token } = res.data;
      dispatch(login({ user: dataUser, access_token }));
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-[#f5f8fb] rounded-4xl shadow-lg p-10 w-full max-w-sm text-center border-4 border-white">
        <h2 className="text-3xl font-extrabold text-[#1089d3] mb-8">Sign In</h2>

        {/* form login */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/*email */}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full shadow-sm 
            border border-gray-200 focus:outline-none focus:ring-2
           focus:ring-blue-400"
          />

          {/* password */}
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-full shadow-sm border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* icon */}
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
              {isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-left">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password ?
            </a>
          </div>

          {/* button submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full 
            shadow-md hover:opacity-90 hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>

          {/* social media */}
          <div className="mt-6 text-sm text-gray-500">Or Sign in with</div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-white rounded-full shadow-lg p-2 hover:opacity-90 
            hover:scale-110 transition-transform duration-200"
            >
              <Image
                src="/auth/google.svg"
                alt="Google"
                width={30}
                height={30}
              />
            </button>

            <button
              className="bg-white rounded-full shadow-lg p-2 hover:opacity-90 
            hover:scale-110 transition-transform duration-200"
            >
              <Image
                src="/auth/facebook.svg"
                alt="Facebook"
                width={30}
                height={30}
              />
            </button>

            <button
              className="bg-white rounded-full shadow-lg p-2 hover:opacity-90 
            hover:scale-110 transition-transform duration-200"
            >
              <Image src="/auth/apple.svg" alt="Apple" width={30} height={30} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
