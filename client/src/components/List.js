import React, {Component} from 'react';
import axios from "axios";
import {} from "reactstrap";
import CreateItem from "./CreateItem";
import ListItems from "./ListItems";

class List extends Component
{
  state = {
    input: "",
    items: []
  };

  componentDidMount()
  {
    this.refreshList();
  }

  refreshList()
  {
    const URL = "/list";
    axios.get(URL)
        .then(res =>
        {
          this.setState({items: res.data});
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  }

  editItem(e)
  {
    console.log(`Editing element with id '${e.target.parentElement.id}'`);

  }

  deleteItem = (item) =>
  {
    const URL = "/list/" + item._id;
    axios.delete(URL)
        .then(res =>
        {
          // console.log(`Successfully deleted item ${item._id}:` + res.data.success);
          this.refreshList();
        })
        .catch(() => console.log(`Can’t access '${URL}'`));
  };

  markComplete(e)
  {
    console.log('Complete button clicked');
  }



  onSubmit = (e) =>
  {
    e.preventDefault();

    if (this.state.input !== "")
    {
      const newItem = {
        body: this.state.input
      };

      const URL = "/list";
      axios.post(URL, newItem)
          .then(res =>
          {
            this.refreshList();
          })
          .catch(() => console.log(`Can’t access '${URL}'`));
    }
  };

  render()
  {
    return (
        <React.Fragment>
          <h3>To Do List</h3><br/>
          <CreateItem onSubmit={this.onSubmit}/>
          <br/>
          <ListItems
              items={this.state.items}
              editItem={this.editItem}
              deleteItem={this.deleteItem}
              markComplete={this.markComplete}/>
        </React.Fragment>
    );
  }
}

export default List;
