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

  editItem = (e) =>
  {
    console.log("Editing item " + e.target.parentElement.parentElement.id);

    const URL = "/list/"  + e.target.parentElement.parentElement.id;

    //TODO Get modal input instead of New Item input
    const newText = {
      body: this.state.input
    };

    // axios.post(URL, newText)
    //     .then(res =>
    //     {
    //       this.refreshList();
    //     })
    //     .catch(() => console.log(`Can’t access '${URL}'`));
  };

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

  onChange = (e) =>
  {
    this.setState({input: e.target.value});
  };

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
            this.setState({input: ""});
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
          <CreateItem
              input={this.state.input}
              onChange={this.onChange}
              onSubmit={this.onSubmit}/>
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
