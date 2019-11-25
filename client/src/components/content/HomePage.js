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
      <p></p>
      <p>I built this application on the MERN stack: <b>MongoDB</b>, <b>Express.js</b>, <b>React</b>,
        <b>Node.js</b>. It is styled with Reactstrap components and <b>SCSS</b>.</p>
      <br/>
      <h4>Features</h4>
      <p>The main features, currently:</p>
      <ul>
        <li>Login/Registration</li>
        <li>Task Organizer – List with CRUD Functionality</li>
        <li>Set Reminder – Schedule an Email</li>
        <li>Google Map – Markers Set by Fetched and Processed Data</li>
      </ul>
    </>
  );
};

export default HomePage;
