import React, {Component} from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class CreateItem extends Component
{
  state = {
    dropdownIsOpen: false
  };

  toggleDropdown = () =>
  {
    this.setState({dropdownIsOpen: !(this.state.dropdownIsOpen)});
  };

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
                maxLength="80"
                value={this.props.newItemInput}
                onChange={this.props.onChange}/>

            <InputGroupAddon className="mr-2" addonType="append">
              <Dropdown size="sm" isOpen={this.state.dropdownIsOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>
                  {"Priority: " + this.props.priority}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.onPriorityChange.bind(null, "High")}>High</DropdownItem>
                  <DropdownItem onClick={this.props.onPriorityChange.bind(null, "Med")}>Medium</DropdownItem>
                  <DropdownItem onClick={this.props.onPriorityChange.bind(null, "Low")}>Low</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroupAddon>

            <Button size="sm" color="primary">Add</Button>
          </InputGroup>
        </Form>);
  }
}

export default CreateItem;
