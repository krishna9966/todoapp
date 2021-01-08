import { Button, List, ListItem, ListItemText, Modal } from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        task: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  const mystyle = {
    display: "flex",
    justifyContent: "space-around",
    // width: "700px",
    // height: "50px",
    // alignItems:'center',
    border: "1px solid red",
    backgroundColor: "yellow",
    padding: "10px",
    borderRadius: "20px",
    // paddingBottom: "20px",
    // paddingLeft:'200px',
    // paddingRight:'100px'
  };

  const mystyle1 ={
    display: "flex",
    justifyContent:'center',
  }
  // var date = new Date(props.todo.timestamp).toLocalString();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Update Todo here</h2>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>update</Button>
        </div>
      </Modal>
      <List>
        <div style={mystyle}>
          <ListItem  style={mystyle1} >
            <ListItemText
              primary={props.todo.todo}
              secondary={props.todo.timestamp}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <EditIcon variant="contained" color="primary" onClick={handleOpen}>
              Edit Me
            </EditIcon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <DeleteForeverIcon
              variant="contained"
              color="secondary"
              onClick={(e) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            >
              Delete Me
            </DeleteForeverIcon>
          </ListItem>
        </div>
      </List>
    </div>
  );
}

export default Todo;
