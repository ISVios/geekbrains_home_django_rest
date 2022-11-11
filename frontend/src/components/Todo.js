import React from "react";

const TodoItem = ({ todo }) => {
  const capitalText =
    todo.content.charAt(0).toUpperCase() + todo.content.slice(1);
  return (
    <li>
      <h3>
        <input 
					defaultChecked={todo.active} 
					disabled="true" type="checkbox" />
				{" "}
        {capitalText}
      </h3>
    </li>
  );
};

const TodoList = ({ todoSet }) => {
  return (
    <ul>
      {todoSet.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
