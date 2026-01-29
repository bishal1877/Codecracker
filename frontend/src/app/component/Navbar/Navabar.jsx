"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navinner}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.PNG"
            width={20}
            height={20}
            style={{ height: "auto" }}
            alt="logo"
          />
          <Link href="/" className={styles.logo}>
            CodeCracker
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul
          className={`${styles.navLinks} ${isOpen ? styles.navLinksActive : ""}`}
        >
          <li>
            <Link href="/" className={styles.link} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.link} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/forums" className={styles.link} onClick={closeMenu}>
              Forums
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.link} onClick={closeMenu}>
              Contact
            </Link>
          </li>

          <li className={styles.mobileAuthItem}>
            <SignedOut>
              <SignInButton>
                <button className={styles.sign}>Sign in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>

        <div className={styles.desktopAuth}>
          <SignedOut>
            <SignInButton>
              <button className={styles.sign} style={{cursor:"pointer"}}>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
