import React, {Component} from 'react';
import axios from "axios";
import uuid from "uuid";
import {
  Button,
  Form,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class List extends Component
{
  state = {
    input: "",
    items: []
  };

  componentDidMount()
  {
    const URL = "/api/items";
    axios.get(URL)
        .then(res =>
        {
          console.log("Initial list: ");
          console.log(res.data);
          this.setState({items: res.data});
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  }

  editItem(e)
  {
    console.log(`Editing element with id '${e.target.parentElement.id}'`);
  }

  deleteItem = (item) =>
  {
    console.log(`Deleting item '${item.body}'`);
    // const updatedList = this.state.items.filter(element => item !== element);
    this.setState({items: this.state.items.filter(element => item !== element)});
  };

  markComplete(e)
  {
    console.log(`Completed element with id '${e.target.parentElement.id}'`);
    document.getElementById(e.target.parentElement.id).remove();
  }

  onChange = (e) =>
  {
    this.setState({input: e.target.value});
  };

  onSubmit = (e) =>
  {
    e.preventDefault();
    // const send = "post text";
    // const URL = "/api/items";
    // axios.get(URL)
    //     .then(res => console.log(res.data))
    //     .catch(() => console.log(`Can’t access '${URL}'`));

    if (this.state.input !== "")
    {
      const newItem = {
        body: this.state.input,
        id: uuid()
      };

      console.log("Adding item: " + JSON.stringify(newItem));
      this.setState({items: [...this.state.items, newItem], input: ""});
    }
  };

  render()
  {
    return (
        <React.Fragment>
          <h3>To Do List</h3><br/>

          <Form inline onSubmit={this.onSubmit}>
            <label htmlFor="newItemText">New Item: </label>
            <Input
                type="text"
                bsSize="sm"
                name="input"
                id="newItemText"
                value={this.state.input}
                onChange={this.onChange}/>
            <Button size="sm" color="primary">Add</Button>
          </Form><br/>

          <ListGroup>
            {this.state.items.map((item) =>
                <ListGroupItem id={item._id} key={item._id}>
                  <Button size="sm" onClick={this.editItem}>Edit</Button>
                  <Button
                      size="sm"
                      color="danger"
                      onClick={this.deleteItem.bind(null, item)}>
                    Delete
                  </Button>
                  <Button size="sm" color="success" onClick={this.markComplete}>
                    Complete
                  </Button>
                  <span>{item.body}</span>
                </ListGroupItem>)}
          </ListGroup>

          <br/>
        </React.Fragment>
    );
  }
}

export default List;
