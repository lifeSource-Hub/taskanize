import React, {Component} from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
        <Modal>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>
            Body
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleClick}>OK</Button>
          </ModalFooter>
        </Modal>);
  }
}

export default EditItemModal;
