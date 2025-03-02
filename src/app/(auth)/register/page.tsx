"use client";
import "./register.scss";

import { toast } from "react-toastify";
import Link from "next/link";
import { hookValidate } from "@/components/utilities";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiHooks } from "@/redux/services";
import { actions } from "@/redux/slices";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Register: React.FC = () => {
  // logic redux
  const dispatch = useDispatch();
  const [userRegister] = apiHooks.Register();
  const router = useRouter();

  // State for managing password visibility
  const { inputRegisterField, dataSubmitRegister, showPassword } = useSelector(
    (state: RootState) => state.authFlowData
  );

  // Handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(actions.authFlow.getDataInputRegister({ [name]: value }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, phone, userName } = dataSubmitRegister;

    // Validate input fields
    if (!email || !password || !phone || !userName) {
      toast.error("Vui lòng nhập thông tin cần thiết");
      return;
    }

    // // Validate phone
    if (!hookValidate.phoneNumber(phone)) {
      toast.error("Số điện thoại phải từ 10 đến 11 ký tự");
      return;
    }

    // // Validate password
    if (!hookValidate.password(password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    // Call API for registration
    try {
      const res = await userRegister(dataSubmitRegister).unwrap();
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(
          actions.authFlow.getDataInputRegister({
            email: "",
            password: "",
            phone: "",
            userName: "",
          })
        );

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
          {inputRegisterField.map((field, index) => (
            <div className="input-group" key={`input-register-${index}`}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                value={dataSubmitRegister[field.name] || ""}
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
                value={dataSubmitRegister.password || ""}
                onChange={handleInputChange}
              />
              <span
                className="icon-password"
                onClick={() => dispatch(actions.authFlow.togglePassword())}
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
