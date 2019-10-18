import React, {Component} from "react";
import {Button, ButtonGroup, ListGroup, ListGroupItem} from "reactstrap";

class ListItems extends Component
{
  render()
  {
    return (
        <ListGroup>
          {this.props.items.map((item) =>
              <ListGroupItem className="d-flex justify-content-between" id={item._id}
                             key={item._id}>
                <p>{item.body}</p>
                <ButtonGroup>
                  <Button
                      size="sm"
                      color="info"
                      onClick={this.props.editItem}>Edit</Button>
                  <Button
                      size="sm"
                      color="danger"
                      onClick={this.props.deleteItem.bind(null, item)}>
                    Delete
                  </Button>
                  <Button size="sm" color="success" onClick={this.props.markComplete}>
                    Complete
                  </Button>
                </ButtonGroup>
              </ListGroupItem>)}
        </ListGroup>);
  }
}

export default ListItems;
