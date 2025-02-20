"use client";
import "./page.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiHooks } from "@/redux/services";
import { actions } from "@/redux/slices";
import { useDispatch } from "react-redux";

interface LoginFormFields {
  email: string;
  password: string;
}

interface InputField {
  label: string;
  type: string;
  name: keyof LoginFormFields;
  id: string;
  placeholder: string;
}

const Login: React.FC = () => {
  // logic redux
  const dispatch = useDispatch();
  const router = useRouter();
  const [userLogin] = apiHooks.Login();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [dataSubmit, setDataSubmit] = useState<LoginFormFields>({
    email: "",
    password: "",
  });

  // List input fields
  const inputFields: InputField[] = [
    {
      label: "Email",
      type: "email",
      name: "email",
      id: "emailLogin",
      placeholder: "Enter your email",
    },
  ];

  // Handler for input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setDataSubmit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle key down event
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (event) event.preventDefault();

    // Validate form
    if (!dataSubmit.email || !dataSubmit.password) {
      toast.error("Vui lòng nhập email và mật khẩu của bạn");
      return;
    }

    // Call API login
    try {
      const res = await userLogin(dataSubmit).unwrap();
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        setDataSubmit({ email: "", password: "" });
        dispatch(actions.auth.login(res.data.dataUser));
        router.replace("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="Login-container">
      <div className="intro_web_login">
        <div className="name_web">WorkNest</div>
        <div className="description">
          <p>
            Trang web giúp quản lý dự án hiệu quả, theo dõi tiến độ, phân công
            công việc và cộng tác nhóm dễ dàng.
          </p>
        </div>
      </div>
      <div className="form-content">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleSubmit}>
          {/* Email Input */}
          {inputFields.map((field, index) => (
            <div className="input-group" key={`input-login-${index}`}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                value={dataSubmit[field.name as keyof LoginFormFields] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="passwordLogin">Password</label>
            <div className="group-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="passwordLogin"
                placeholder="Enter your password"
                value={dataSubmit.password || ""}
                onChange={handleInputChange}
              />
              <span
                className="icon-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="sign" onKeyDown={handleKeyDown}>
            Sign in
          </button>
        </form>

        {/* Sign up link */}
        <p className="signup">
          {`Don't have an account?`} <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
