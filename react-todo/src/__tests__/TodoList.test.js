import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders TodoList and adds a todo', () => {
  render(<TodoList />);

  // Initially, no todo items should be visible
  expect(screen.getByText('Add Todo')).toBeInTheDocument();

  // Simulate adding a new todo item
  fireEvent.change(screen.getByPlaceholderText('Enter Todo'), { target: { value: 'Test Todo' } });
  fireEvent.click(screen.getByText('Add Todo'));

  // Verify the new todo item appears
  expect(screen.getByText('Test Todo')).toBeInTheDocument();
});

test('toggles todo completion status', () => {
  render(<TodoList />);

  // Adding a todo
  fireEvent.change(screen.getByPlaceholderText('Enter Todo'), { target: { value: 'Test Todo' } });
  fireEvent.click(screen.getByText('Add Todo'));

  // Check if todo item is not completed by default
  const todoItem = screen.getByText('Test Todo');
  expect(todoItem).not.toHaveClass('completed');

  // Toggle completion status
  fireEvent.click(todoItem);

  // Verify the todo item has the 'completed' class
  expect(todoItem).toHaveClass('completed');
});

test('deletes a todo item', () => {
  render(<TodoList />);

  // Adding a todo
  fireEvent.change(screen.getByPlaceholderText('Enter Todo'), { target: { value: 'Test Todo' } });
  fireEvent.click(screen.getByText('Add Todo'));

  // Verify todo item is added
  expect(screen.getByText('Test Todo')).toBeInTheDocument();

  // Delete the todo
  fireEvent.click(screen.getByText('Delete'));

  // Verify the todo item is deleted
  expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
});