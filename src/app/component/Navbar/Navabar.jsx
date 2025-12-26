"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
 import {SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div style={{ display: "flex", columnGap: "10px" }}>
        <Image src="/logo.PNG" width={20} height={2} alt="logo" />
        <Link href="/" className={styles.logo}>
          CodeCracker
        </Link>
      </div>
      {/* Hamburger Icon for Mobile */}
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" /> // X
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger
          )}
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        className={`${styles.navLinks} ${isOpen ? styles.navLinksActive : ""}`}
      >
        <li>
          <Link
            href="/"
            className={styles.link}
            onClick={() => setIsOpen(false)}
            prefetch={false}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={styles.link}
            onClick={() => setIsOpen(false)}
            prefetch={false}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/forums"
            className={styles.link}
            onClick={() => setIsOpen(false)}
            prefetch={false}
          >
            Forums
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={styles.link}
            onClick={() => setIsOpen(false)}
            prefetch={false}
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className={`${styles.navLinks}`}>
        <SignedOut>
          <SignInButton>
            <button className={`${styles.sign}`}>Sign in</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
