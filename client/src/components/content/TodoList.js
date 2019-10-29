import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import IncompleteList from "./IncompleteList";
import EditModal from "./EditModal";

(function ()
{
  // delete axios.defaults.headers.common["authToken"];
  // axios.defaults.headers.common = {};
  if (localStorage.getItem("authToken"))
  {
    axios.defaults.headers.common["authToken"] = localStorage.getItem("authToken");
  }
  else
  {
    delete axios.defaults.headers.common["authToken"];
  }
})();

const TodoList = () =>
{
  const [listItems, setListItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    id: "",
    body: "",
    priority: "",
    prevBody: "",
    priorityDropIsOpen: false
  });

  useEffect(() =>
  {
    getList();
  }, []);

  const getList = () =>
  {
    const URL = "/api/users";
    axios.get(URL)
        .then(res =>
        {
          setListItems(res.data);
          // console.log(res.data)
        })
        .catch(() => console.warn(`Can’t access GET '${URL}'`));
  };

  const toggle = () =>
  {
    setModalIsOpen(!(modalIsOpen));
  };

  const editItem = (selectedItem) =>
  {
    setUpdateItem(updateItem => ({
      ...updateItem,
      id: selectedItem._id,
      prevBody: selectedItem.body,
      priority: selectedItem.priority
    }));

    toggle();
  };

  const update = (updatedItem) =>
  {
    const URL = "/api/users/" + updatedItem.id;

    axios.put(URL, updatedItem)
        .then(res =>
        {
          setListItems(res.data);
        })
        .catch(() => console.warn(`Can’t access PUT '${URL}'`));
  };

  return (
      <React.Fragment>
        <h3 className="shadowedHeading">To Do List</h3><br/>
        <CreateItem getList={getList}/>
        <br/>
        <IncompleteList
            listItems={listItems}
            setListItems={setListItems}
            editItem={editItem}
            toggle={toggle}/>
        <EditModal
            modalIsOpen={modalIsOpen}
            toggle={toggle}
            updateItem={updateItem}
            setUpdateItem={setUpdateItem}
            update={update}/>
      </React.Fragment>);
};

export default TodoList;
