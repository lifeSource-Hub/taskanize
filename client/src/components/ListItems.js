import React, {Component} from "react";
import {Button, ListGroup, ListGroupItem} from "reactstrap";

class ListItems extends Component
{
  render()
  {
    return (
        <ListGroup>
          {this.props.items.map((item) =>
              <ListGroupItem id={item._id} key={item._id}>
                <Button size="sm" onClick={this.props.editItem}>Edit</Button>
                <Button
                    size="sm"
                    color="danger"
                    onClick={this.props.deleteItem.bind(null, item)}>
                  Delete
                </Button>
                <Button size="sm" color="success" onClick={this.props.markComplete}>
                  Complete
                </Button>
                <span>{item.body}</span>
              </ListGroupItem>)}
        </ListGroup>);
  }
}

export default ListItems;
