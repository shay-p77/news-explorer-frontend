import React from "react";
import "./About.css";
import authorImage from "../../assets/me.jpeg";

function About() {
  return (
    <section className="about">
      <div className="about__photo">
        <img src={authorImage} alt="Author" className="about__image" />
      </div>
      <div className="about__text">
        <h2 className="about__title">About the author</h2>

        <p className="about__subtitle">
          Hi, I'm Shay Paley - a full-stack developer with a passion for
          creating clean, responsive web applications. I specialize in HTML,
          CSS, JavaScript, React, Node.js, and MongoDB.
        </p>

        <p className="about__subtitle">
          I've studied web development through TripleTen, where I learned how to
          build everything from client-side interfaces to full backend servers.
          This project is part of that journey and shows how I can connect a
          frontend to a real API, handle user interaction, and follow
          professional design specs.
        </p>

        <p className="about__subtitle">
          I'm excited to work with clients and teams who care about great UX and
          meaningful products. Let's build something awesome together.
        </p>
      </div>
    </section>
  );
}

export default About;
