import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import TodoList from "./TodoList";
import EditModal from "./EditModal";

(function ()
{
  // delete axios.defaults.headers.common["authToken"];
  if (localStorage.getItem("authToken"))
  {
    axios.defaults.headers.common["authToken"] = localStorage.getItem("authToken");
  }
  else
  {
    delete axios.defaults.headers.common["authToken"];
  }
})();

const ListPage = () =>
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
    const URL = "/api/user/list";
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
      body: selectedItem.body,
      prevBody: selectedItem.body,
      priority: selectedItem.priority
    }));

    toggle();
  };

  const update = (updatedItem) =>
  {
    const URL = "/api/user/list/" + updatedItem.id;

    axios.put(URL, updatedItem)
        .then(res =>
        {
          setListItems(res.data);
        })
        .catch(() => console.warn(`Can’t access PUT '${URL}'`));
  };

  return (
      <React.Fragment>
        <h3 className="shadowedHeading">
          {localStorage.getItem("currentUser")}'s To Do List
        </h3>
        <p>Incomplete items sorted by date created<br/>
          Completed item sorted by date completed</p>
        <br/>
        <CreateItem getList={getList}/>
        <br/>
        <TodoList
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

export default ListPage;
