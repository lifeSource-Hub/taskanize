import React, {useState} from "react";
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

const CreateItem = ({priority, newItemInput, onChange, onPriorityChange, onSubmit}) =>
{
  const [dropIsOpen, setDropIsOpen] = useState(false);

  const toggleDropdown = () =>
  {
    setDropIsOpen(!(dropIsOpen));
  };

    return (
        <Form inline onSubmit={onSubmit}>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>New Item:</InputGroupText>
            </InputGroupAddon>
            <Input
                type="text"
                name="input"
                maxLength="80"
                value={newItemInput}
                onChange={onChange}/>

            <InputGroupAddon className="mr-2" addonType="append">
              <Dropdown size="sm" isOpen={dropIsOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  {"Priority: " + priority}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={onPriorityChange.bind(null, "High")}>High</DropdownItem>
                  <DropdownItem onClick={onPriorityChange.bind(null, "Med")}>Medium</DropdownItem>
                  <DropdownItem onClick={onPriorityChange.bind(null, "Low")}>Low</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroupAddon>

            <Button size="sm" color="primary">Add</Button>
          </InputGroup>
        </Form>);
  };

export default CreateItem;
