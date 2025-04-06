import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);

    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    

    const input = screen.getByPlaceholderText('Add a new todo');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    
    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);
    

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles the completion status of a todo', () => {
    render(<TodoList />);
    

    const todoItem = screen.getByText('Learn React');
    fireEvent.click(todoItem);


    expect(todoItem).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo item', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});