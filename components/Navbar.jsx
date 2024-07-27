"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (router) {
      setCurrentPath(router.pathname);
    }
  }, [router]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo}>
          SocialPostAI
        </a>
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
              href="/analytics"
              className={currentPath === "/analytics" ? styles.active : ""}
            >
              Analytics
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
