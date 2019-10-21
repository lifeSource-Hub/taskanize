import React, {Component} from "react";
import {Badge, Button, ButtonGroup, ListGroup, ListGroupItem} from "reactstrap";
import Octicon, {Check, Pencil, X} from "@primer/octicons-react";

class IncompleteItems extends Component
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

  getPriorityColor = (priority) =>
  {
    switch (priority)
    {
      case "High":
        return "text-danger";
      case "Med":
        return "text-primary";
      case "Low":
        return "text-success";
      default:
        return "text-primary";
    }
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
                    <p>Priority: </p>
                    <p className={this.getPriorityColor(item.priority)}>
                      {item.priority || "Med"}
                    </p>
                    <p> Created: </p>
                    <time id="dateCreated" className="small">
                      {this.formatCreatedDate(item.dateCreated)}
                    </time>
                    <p> Modified: </p>
                    <time className="small text-lowercase">
                      {this.formatModifiedDate(item.dateModified)}
                    </time>
                  </div>
                </div>
                <ButtonGroup size="sm">
                  <Button
                      color="info"
                      onClick={this.props.editItem.bind(null, item)}>
                    <Octicon icon={Pencil}/>
                  </Button>
                  <Button
                      color="danger"
                      onClick={this.props.deleteItem.bind(null, item)}>
                    <Octicon icon={X}/>
                  </Button>
                  <Button
                      color="success"
                      onClick={this.props.markComplete.bind(null, item)}>
                    <Octicon icon={Check}/>
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

export default IncompleteItems;
