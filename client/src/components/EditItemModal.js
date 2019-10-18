import React, {Component} from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
} from "reactstrap";

class EditItemModal extends Component
{
  handleClick()
  {
    console.log("OK button clicked");
  }

  render()
  {
    return (
        <Modal isOpen={this.props.open}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>
            {/*Send input up like Add Item input*/}
            <Input type="text"/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleClick}>OK</Button>
          </ModalFooter>
        </Modal>);
  }
}

export default EditItemModal;
