"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          SocialPost AI
        </Link>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
          <li className={styles.navItem}>
            <Link
              href="/dashboard"
              className={currentPath === "/dashboard" ? styles.active : ""}
            >
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/post-generator"
              className={currentPath === "/post-generator" ? styles.active : ""}
            >
              Generate Post
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/login"
              className={currentPath === "/login" ? styles.active : ""}
            >
              Login
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/signup"
              className={currentPath === "/signup" ? styles.active : ""}
            >
              Sign Up
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/settings"
              className={currentPath === "/settings" ? styles.active : ""}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}