import React from "react";
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
  DropdownItem, ModalHeader, ModalBody, Modal
} from "reactstrap";

const EditModal = ({modalIsOpen, toggle, updateItem, setUpdateItem, update}) =>
{
  const toggleDropdown = () =>
  {
    setUpdateItem(updateItem => ({
      ...updateItem,
      priorityDropIsOpen: !(updateItem.priorityDropIsOpen)
    }));
  };

  const onChange = (e) =>
  {
    e.persist();
    setUpdateItem(updateItem => ({...updateItem, body: e.target.value}));
  };

  const onChangePriority = (priority) =>
  {
    setUpdateItem(updateItem => ({...updateItem, priority: priority}));
  };

  const onSubmit = (e) =>
  {
    e.preventDefault();
    toggle();

    if (updateItem.body !== "")
    {
      const updatedItem = {
        id: updateItem.id,
        body: updateItem.body,
        priority: updateItem.priority
      };

      update(updatedItem);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} toggle={toggle} className="editModal">
      <ModalHeader className="bg-info" toggle={toggle}>Edit</ModalHeader>
      <ModalBody>
        <Form inline onSubmit={onSubmit}>
          <InputGroup size="sm" className="w-100">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>New Body:</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="body"
              maxLength="80"
              defaultValue={updateItem.prevBody}
              onChange={onChange}/>

            <InputGroupAddon className="mr-2" addonType="append">
              <Dropdown
                size="sm"
                isOpen={updateItem.priorityDropIsOpen}
                toggle={toggleDropdown}>
                <DropdownToggle outline caret>
                  {"Priority: " + updateItem.priority}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={onChangePriority.bind(null, "High")}>High</DropdownItem>
                  <DropdownItem
                    onClick={onChangePriority.bind(null, "Med")}>Medium</DropdownItem>
                  <DropdownItem
                    onClick={onChangePriority.bind(null, "Low")}>Low</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroupAddon>

            <Button size="sm" color="primary">Submit</Button>
          </InputGroup>
        </Form>
      </ModalBody>
    </Modal>);
};

export default EditModal;
