import React, { FC } from 'react';
import todos from '../todo';
import TodoItem from './TodoItem';
import { Todo } from '../todo';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

const TodoList: FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {
  if (todos.length === 0) return <p>등록된 항복이 없습니다.</p>;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} key={todo.id} />
      ))}
    </ul>
  );
};

export default TodoList;
