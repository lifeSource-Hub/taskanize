import React, {Component} from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import Octicon, {X} from "@primer/octicons-react";

class CompletedList extends Component
{
  state = {
    items: []
  };

  componentDidMount()
  {
    this.refreshList();
  }

  refreshList()
  {
    const URL = "/api/complete";
    axios.get(URL)
        .then(res =>
        {
          this.setState({items: res.data});
        })
        .catch(() => console.log(`Can’t access GET '${URL}'`));
  }

  deleteItem = (selectedItem) =>
  {
    const URL = "/api/complete/" + selectedItem._id;

    axios.delete(URL)
        .then(res =>
        {
          // Remove item from state, causing a re-render
          this.setState({
            items: this.state.items.filter(item => item._id !== selectedItem._id)
          });
          console.log(`Delete operation success: ${res.data.success}`);
          this.refreshList();
        })
        .catch(() => console.log(`Can’t access DELETE '${URL}'`));
  };

  formatCreatedDate = (dateCreated) =>
  {
    const date = new Date(dateCreated);

    return (date.toLocaleDateString(undefined, options));
  };

  formatCompletedDate = (dateCompleted) =>
  {
    const date = new Date(dateCompleted);

    return (date.toLocaleDateString(undefined, options));
  };

  render()
  {
    return (
        <React.Fragment>

          <h3>Completed Items</h3><br/>

          <ListGroup>
            {this.state.items.map((item) =>
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
                      <p> Completed: </p>
                      <time id="dateCreated" className="small">
                        {this.formatCompletedDate(item.dateCompleted)}
                      </time>
                    </div>
                  </div>
                  <ButtonGroup size="sm">
                    <Button
                        color="danger"
                    onClick={this.deleteItem.bind(null, item)}>
                      <Octicon icon={X}/>
                    </Button>
                  </ButtonGroup>
                </ListGroupItem>)}
          </ListGroup>

        </React.Fragment>);
  }
}

const options = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
};

export default CompletedList;
