import React from 'react';
import Octicon, {MarkGithub} from "@primer/octicons-react";

const Footer = () =>
{
  const getCurrentYear = () =>
  {
    return (new Date()).getFullYear();
  };

  return (
    <footer>
      <span>&copy; {getCurrentYear()} Nicholas Talbert</span>
        <a className="githubIconLink" href="https://github.com/lifeSource-Hub/repositories">
          <Octicon icon={MarkGithub} size="medium"/>
        </a>
        <a href="https://www.linkedin.com/in/n-talbert/">
          <img src={require("../../images/linkedinBlack.png")} alt="LinkedIn icon"/>
        </a>
    </footer>);
};

export default Footer;
