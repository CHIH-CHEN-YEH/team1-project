import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./login.module.css";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Login({ setCurrentForm }) {
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    account: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.account) {
      setError("");
      setError("請輸入帳號");
      return;
    }
    if (!formData.password) {
      setError("");
      setError("請輸入密碼");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      await login(formData);
    } catch (error) {
      setError(error.message || "登入失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
      <form className={styles.resgiter} onSubmit={handleSubmit}>
        <div className={styles.top}>

          <div>
           <label><MdAccountCircle  className={styles.icon}/></label> 
          <input
            type="text" // 修改：將 "account" 改為 "text"
            name="account" // 修改：添加 name 屬性
            className={styles.inputGroup}
            placeholder="帳號"
            value={formData.account}
            onChange={handleChange}
          />
          </div>

          <div>
          <label><RiLockPasswordFill  className={styles.icon}/></label>
          <input
            type="password"
            name="password" // 修改：添加 name 屬性
            className={styles.inputGroup}
            placeholder="密碼"
            value={formData.password}
            onChange={handleChange}
          />
          </div>

          <button type="submit" className={styles.btnResgiter}>
            登入
          </button>

          

          <div className={styles.box}>
            <span className={styles.message}>
              {message}
              {error}
            </span>
          </div>

        <div className={styles.test}>
        <div className={styles.check}>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">
              記住我
            </label>
          </div>

          <Link href="/auth/forgot" className={styles.link}>
            <button
              className={styles.forgrt}
              onClick={() => {
                setCurrentForm("forgot");
              }}
            >
              忘記密碼?
            </button>
          </Link>
        </div>
          
        </div>
        <div className={styles.line}>
          <div className={styles.bottom}>
            尚未擁有帳號 <FaArrowRightLong size={20} />
            <Link href="/auth/register">
              <button
                className={styles.btnLogin}
                onClick={() => {
                  setCurrentForm("register");
                }}
              >
                註冊
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
