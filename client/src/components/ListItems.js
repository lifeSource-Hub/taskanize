import React, {Component} from "react";
import {Button, ButtonGroup, ListGroup, ListGroupItem} from "reactstrap";

class ListItems extends Component
{
  formatCreatedDate = (dateCreated) =>
  {
    const date = new Date(dateCreated);

    return (date.toLocaleDateString(undefined, options));
  };

  formatModifiedDate = (dateModified) =>
  {
    const date = new Date(dateModified);

    return (date.toLocaleDateString(undefined, options));
  };

  render()
  {
    return (
        <ListGroup>
          {this.props.items.map((item) =>
              <ListGroupItem
                  id={item._id}
                  key={item._id}
                  className="d-flex justify-content-between align-items-start">
                <div>
                  <p>{item.body}</p>
                  <div className="timeStamps small">
                    <p>Created: </p>
                    <time id="dateCreated" className="small">
                      {this.formatCreatedDate(item.dateCreated)}
                    </time>
                    <p> Modified: </p>
                    <time className="small text-lowercase">
                      {this.formatModifiedDate(item.dateModified)}
                    </time>
                  </div>
                </div>
                <ButtonGroup>
                  <Button
                      size="sm"
                      color="info"
                      onClick={this.props.editItem.bind(null, item)}>Edit</Button>
                  <Button
                      size="sm"
                      color="danger"
                      onClick={this.props.deleteItem.bind(null, item)}>
                    Delete
                  </Button>
                  <Button
                      size="sm"
                      color="success"
                      onClick={this.props.markComplete.bind(null, item)}>
                    Complete
                  </Button>
                </ButtonGroup>
              </ListGroupItem>)}
        </ListGroup>);
  }
}

const options = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
};

export default ListItems;
