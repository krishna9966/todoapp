import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Input, FormControl, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //useeffect loads when the page loads first time or when the event mentioned after the function triggers
  useEffect(() => {
    db.collection("todos").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => doc.data().task));
    });
  }, []);

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
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]); //appends theinput value to end of todos
    setInput(""); // clears the input in form
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
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
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
