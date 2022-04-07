import React from "react";

const Footer = () => {
  return (
    <div className="card text-center">
      <div className="project-creaters-div">
        <p className="card-footer text-muted">Designed with BootStrap5 </p>
      </div>
      <div className="project-creators-social-media">
        <p>
          Luther Anderson{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/lutheranders1"
          >
            <img
              src="https://iconape.com/wp-content/png_logo_vector/git-square.png"
              width="35px"
              height="25px"
              alt="Git logo"
            />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/luther-andrew-anderson-b6754663/"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              width="35px"
              height="25px"
              alt="Linkedin Logo"
            />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
