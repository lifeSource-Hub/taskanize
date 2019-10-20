import React, {Component} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import IncompleteItems from "./IncompleteItems";
import {
  Form,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Modal, InputGroupAddon, InputGroupText, InputGroup
} from "reactstrap";

class TodoList extends Component
{
  state = {
    _isMounted: false,
    newItemInput: "",
    editInput: "",
    defaultInput: "",
    editId: "",
    modalOpen: false,
    items: []
  };

  componentDidMount()
  {
    const URL = "/incomplete";
    axios.get(URL)
        .then(res =>
        {
          this.setState({items: res.data, _isMounted: true});
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  }

  componentWillUnmount()
  {
    this.setState({_isMounted: false});
  }

  markComplete = (selectedItem) =>
  {
    const URL = "/complete/" + selectedItem._id;
    axios.post(URL)
        .then(res =>
        {
          // Remove item from state, causing a re-render
          this.setState({
            items: this.state.items.filter(item => item._id !== selectedItem._id)
          });
          console.log(`Complete item operation success: ${res.data.success}`);
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  };

  deleteItem = (selectedItem) =>
  {
    const URL = "/incomplete/" + selectedItem._id;
    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state, causing a re-render
          this.setState({
            items: this.state.items.filter(item => item._id !== selectedItem._id)
          });
          console.log(`Delete operation success: ${res.data.success}`);
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  };

  editItem = (selectedItem) =>
  {
    this.setState({editId: selectedItem._id, defaultInput: selectedItem.body});
    this.toggle();
  };

  onEditChange = (e) =>
  {
    this.setState({editInput: e.target.value});
  };

  onEditSubmit = (e) =>
  {
    e.preventDefault();
    this.toggle();

    if (this.state.editInput !== "")
    {
      const newItem = {
        body: this.state.editInput
      };

      const URL = "/incomplete/" + this.state.editId;

      axios.put(URL, newItem)
          .then(res =>
          {
            // Update item in state, causing a re-render
            let newItems = this.state.items.slice();
            newItems.find(item => item._id === this.state.editId)
                .body = this.state.editInput;
            this.setState({items: newItems});

            console.log(`Edit operation success: ${res.data.success}`);
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  // Toggles item edit modal
  toggle = () =>
  {
    this.setState({modalOpen: !(this.state.modalOpen)});
  };

  // Set new item input into state
  onChange = (e) =>
  {
    this.setState({newItemInput: e.target.value});
  };

  onSubmit = (e) =>
  {
    e.preventDefault();

    if (this.state.newItemInput !== "")
    {
      const newItem = {
        body: this.state.newItemInput
      };

      const URL = "incomplete/add";
      axios.post(URL, newItem)
          .then(res =>
          {
            this.setState({
              newItemInput: "",
              items: [res.data, ...this.state.items]
            });
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  render()
  {
    return (
        <React.Fragment>
          <h3>To Do List</h3><br/>
          <CreateItem
              newItemInput={this.state.newItemInput}
              onChange={this.onChange}
              onSubmit={this.onSubmit}/>
          <br/>
          <IncompleteItems
              items={this.state.items}
              editItem={this.editItem}
              deleteItem={this.deleteItem}
              markComplete={this.markComplete}/>

          <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
            <ModalHeader className="bg-info" toggle={this.toggle}>Edit</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={this.onEditSubmit}>
                <InputGroup size="sm">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>New Body:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="text"
                      name="editInput"
                      id="newBody"
                      className="mr-2"
                      defaultValue={this.state.defaultInput}
                      onChange={this.onEditChange}/>
                  <Button size="sm" color="success">OK</Button>
                </InputGroup>
              </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
    );
  }
}

export default TodoList;
