import React, {Component} from "react";
import {Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

class CreateItem extends Component
{
  render()
  {
    return (
        <Form inline onSubmit={this.props.onSubmit}>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>New Item:</InputGroupText>
            </InputGroupAddon>
            <Input
                type="text"
                name="input"
                className="mr-2"
                value={this.props.newItemInput}
                onChange={this.props.onChange}/>
            <Button size="sm" color="primary">Add</Button>
          </InputGroup>
        </Form>);
  }
}

export default CreateItem;
