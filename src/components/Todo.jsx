import React, { useEffect, useState } from "react";
import "./Todo.css";
import { ReactComponent as EmptyCheckIcon } from "../assets/ovalCopy.svg";
import { ReactComponent as CheckedCheckIcon } from "../assets/checkedBox.svg";
import { ReactComponent as DeleteCrossIcon } from "../assets/deleteCross.svg";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="todoContainer">
        <h1 className="mainHeading">TODO</h1>
        <div className="newTodoInput todoItem">
          <EmptyCheckIcon />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Create a new todo..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
        </div>

        <ul className="todoList">
          {filteredTodos().map((todo) => (
            <li
              key={todo.id}
              className={`todoItem listItem ${
                todo.completed ? "completed" : ""
              }`}
            >
              <div
                className="checkBoxContainer"
                onClick={() => toggleTodoCompletion(todo.id)}
              >
                {todo.completed ? <CheckedCheckIcon /> : <EmptyCheckIcon />}
              </div>
              <span className="todoItemText">{todo.text}</span>

              <DeleteCrossIcon
                className="deleteIcon"
                onClick={() => removeTodo(todo.id)}
              />
            </li>
          ))}
        </ul>

        <div className="filterButtons">
          <span>{`${
            todos.filter((todo) => !todo.completed).length
          } items left`}</span>
          <div className="buttonsContainer">
            <button
              className={filter === "all" ? "activeClass" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "activeClass" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "activeClass" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <span className="clearCompletedButton" onClick={clearCompleted}>
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default Todo;
