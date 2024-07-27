"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { getCurrentUser, logout } from '../utils/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(pathname);
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/pages/login');
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
          {user && (
            <>
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
                  href="/settings"
                  className={currentPath === "/settings" ? styles.active : ""}
                >
                  Settings
                </Link>
              </li>
            </>
          )}
          {!user ? (
            <>
              <li className={styles.navItem}>
                <Link
                  href="/pages/login"
                  className={currentPath === "/pages/login" ? styles.active : ""}
                >
                  Login
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/pages/signup"
                  className={currentPath === "/pages/signup" ? styles.active : ""}
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}