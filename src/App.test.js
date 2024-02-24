import { render, screen } from '@testing-library/react';
import App from './app'; // Assuming 'app.js' contains your main component
import '@testing-library/jest-dom';

test('renders GetToDoItem component', () => {
  render(<App />);
  const linkElement = screen.getByText('My To Do Items');
  expect(linkElement).toBeInTheDocument();
});
