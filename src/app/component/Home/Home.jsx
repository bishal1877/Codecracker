import React from 'react'
import SpotlightCard from '../Spotlight/Spotlight';
import styles from"./home.module.css"

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
      name: "Python",
      icon: "Py",
      color: "bg-blue-600",
      path: "/chat/python",
      desc: "Data science, backend, and machine learning.",
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
      icon: "C++",
      color: "bg-indigo-700",
      path: "/chat/cpp",
      desc: "System programming and game development.",
    },
    {
      name: "Go",
      icon: "Go",
      color: "bg-cyan-500",
      path: "/chat/go",
      desc: "Fast, compiled, and scalable cloud applications.",
    },
    {
      name: "Rust",
      icon: "Rs",
      color: "bg-orange-500",
      path: "/chat/rust",
      desc: "Performance, memory safety, and concurrency.",
    },
  ];
  return (
    <div style={{ color: "black" }} className={`${styles.grod}`}>
      {languages.map((lang) => {
        return (
          <div key={lang.name} style={{display:"flex",justifyContent:"center"}} >
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(255, 255, 220, 0)"
            >
              <div style={{ display: "flex", justifyContent: "center" ,fontSize:"1.9rem"}}>
                <div>{lang.name}</div>
              </div>
              {lang.desc}
            </SpotlightCard>
          </div>
        );
      })}
    </div>
  );
}

export default Home