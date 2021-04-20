import React from 'react';
import { FC } from 'react';
import TodoInsert from './TodoInsert';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, removeTodo, toggleTodo } from '../todo';
import TodoList from './TodoList';

const TodoApp: FC = () => {
  const { todos } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  console.log(todos);

  const onInsert = (text: string) => {
    dispatch(addTodo(text));
  };

  const ontoggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const onRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={ontoggle} onRemove={onRemove} />
    </>
  );
};

export default TodoApp;
