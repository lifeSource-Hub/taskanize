import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateItem from "./CreateItem";
import TodoList from "./TodoList";
import EditModal from "./EditModal";

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
    const URL = "/api/user/list";
    axios.get(URL)
        .then(res =>
        {
          setListItems(res.data);
          // console.log(res.data)
        })
        .catch(() => console.warn(`Can’t access GET '${URL}'`));
  }, []);

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
        .then(res => setListItems(res.data))
        .catch(() => console.warn(`Can’t access PUT '${URL}'`));
  };

  return (
      <>
        <h3 className="shadowedHeading">
          {localStorage.getItem("currentUser")}'s To Do List
        </h3>
        <p>Incomplete items sorted by date created<br/>
          Completed item sorted by date completed</p>
        <br/>
        <CreateItem setListItems={setListItems}/>
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
      </>);
};

export default ListPage;
