import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
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
    const URL = "/api/user/tasks";
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

  const getPriorityColor = priority =>
  {
    switch (priority)
    {
      case "High":
        return "#db4036";
      case "Med":
        return "#FB9902";
      case "Low":
        return "#FEFE33";
      default:
        return "#ffffff";
    }
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
    const URL = "/api/user/tasks/" + updatedItem.id;

    axios.put(URL, updatedItem)
      .then(res => setListItems(res.data))
      .catch(() => console.warn(`Can’t access PUT '${URL}'`));
  };

  return (
    <>
      <h3 className="shadowedHeading">
        {localStorage.getItem("currentUser")}'s Task List
      </h3>
      <p>Incomplete tasks are sorted by date created<br/>
        Completed tasks are sorted by date completed</p>
      <br/>
      <CreateTask getPriorityColor={getPriorityColor} setListItems={setListItems}/>
      <br/>
      <TaskList
        getPriorityColor={getPriorityColor}
        listItems={listItems}
        setListItems={setListItems}
        editItem={editItem}
        toggle={toggle}/>
      <EditModal
        getPriorityColor={getPriorityColor}
        modalIsOpen={modalIsOpen}
        toggle={toggle}
        updateItem={updateItem}
        setUpdateItem={setUpdateItem}
        update={update}/>
    </>);
};

export default ListPage;
