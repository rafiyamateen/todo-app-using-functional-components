import React, { useState, useEffect } from 'react';
import './App.css';
import AddButton from './Components/AddButton/AddButton';
import AddForm from './Components/AddForm/AddForm'
import TodoList from './Components/TodoList/TodoList'
import EditForm from './Components/EditForm/EditForm'
import UpdateBtn from './Components/UpdateBtn/UpdateBtn'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [todoList, setTodoList] = useState([]),
    [id, setId] = useState(0),
    [input, setInput] = useState({ todo: '' }),
    [edit, setEdit] = useState(false),
    [alert, setAlert] = useState(false),

    onChange = (e) => {
      setInput({ todo: e.target.value })
      setAlert(false)
    },

    addItem = () => {
      if (input.todo) {
        const str = input.todo,
          title = str[0].toUpperCase() + str.slice(1),
          newItem = [...todoList];
        newItem.push({ todo: title, id: id })
        setTodoList(newItem)
        setInput({ todo: '' })
        setId(id + 1)
      }
      else {
        setAlert(true)
      }
    },

    editItem = (todo) => {
      setInput({
        todo: todo.todo,
        id: todo.id
      })
      setEdit(true)
    },

    deleteItem = (id) => {
      const newList = todoList.filter(todo => todo.id !== id)
      setTodoList(newList)
    },

    update = (toEdit) => {
      if (input.todo) {
        const string = toEdit.todo,
          firstCap = string[0].toUpperCase() + string.slice(1),
          updateItem = todoList.map(todo => (todo.id === toEdit.id ? { todo: firstCap, id: toEdit.id } : todo))
        setTodoList(updateItem)
        setInput({
          todo: ''
        })
        setEdit(false)
      }
      else {
        setAlert(true)
      }
    },

    onEdit = (e) => {
      setInput({
        todo: e.target.value,
        id: input.id
      })
      setAlert(false)
    }
  useEffect(() => {
    if (edit) {
      document.getElementById('editForm').focus();
    } else {
      document.getElementById('addForm').focus();
    }
  })

  return (
    <div className='appContainer'>
      <h2 className='head'> TODO APP</h2>
      <Alert id='alert' show={alert} variant='dark'>
        Please enter an item!
        </Alert>
      <div className='addSec'>
        {
          edit ?
            <>
              <EditForm input={input} onChange={onEdit} />
              <UpdateBtn input={input} update={update} />
            </> :
            <>
              <AddForm onChange={onChange} input={input} />
              <AddButton addItem={addItem} />
            </>
        }
      </div>
      { todoList[0] ?
        <TodoList todoList={todoList} deleteItem={deleteItem} editItem={editItem} />
        : null
      }
    </div >
  )
}
export default App;