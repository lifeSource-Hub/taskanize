import React, {Component} from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Button, Form, Label, InputGroup, InputGroupAddon, InputGroupText,
} from "reactstrap";
import axios from "axios";

class EditItemModal extends Component
{
  handleClick()
  {
    console.log("OK button clicked");
  }

  state = {editInput: ""};

  // toggle = () =>
  // {
  //   this.setState({modalOpen: !(this.state.modalOpen)});
  // };

  onEditChange = (e) =>
  {
    this.setState({editInput: e.target.value});
  };

  onEditSubmit = (e) =>
  {
    e.preventDefault();
    this.props.toggle();

    if (this.state.editInput !== "")
    {
      const newItem = {
        body: this.state.editInput
      };

      const URL = "/incomplete/" + this.props.editId;
            console.log(newItem);
            console.log(URL);

      axios.put(URL, newItem)
          .then(res =>
          {
            // this.refreshList();
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  render()
  {
    return (
        <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle}>
          <ModalHeader className="bg-info" toggle={this.props.toggle}>Edit</ModalHeader>
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
                    // defaultValue={this.state.items[0].body}
                    // value={this.state.items.body}
                    onChange={this.onEditChange}/>
                <Button size="sm" color="success">OK</Button>
              </InputGroup>
            </Form>
          </ModalBody>
        </Modal>);
  }
}

export default EditItemModal;
