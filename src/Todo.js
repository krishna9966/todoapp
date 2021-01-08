import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

function Todo(props) {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary={props.todo} secondary="Dummy DeadLine" />
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
