import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";
import { Checkbox, TodoForm } from "components";
import {
  addTodoList,
  toggleTodoList,
  deleteTodoList,
} from "../../store/todoSlice";

const TodoListPage = () => {
  const dispatch = useDispatch();
  const [addText, setAddText] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const todos = useSelector((state) => {
    return state.todos;
  });

  const handleClickAdd = (text) => {
    if (text.length) {
      dispatch(addTodoList(text));
      setAddText("");
    } else {
      alert("추가할 내용을 입력해주세요.");
    }
  };

  const handleChangeChecked = (id) => {
    dispatch(toggleTodoList(id));
  };

  const handleChangeAddTitle = (text) => {
    setAddText(text);
  };

  const handleClickDelete = (id) => {
    dispatch(deleteTodoList(id));
  };

  const handleClickUpdateMode = () => {
    setUpdateMode(!updateMode);
  };

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">Todo List</h1>
        <div className="todo-add">
          <input
            type="text"
            value={addText}
            onChange={(e) => handleChangeAddTitle(e.target.value)}
            className="input"
          />
          <button onClick={() => handleClickAdd(addText)} className="btn-add">
            추가
          </button>
        </div>

        <div className="todo-list">
          {todos.map((item) => (
            <div key={shortid.generate()} className="list">
              <Checkbox
                isChecked={item.checked}
                onChangeChecked={() => handleChangeChecked(item.id)}
              />
              <TodoForm
                items={item.title}
                handleClickUpdateMode={handleClickUpdateMode}
                handleClickDelete={() => handleClickDelete(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
