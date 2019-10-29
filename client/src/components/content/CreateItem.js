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
// import axios from "axios";

const CreateItem = ({getList}) =>
{
  const [dropIsOpen, setDropIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    body: "",
    priority: "Med"
  });

  const toggleDropdown = () =>
  {
    setDropIsOpen(!(dropIsOpen));
  };

  const onChange = (e) =>
  {
    e.persist();
    setNewItem(newItem => ({...newItem, body: e.target.value}));
  };

  const onChangePriority = (priority) =>
  {
    setNewItem(newItem => ({...newItem, priority}));
  };

  const onSubmit = (e) =>
  {
    e.preventDefault();

    if (newItem.body !== "")
    {
      const URL = "/api/users/add";

      axios.post(URL, newItem)
          .then(res =>
          {
            setNewItem(newItem => ({...newItem, body: "",}));
            getList();
          })
          .catch(() =>
          {
            console.warn(`Can’t access POST '${URL}'`);
          });
    }
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
              value={newItem.body}
              onChange={onChange}/>

          <InputGroupAddon className="mr-2" addonType="append">
            <Dropdown size="sm" isOpen={dropIsOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                {"Priority: " + newItem.priority}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={onChangePriority.bind(null, "High")}>High</DropdownItem>
                <DropdownItem onClick={onChangePriority.bind(null, "Med")}>Medium</DropdownItem>
                <DropdownItem onClick={onChangePriority.bind(null, "Low")}>Low</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </InputGroupAddon>

          <Button size="sm" color="primary">Add</Button>
        </InputGroup>
      </Form>);
};

export default CreateItem;
