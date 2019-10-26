import React, {useState, useEffect} from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import Octicon, {X} from "@primer/octicons-react";

const CompletedList = () =>
{
  const [items, setItems] = useState([]);

  useEffect(() =>
  {
    refreshList();
  }, []);

  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const refreshList = () =>
  {
    const URL = "/api/complete";
    axios.get(URL)
        .then(res =>
        {
          setItems(res.data);
        })
        .catch(() => console.warn(`Can’t access GET '${URL}'`));
  };

  const deleteItem = (selectedItem) =>
  {
    const URL = "/api/complete/" + selectedItem._id;

    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state
          setItems(items.filter(item => item._id !== selectedItem._id));

          refreshList();
        })
        .catch(() => console.warn(`Can’t access DELETE '${URL}'`));
  };

  const formatCreatedDate = (dateCreated) =>
  {
    const date = new Date(dateCreated);

    return (date.toLocaleDateString(undefined, options));
  };

  const formatCompletedDate = (dateCompleted) =>
  {
    const date = new Date(dateCompleted);

    return (date.toLocaleDateString(undefined, options));
  };

    return (
        <React.Fragment>

          <h3>Completed Items</h3><br/>

          <ListGroup className={items.length > 0 ? "listGroup" : ""}>
            {items.map((item) =>
                <ListGroupItem
                    id={item._id}
                    key={item._id}
                    className="listItem">
                  <div>
                    <p>{item.body}</p>
                    <div className="timeStamps small">
                      <p>Created: </p>
                      <time id="dateCreated" className="small">
                        {formatCreatedDate(item.dateCreated)}
                      </time>
                      <p> Completed: </p>
                      <time id="dateCreated" className="small">
                        {formatCompletedDate(item.dateCompleted)}
                      </time>
                    </div>
                  </div>
                  <ButtonGroup size="sm">
                    <Button
                        color="danger"
                    onClick={deleteItem.bind(null, item)}>
                      <Octicon icon={X}/>
                    </Button>
                  </ButtonGroup>
                </ListGroupItem>)}
          </ListGroup>

        </React.Fragment>);
};

export default CompletedList;
