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
  InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";


(function ()
{
  // delete axios.defaults.headers.common["authToken"];
  // axios.defaults.headers.common = {};
  if (localStorage.getItem("authToken"))
  {
    axios.defaults.headers.common["authToken"] = localStorage.getItem("authToken");
  }
  else
  {
    delete axios.defaults.headers.common["authToken"];
  }
})();

const TodoList = () =>
{
  const [state, setState] = useState({
    newItemInput: "",
    priority: "Med",
    bodyUpdate: "",
    defaultInput: "",
    editId: "",
    modalOpen: false,
    priorityDropIsOpen: false,
    priorityUpdate: "",
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
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  const deleteItem = (selectedItem) =>
  {
    const URL = "/api/incomplete/" + selectedItem._id;
    axios.delete(URL)
        .then(res =>
        {
          console.log("Yes");
          // Remove item from state
          setState(state => ({
            ...state,
            items: state.items.filter(item => item._id !== selectedItem._id)
          }));
        })
        .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  const editItem = (selectedItem) =>
  {
    setState(state => ({
      ...state,
      editId: selectedItem._id,
      defaultInput: selectedItem.body,
      priorityUpdate: selectedItem.priority
    }));

    toggle();
  };

  const onChangeEdit = (e) =>
  {
    e.persist();
    setState(state => ({...state, bodyUpdate: e.target.value}));
  };

  const onChangeEditPriority = (priority) =>
  {
    setState(state => ({...state, priorityUpdate: priority}));
  };

  const toggleDropdown = () =>
  {
    setState(state => ({...state, priorityDropIsOpen: !(state.priorityDropIsOpen)}));
  };

  const onSubmitEdit = (e) =>
  {
    e.preventDefault();
    toggle();

    if (state.bodyUpdate !== "")
    {
      const newItem = {
        body: state.bodyUpdate,
        priority: state.priorityUpdate
      };

      const URL = "/api/incomplete/" + state.editId;

      axios.put(URL, newItem)
          .then(res =>
          {
            // Update item in state
            let listCopy = state.items.slice();

            const index = listCopy.findIndex(item => item._id === state.editId);
            listCopy[index].body = state.bodyUpdate;
            listCopy[index].priority = state.priorityUpdate;

            setState(state => ({...state, items: listCopy}));
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
      const postData = {
        token: localStorage.getItem("authToken"),
        newItem: {
          body: state.newItemInput,
          priority: state.priority
        }
      };

      const URL = "/api/incomplete/add";
      axios.post(URL, postData)
          .then(res =>
          {
            setState(state => ({
              ...state,
              newItemInput: "",
              items: [res.data, ...state.items]
            }));
          })
          .catch(() =>
          {
            console.warn(`Can’t access POST '${URL}'`);
          });
    }
  };

  return (
      <React.Fragment>
        <h3 className="shadowedHeading">To Do List</h3><br/>
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
                    name="bodyUpdate"
                    maxLength="80"
                    defaultValue={state.defaultInput}
                    onChange={onChangeEdit}/>

                <InputGroupAddon className="mr-2" addonType="append">
                  <Dropdown size="sm" isOpen={state.priorityDropIsOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                      {"Priority: " + state.priorityUpdate}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                          onClick={onChangeEditPriority.bind(null, "High")}>High</DropdownItem>
                      <DropdownItem
                          onClick={onChangeEditPriority.bind(null, "Med")}>Medium</DropdownItem>
                      <DropdownItem
                          onClick={onChangeEditPriority.bind(null, "Low")}>Low</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </InputGroupAddon>

                <Button size="sm" color="success">Submit</Button>
              </InputGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>);
};

export default TodoList;
