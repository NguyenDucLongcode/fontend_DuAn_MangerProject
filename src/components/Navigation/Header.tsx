"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { actions } from "@/redux/slices/index";
import { useDispatch } from "react-redux";

const Header = () => {
  // logic redux
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => {
    return state.authReducerData;
  });
  // react state
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuItems: string[] = ["Home", "Users", "Roles", "Contact"];
  const menuUrls: string[] = ["/", "/users", "/roles", "/contact"];
  const pathname = usePathname();
  const router = useRouter();

  // handler
  const handleMenuToggle = (): void => {
    setMenuOpen((prevState) => !prevState);
  };

  const handlerLogout = (): void => {
    dispatch(actions.auth.logout());
    router.push("/login");
  };

  return (
    <header className={`header ${menuOpen ? "open" : ""}`}>
      <div className="logo">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={60} height={60} priority />
        </Link>
      </div>

      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        {menuItems.map((item, index) => (
          <Link
            key={item}
            href={menuUrls[index]}
            className={pathname === menuUrls[index] ? "active" : ""}
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="right-section">
        <input type="text" placeholder="Search..." className="search-box" />
        {isAuthenticated ? (
          <button onClick={handlerLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="login-btn">login</button>
          </Link>
        )}
      </div>

      <div className="toggle" onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
