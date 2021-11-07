import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";


// get 
const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  // updateing list value state of array by doing in getLocalStorage()
  // instead of setting only an empty array []
  const [list, setList] = useState(getLocalStorage()); 
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if input is empty
    if (!name) {
      // alert empty input
      // setAlert({show:true, msg: "please enter a value", type:"danger"})
      showAlert(true, "danger", "please enter a value");
    } else if (name && isEditing) {
      // deal with edit
      const newList = list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item
      })
      setList(newList)
      showAlert(true, 'success', 'item is edited')

      // clean up funcs
      setName('');
      setEditID(null)
      setIsEditing(false)
      
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list.')
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  // create func for setting different type of alert 
  // followed by their properties
  const showAlert = (show = false, type = "", msg = "") => {
    // setAlert({show:show, type:type, msg:msg})
    setAlert({ show, type, msg }); // ES6
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed from list')

    // filter item with matched id which is passed in as parameter to func
    // and store in newList all items that is not matched with the passed in id
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }

  const editItem = (id) => {
    const specifikItem = list.find((item) => item.id === id)

    setIsEditing(true)
    setEditID(id)
    setName(specifikItem.title)
  }

  // every time list state value updates, creates a "key value pair" in local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center p-relative">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3 className="card-title">Grocery bud</h3>
        <div className="input-group">
          <input
            type="text"
            className="grocery-input"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>Clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
