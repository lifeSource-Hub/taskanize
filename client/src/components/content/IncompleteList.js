import React from "react";
import {Button, ButtonGroup, ListGroup, ListGroupItem} from "reactstrap";
import Octicon, {Check, Pencil, X} from "@primer/octicons-react";
import axios from "axios";

const IncompleteList = ({listItems, setListItems, editItem}) =>
{
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const formatCreatedDate = (dateCreated) =>
  {

    const date = new Date(dateCreated);
    return (date.toLocaleDateString(undefined, options));

  };
  const formatModifiedDate = (dateModified) =>
  {

    const date = new Date(dateModified);
    return (date.toLocaleDateString(undefined, options));

  };
  const getPriorityColor = (priority) =>
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

  const markComplete = (selectedItem) =>
  {
    const URL = "/api/users/" + selectedItem._id;
    axios.post(URL)
        .then(res =>
        {
          setListItems(res.data);
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  const deleteItem = (selectedItem) =>
  {
    const URL = "/api/users/" + selectedItem._id;
    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state
          setListItems(items => (items.filter(item => item._id !== selectedItem._id)));
        })
        .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  return (
      <React.Fragment>
        <ListGroup className={listItems.length > 0 ? "listGroup" : ""}>
          {listItems.map((item) =>
              <ListGroupItem
                  id={item._id}
                  key={item._id}
                  color={item.complete ? "success" : ""}
                  className="listItem">
                <div>
                  <p>{item.body}</p>
                  <div className="timeStamps small">
                    <p>Priority: </p>
                    <p className={getPriorityColor(item.priority)}>
                      {item.priority || "Med"}
                    </p>
                    <p> Created: </p>
                    <time id="dateCreated" className="small">
                      {formatCreatedDate(item.dateCreated)}
                    </time>
                    <p> Modified: </p>
                    <time className="small text-lowercase">
                      {formatModifiedDate(item.dateModified)}
                    </time>
                  </div>
                </div>
                <ButtonGroup size="sm">
                  <Button
                      color="info"
                      onClick={editItem.bind(null, item)}>
                    <Octicon icon={Pencil}/>
                  </Button>
                  <Button
                      color="danger"
                      onClick={deleteItem.bind(null, item)}>
                    <Octicon icon={X}/>
                  </Button>
                  <Button
                      color="success"
                      onClick={markComplete.bind(null, item)}>
                    <Octicon icon={Check}/>
                  </Button>
                </ButtonGroup>
              </ListGroupItem>)}
        </ListGroup>

      </React.Fragment>);
};

export default IncompleteList;
