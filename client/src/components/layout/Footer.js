import React from 'react';

const Footer = () =>
{
  const getCurrentYear = () =>
  {
    return (new Date()).getFullYear();
  };

  return <footer>&copy; {getCurrentYear()} Nicholas Talbert</footer>;
};

export default Footer;
