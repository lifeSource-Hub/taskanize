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
import axios from "axios";

const CreateTask = ({getPriorityColor, setListItems}) =>
{
  const [dropIsOpen, setDropIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    body: "",
    priority: "Med"
  });

  const toggleDropdown = () =>
  {
    setDropIsOpen(!dropIsOpen);
  };

  const onChange = e =>
  {
    e.persist();
    setNewItem(newItem => ({...newItem, body: e.target.value}));
  };

  const onChangePriority = priority =>
  {
    setNewItem(newItem => ({...newItem, priority}));
  };

  const onSubmit = e =>
  {
    e.preventDefault();

    if (newItem.body !== "")
    {
      const URL = "/api/user/tasks/add";

      axios.post(URL, newItem)
        .then(res =>
        {
          setNewItem(newItem => ({...newItem, body: ""}));
          setListItems(res.data);
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
    }
  };

  return (
    <Form inline onSubmit={onSubmit}>
      <InputGroup size="sm">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>New Task:</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="input"
          maxLength="80"
          value={newItem.body}
          onChange={onChange}
        />

        <InputGroupAddon className="mr-2" addonType="append">
          <Dropdown size="sm" isOpen={dropIsOpen} toggle={toggleDropdown}>
            <DropdownToggle outline caret>
              {"Priority: " + newItem.priority}
            </DropdownToggle>
            <DropdownMenu className="dropMenu">
              <DropdownItem onClick={onChangePriority.bind(null, "High")}>
                <span
                  className="dot"
                  style={{backgroundColor: getPriorityColor("High")}}>
                </span>
                High
              </DropdownItem>
              <DropdownItem onClick={onChangePriority.bind(null, "Med")}>
                <span
                  className="dot"
                  style={{backgroundColor: getPriorityColor("Med")}}>
                </span>
                Medium
              </DropdownItem>
              <DropdownItem onClick={onChangePriority.bind(null, "Low")}>
                <span
                  className="dot"
                  style={{backgroundColor: getPriorityColor("Low")}}>
                </span>
                Low
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroupAddon>

        <Button size="sm" color="primary">
          Add
        </Button>
      </InputGroup>
    </Form>
  );
};

export default CreateTask;
