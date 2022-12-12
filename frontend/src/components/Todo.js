import React from "react";

const TodoItem = ({ todo, deleteClb, editForm }) => {
  const capitalText =
    todo.content.charAt(0).toUpperCase() + todo.content.slice(1);
  const todoText = todo.active ? capitalText : <del>{capitalText}</del>;
  const editButton = <button onClick={() => editForm(todo)}>Edit</button>;
  const delButton = todo.active ? (
    <button onClick={() => deleteClb(todo.pk)} id={"delButton" + todo.pk}>
      Complete
    </button>
  ) : null;
  return (
    <li>
      <h3>
        <label htmlFor={"delButton" + todo.pk}> {todoText}</label>
        {editButton}
        {delButton}
      </h3>
    </li>
  );
};

const TodoList = ({ todoSet, deleteClb }) => {
  return (
    <ul>
      {todoSet.map((todo, index) => (
        <TodoItem deleteClb={deleteClb} key={index} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
