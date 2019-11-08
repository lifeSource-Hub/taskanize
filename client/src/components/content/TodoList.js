import React from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Octicon, {Check, Pencil, Trashcan} from "@primer/octicons-react";
import axios from "axios";
import CompleteBadge from "./CompleteBadge";

const TodoList = ({listItems, setListItems, editItem}) =>
{
  const formatDate = dateString =>
  {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    };

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const getPriorityColor = priority =>
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

  const toggleComplete = selectedItem =>
  {
    const URL = "/api/user/list/" + selectedItem._id;
    axios
      .post(URL)
      .then(res => setListItems(res.data))
      .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  const deleteItem = selectedItem =>
  {
    const URL = "/api/user/list/" + selectedItem._id;
    axios
      .delete(URL)
      .then(res => setListItems(res.data))
      .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  try
  {
    return (
      <>
        <ListGroup className={listItems.length > 0 ? "listGroup" : ""}>
          {listItems.map(item => (
            <ListGroupItem id={item._id} key={item._id} className="listItem">
              <div>
                <p className="itemBody">{item.body}</p>
                <div className="itemInfo">
                  <p>Priority: </p>
                  <p className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </p>
                  <p> – Created: </p>
                  <time>{formatDate(item.dateCreated)}</time>
                  <p> – {item.complete ? "Completed" : "Modified"}: </p>
                  <time>
                    {formatDate(
                      item.complete ? item.dateCompleted : item.dateModified
                    )}
                  </time>
                  <CompleteBadge item={item} toggleComplete={toggleComplete}/>
                </div>
              </div>
              <ButtonGroup size="sm">
                <Button color="info" onClick={editItem.bind(null, item)}>
                  <Octicon icon={Pencil}/>
                </Button>
                <Button color="danger" onClick={deleteItem.bind(null, item)}>
                  <Octicon icon={Trashcan}/>
                </Button>
                <Button
                  color="success"
                  outline={!item.complete}
                  onClick={toggleComplete.bind(null, item)}
                >
                  <Octicon icon={Check}/>
                </Button>
              </ButtonGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  } catch (e)
  {
    // TODO improve error handling
    return <p>Error: Could not load list</p>;
  }
};

export default TodoList;
