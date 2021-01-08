import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  List,
} from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //useeffect loads when the page loads first time or when the event mentioned after the function triggers
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().task,
            timestamp: "Data",
            // doc.data().timestamp,
          }))
        );
      });
  }, []);
  console.log(todos);
  // const addInput = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setInput(input)
  //   // setInput(e.target.value)
  // };

  const addTodo = (event) => {
    //this will stop refreshing the page
    event.preventDefault();
    db.collection("todos").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      task: input,
    });
    // setTodos([...todos, input]); //appends theinput value to end of todos
    setInput(""); // clears the input in form
  };
  const ulstyle = {
    display: "inline-block",
  };

  return (
    <div className="App">
      <h1  style={{color:'red'}} >Todo App</h1>
      <br/>
      <br/>
      <br/>
      <form action="">
        <FormControl>
          <InputLabel htmlFor="my-input"> write a todo</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* <input type="text" /> */}

          {/* <FormHelperText id="my-helper-text">
            We'll never share your email. */}
          {/* </FormHelperText> */}
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>
      <br />

      <ul  style={ulstyle} >
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
