import React, {Component} from 'react';
import axios from "axios";

class List extends Component
{
  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      contacts: [],
      userEntry: ""
    }
  };

  onSubmit(e)
  {
    e.preventDefault();
    // const send = "sent text" ;

    const URL = "/first/home";

    // fetch(URL)
    // // .then(res => res.text())
    //     .then(data => console.log(data))
    //     .catch(() => console.log("Can’t access " + URL + ". Blocked by browser?"));
    axios.get(URL)
        .then(response => console.log(response.data))
        .catch(() => console.log("Can’t access " + URL + ". Blocked by browser?"));


    // console.log(this.state.contacts);
    // console.log(this.state);
    const text = document.getElementById("changeMe");
    text.innerHTML = " This is some new text.";
  }

  render()
  {
    return (
        <main>
          <h2>Heading</h2>
          <p id="changeMe">Lorem Ipsum</p>
          <br/>
          <button onClick={this.onSubmit}>Button</button>
        </main>);
  }
}

export default List;
