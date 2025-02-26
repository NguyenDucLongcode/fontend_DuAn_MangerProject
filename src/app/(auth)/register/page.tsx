"use client";

import "./register.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { hookValidate } from "@/components/utilities";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiHooks } from "@/redux/services";
import { useRouter } from "next/navigation";

interface DataSubmit {
  email: string;
  password: string;
  phone: string;
  userName: string;
}

interface InputField {
  label: string;
  type: string;
  name: keyof DataSubmit;
  id: string;
  placeholder: string;
}

const Register: React.FC = () => {
  // logic redux
  const [userRegister] = apiHooks.Register();
  const router = useRouter();

  // State for managing password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [dataSubmit, setDataSubmit] = useState<DataSubmit>({
    email: "",
    password: "",
    phone: "",
    userName: "",
  });

  // List of input fields
  const inputFields: InputField[] = [
    {
      label: "Username",
      type: "text",
      name: "userName",
      id: "nameRegister",
      placeholder: "Enter your username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      id: "emailRegister",
      placeholder: "Enter your email",
    },
    {
      label: "Phone",
      type: "number",
      name: "phone",
      id: "phoneRegister",
      placeholder: "Enter your phone",
    },
  ];

  // Handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataSubmit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input fields
    if (
      !dataSubmit.email ||
      !dataSubmit.password ||
      !dataSubmit.phone ||
      !dataSubmit.userName
    ) {
      toast.error("Vui lòng nhập thông tin cần thiết");
      return;
    }

    // // Validate phone
    if (!hookValidate.phoneNumber(dataSubmit.phone)) {
      toast.error("Số điện thoại phải từ 10 đến 11 ký tự");
      return;
    }

    // // Validate password
    if (!hookValidate.password(dataSubmit.password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    // Call API for registration
    try {
      const res = await userRegister(dataSubmit).unwrap();
      if (res && res.errCode === 0) {
        toast.success(res.message);
        setDataSubmit({ email: "", password: "", phone: "", userName: "" });
        router.replace("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <p className="title">Register</p>
        <form className="form" onSubmit={handleSubmit}>
          {/* Group input fields */}
          {inputFields.map((field, index) => (
            <div className="input-group" key={`input-register-${index}`}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                value={dataSubmit[field.name] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

          {/* Password field */}
          <div className="group-password">
            <label htmlFor="passwordRegister">Password</label>
            <div className="field-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="passwordRegister"
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

          {/* Submit button */}
          <button type="submit" className="sign" onKeyDown={handleKeyDown}>
            Submit
          </button>
        </form>

        {/* Login link */}
        <div className="login-message">
          <div className="line"></div>
          <p className="message">
            You have an account? <Link href="/login">Login</Link>
          </p>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
