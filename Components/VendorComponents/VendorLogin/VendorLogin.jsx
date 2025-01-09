import React, { useState } from "react";
import "./VendorLogin.scss";
import Image from "next/image";
import Link from "next/link";
import SecHeading from "@/components/SecHeading/SecHeading";
import CustomInput from "@/components/CustomInput/CustomInput";
import { VendorServices } from "@/Services/VendorServices/VendorServices";

function VendorLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleLogin = () => {
    VendorServices.login();
  };
  return (
    <section
      className="vendorLoginSec"
      style={{ backgroundImage: "url(/images/login/login_bg_blur.jpg)" }}
    >
      <div className="login-container">
        <SecHeading heading="Login" className="text-center" />
        <div className="loginRow">
          <div className="image-side">
            <figure>
              <Image
                quality={100}
                loading="eager"
                src={"/images/login/login-img.webp"}
                alt="Home Banner"
                width={330}
                height={200}
              />
            </figure>
            <p>
              Expand your reach with OneTapDrive and get a steady stream of
              leads to grow your business like never before.
            </p>
          </div>
          <div className="form-side">
            <form onSubmit={handleLogin} id="loginForm">
              <CustomInput
                placeholder={"Email Address"}
                inputType={'email'}
                required
                leftIcon={'fas fa-envelope'}
              />
              <CustomInput
                inputType={"password"}
                placeholder={"Password"}
                required
                leftIcon={'fas fa-lock'}
              />

              <Link href={""} className="forget_pass">
                Forgot Password?
              </Link>

              <button type="submit" className="themeBtn">
                Sign In
              </button>
            </form>
            <p className="signup_link">
              {`Don't have an account?`} {" "}
              <Link href={""} className="forget_pass">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorLogin;
