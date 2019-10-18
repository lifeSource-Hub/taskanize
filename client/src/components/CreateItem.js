import React, {Component} from "react";
import {Button, Form, Input} from "reactstrap";

class CreateItem extends Component
{
  state = {
    input: ""
  };

  render()
  {
    return (
        <Form inline onSubmit={this.props.onSubmit}>
          <label htmlFor="newItemText">New Item: </label>
          <Input
              type="text"
              bsSize="sm"
              name="input"
              id="newItemText"
              className="ml-1 mr-2"
              value={this.props.input}
              onChange={this.props.onChange}/>
          <Button size="sm" color="primary">Add</Button>
        </Form>);
  }
}

export default CreateItem;
