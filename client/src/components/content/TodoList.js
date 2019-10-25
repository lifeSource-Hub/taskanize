import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import IncompleteList from "./IncompleteList";
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

const TodoList = () =>
{
  const [state, setState] = useState({
    newItemInput: "",
    priority: "Med",
    editInput: "",
    defaultInput: "",
    editId: "",
    modalOpen: false,
    items: []
  });

  useEffect(() =>
  {
    const URL = "/api/incomplete";
    axios.get(URL)
        .then(res =>
        {
          setState(state => ({...state, items: res.data}));
        })
        .catch(() => console.warn(`Can’t access GET '${URL}'`));
  }, []);

  const markComplete = (selectedItem) =>
  {
    const URL = "/api/incomplete/" + selectedItem._id;
    axios.post(URL)
        .then(res =>
        {
          // Remove item from state
          setState(state => ({
            ...state,
            items: state.items.filter(item => item._id !== selectedItem._id)
          }));

          console.log(`Complete item operation success: ${res.data.success}`);
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  const deleteItem = (selectedItem) =>
  {
    const URL = "/api/incomplete/" + selectedItem._id;
    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state
          setState(state => ({
            ...state,
            items: state.items.filter(item => item._id !== selectedItem._id)
          }));

          console.log(`Delete operation success: ${res.data.success}`);
        })
        .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  const editItem = (selectedItem) =>
  {
    setState(state => ({
      ...state,
      editId: selectedItem._id, defaultInput: selectedItem.body
    }));

    toggle();
  };

  const onChangeEdit = (e) =>
  {
    e.persist();
    setState(state => ({...state, editInput: e.target.value}));
  };

  const onSubmitEdit = (e) =>
  {
    e.preventDefault();
    toggle();

    if (state.editInput !== "")
    {
      const newItem = {
        body: state.editInput
      };

      const URL = "/api/incomplete/" + state.editId;

      axios.put(URL, newItem)
          .then(res =>
          {
            // Update item in state
            let newItems = state.items.slice();
            newItems.find(item => item._id === state.editId)
                .body = state.editInput;
            setState(state => ({...state, items: newItems}));

            console.log(`Edit operation success: ${res.data.success}`);
          })
          .catch(() => console.warn(`Can’t access PUT '${URL}'`));
    }
  };

  // Toggles item edit modal
  const toggle = () =>
  {
    setState(state => ({...state, modalOpen: !(state.modalOpen)}));
  };

  // Set new item input into state
  const onChangeNewItem = (e) =>
  {
    e.persist();
    setState(state => ({...state, newItemInput: e.target.value}));
  };

  const onPriorityChange = (priority) =>
  {
    setState(state => ({...state, priority}));
  };

  const onSubmitNewItem = (e) =>
  {
    e.preventDefault();

    if (state.newItemInput !== "")
    {
      const newItem = {
        body: state.newItemInput,
        priority: state.priority
      };

      const URL = "/api/incomplete/add";
      axios.post(URL, newItem)
          .then(res =>
          {
            setState(state => ({
              ...state,
              newItemInput: "",
              items: [res.data, ...state.items]
            }));
          })
          .catch(() => console.warn(`Can’t access POST '${URL}'`));
    }
  };

  return (
      <React.Fragment>
        <h3>To Do List</h3><br/>
        <CreateItem
            priority={state.priority}
            newItemInput={state.newItemInput}
            onChange={onChangeNewItem}
            onPriorityChange={onPriorityChange}
            onSubmit={onSubmitNewItem}/>
        <br/>
        <IncompleteList
            items={state.items}
            editItem={editItem}
            deleteItem={deleteItem}
            markComplete={markComplete}/>

        <Modal isOpen={state.modalOpen} toggle={toggle} className="editModal">
          <ModalHeader className="bg-info" toggle={toggle}>Edit</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={onSubmitEdit}>
              <InputGroup size="sm" className="w-100">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>New Body:</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    name="editInput"
                    className="mr-2"
                    maxLength="80"
                    defaultValue={state.defaultInput}
                    onChange={onChangeEdit}/>
                <Button size="sm" color="success">Submit</Button>
              </InputGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>);
};

export default TodoList;
