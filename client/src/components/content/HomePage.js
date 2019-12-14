import React from 'react';

const HomePage = () =>
{
  return (
    <>
      <h3>Home</h3>
      <br/>
      <p>Welcome to my web application! I have created various utilities you can use on this site.
        While there are designed to be useful, my primary motivation in creating them is to learn
        and showcase my abilities. More will be added and some of what already exists will be
        improved.</p>
      <p>I built this application on the MERN stack: <i>MongoDB</i>, <i>Express.js</i>,&nbsp;
        <i>React</i>, <i>Node.js</i>. It is styled with Reactstrap components and <i>SCSS</i>.
        Email delivery is powered by <a href="https://sendgrid.com">Twilio SendGrid</a>.</p>
      <br/>
      <h4>Features</h4>
      <p>The main features, currently:</p>
      <ul>
        <li>Login/Registration</li>
        <li>Task Organizer – A user list connected to <i>MongoDB Atlas</i></li>
        <li>Set Reminder – Schedule an email</li>
        <li>Google Map – Markers set by fetched and processed data</li>
      </ul>
    </>
  );
};

export default HomePage;
