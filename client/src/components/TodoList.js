import React, {Component} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import ListItems from "./ListItems";
import {
  Form,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Button,
  Modal
} from "reactstrap";

class TodoList extends Component
{
  state = {
    input: "",
    items: [],
    editInput: "",
    editId: "",
    modalOpen: false
  };

  componentDidMount()
  {
    this.refreshList();
  }

  refreshList()
  {
    const URL = "/list";
    axios.get(URL)
        .then(res =>
        {
          this.setState({items: res.data});
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  }

  markComplete = (item) =>
  {
    const URL = "/complete/" + item._id;
    axios.post(URL)
        .then(res =>
        {
          console.log(`Complete item operation success: ${res.data.success}`);
          this.refreshList();
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  };

  deleteItem = (item) =>
  {
    const URL = "/list/" + item._id;
    axios.delete(URL)
        .then(res =>
        {
          console.log(`Delete operation success: ${res.data.success}`);
          this.refreshList();
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  };

  onChange = (e) =>
  {
    this.setState({input: e.target.value});
  };

  onEditChange = (e) =>
  {
    this.setState({editInput: e.target.value});
  };

  onSubmit = (e) =>
  {
    e.preventDefault();

    if (this.state.input !== "")
    {
      const newItem = {
        body: this.state.input
      };

      const URL = "list/add";
      axios.post(URL, newItem)
          .then(res =>
          {
            this.setState({input: ""});
            this.refreshList();
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  editItem = (item) =>
  {
    this.setState({editId: item._id});
    this.toggle();
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

      const URL = "/list/" + this.state.editId;

      axios.put(URL, newItem)
          .then(res =>
          {
            this.refreshList();
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  toggle = () =>
  {
    this.setState({modalOpen: !(this.state.modalOpen)});
  };

  render()
  {
    return (
        <React.Fragment>
          <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
            <ModalHeader className="bg-info" toggle={this.toggle}>Edit</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={this.onEditSubmit}>
                <Label for="newBody">New Body:</Label>
                <Input
                    type="text"
                    id="newBody"
                    className="mx-2"
                    onChange={this.onEditChange}/>
                <Button color="success">OK</Button>
              </Form>
            </ModalBody>
          </Modal>

          <h3>To Do List</h3><br/>
          <CreateItem
              input={this.state.input}
              onChange={this.onChange}
              onSubmit={this.onSubmit}/>
          <br/>
          <ListItems
              items={this.state.items}
              editItem={this.editItem}
              deleteItem={this.deleteItem}
              markComplete={this.markComplete}/>
        </React.Fragment>
    );
  }
}

export default TodoList;
