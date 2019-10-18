import React, {Component} from "react";
import {Button, Form, Input} from "reactstrap";

class CreateItem extends Component
{
  state = {
    input: ""
  };

  onChange = (e) =>
  {
    this.setState({input: e.target.value});
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
              value={this.state.input}
              onChange={this.onChange}/>
          <Button size="sm" color="primary">Add</Button>
        </Form>);
  }
}

export default CreateItem;
