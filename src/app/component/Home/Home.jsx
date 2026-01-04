import React from 'react'
import SpotlightCard from '../Spotlight/Spotlight';
import styles from"./home.module.css"
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  const languages = [
    {
      name: "JavaScript",
      icon: "JS",
      color: "bg-yellow-500",
      path: "/chat/javascript",
      desc: "Web development, Node.js, and frameworks.",
    },

    {
      name: "Java",
      icon: "Jv",
      color: "bg-red-600",
      path: "/chat/java",
      desc: "Enterprise applications and Android development.",
    },
    {
      name: "C++",
      icon: "cpp",
      color: "bg-indigo-700",
      path: "/chat/c++",
      desc: "System programming and game development.",
    },

    {
      name: "React",
      icon: "react",
      color: "bg-cyan-500",
      path: "/chat/react",
      desc: "Fast, compiled, and scalable cloud applications.",
    },
    {
      name: "Rust",
      icon: "Rs",
      color: "bg-orange-500",
      path: "/chat/rust",
      desc: "Performance, memory safety, and concurrency.",
    },
    {
      name: "Python",
      icon: "Py",
      color: "bg-blue-600",
      path: "/chat/python",
      desc: "Data science, backend, and machine learning.",
    },
  ];
  return (
    <div style={{ color: "black" }} className={`${styles.grod}`}>
      {languages.map((lang) => {
        return (
          <div
            key={lang.name}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link href={`${lang.path}`} prefetch={false}>
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(255, 255, 220, 0)"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid gray",
                      borderRadius: "50px",
                      objectPosition: "center",
                    }}
                  >
                    <Image
                      src={`/${lang.icon}.jpg`}
                      width={64}
                      height={64}
                      style={{
                        borderRadius: "50%",
                        // width: "auto",
                        // height:"auto"
                      }}
                      alt="lang"
                    ></Image>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "1.9rem",
                      marginTop: "3px",
                    }}
                  >
                    <div>{lang.name}</div>
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>{lang.desc}</div>
                  <div>
                    <button className={`${styles.sign}`}>Discuss Now</button>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home