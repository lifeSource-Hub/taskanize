import React, {Component} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import IncompleteItems from "./IncompleteItems";
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

class TodoList extends Component
{
  state = {
    _isMounted: false,
    newItemInput: "",
    priority: "Med",
    editInput: "",
    defaultInput: "",
    editId: "",
    modalOpen: false,
    items: []
  };

  componentDidMount()
  {
    const URL = "/api/incomplete";
    axios.get(URL)
        .then(res =>
        {
          this.setState({items: res.data, _isMounted: true});
        })
        .catch(() => console.warn(`Can’t access GET '${URL}'`));
  }

  componentWillUnmount()
  {
    this.setState({_isMounted: false});
  }

  markComplete = (selectedItem) =>
  {
    const URL = "/api/incomplete/" + selectedItem._id;
    axios.post(URL)
        .then(res =>
        {
          // Remove item from state
          this.setState({
            items: this.state.items.filter(item => item._id !== selectedItem._id)
          });
          console.log(`Complete item operation success: ${res.data.success}`);
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  deleteItem = (selectedItem) =>
  {
    const URL = "/api/incomplete/" + selectedItem._id;
    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state
          this.setState({
            items: this.state.items.filter(item => item._id !== selectedItem._id)
          });
          console.log(`Delete operation success: ${res.data.success}`);
        })
        .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  editItem = (selectedItem) =>
  {
    this.setState({editId: selectedItem._id, defaultInput: selectedItem.body});
    this.toggle();
  };

  onChangeEdit = (e) =>
  {
    this.setState({editInput: e.target.value});
  };

  onSubmitEdit = (e) =>
  {
    e.preventDefault();
    this.toggle();

    if (this.state.editInput !== "")
    {
      const newItem = {
        body: this.state.editInput
      };

      const URL = "/api/incomplete/" + this.state.editId;

      axios.put(URL, newItem)
          .then(res =>
          {
            // Update item in state
            let newItems = this.state.items.slice();
            newItems.find(item => item._id === this.state.editId)
                .body = this.state.editInput;
            this.setState({items: newItems});

            console.log(`Edit operation success: ${res.data.success}`);
          })
          .catch(() => console.warn(`Can’t access PUT '${URL}'`));
    }
  };

  // Toggles item edit modal
  toggle = () =>
  {
    this.setState({modalOpen: !(this.state.modalOpen)});
  };

  // Set new item input into state
  onChangeNewItem = (e) =>
  {
    this.setState({newItemInput: e.target.value});
  };

  onPriorityChange = (priority) =>
  {
    this.setState({priority});
  };

  onSubmitNewItem = (e) =>
  {
    e.preventDefault();

    if (this.state.newItemInput !== "")
    {
      const newItem = {
        body: this.state.newItemInput,
        priority: this.state.priority
      };

      const URL = "/api/incomplete/add";
      axios.post(URL, newItem)
          .then(res =>
          {
            this.setState({
              newItemInput: "",
              items: [res.data, ...this.state.items]
            });
          })
          .catch(() => console.warn(`Can’t access POST '${URL}'`));
    }
  };

  render()
  {
    return (
        <React.Fragment>
          <h3>To Do List</h3><br/>
          <CreateItem
              priority={this.state.priority}
              newItemInput={this.state.newItemInput}
              onChange={this.onChangeNewItem}
              onPriorityChange={this.onPriorityChange}
              onSubmit={this.onSubmitNewItem}/>
          <br/>
          <IncompleteItems
              items={this.state.items}
              editItem={this.editItem}
              deleteItem={this.deleteItem}
              markComplete={this.markComplete}/>

          <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className="editModal">
            <ModalHeader className="bg-info" toggle={this.toggle}>Edit</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={this.onSubmitEdit}>
                <InputGroup size="sm" className="w-100">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>New Body:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="text"
                      name="editInput"
                      className="mr-2"
                      maxLength="80"
                      defaultValue={this.state.defaultInput}
                      onChange={this.onChangeEdit}/>
                  <Button size="sm" color="success">Submit</Button>
                </InputGroup>
              </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
    );
  }
}

export default TodoList;
