# react-test-example - starter code 

# Steps:
1. Create a GitHub repo with this starter code
2. Clone the repo to your local computer
3. npm install
4. create .env and add your own MongoDB Atlas connection string, then use the environment variable on connection.js
5. Create a new branch 'unittest'
6. write App.test.js
the most simple example
```
    import { render, screen } from '@testing-library/react';
    import App from './App';
    import '@testing-library/jest-dom';
    
    test('renders GetToDoItem component', () => {
	render(<App />);
	const linkElement = screen.getByText('My To Do Items');
	expect(linkElement).toBeInTheDocument();
    });
 ```
7. run npm test
8. commit and push
9. Bonus(optional) - use fireEvent, waitFor 

On GitHub
10. Create new workflow to run the test on PR to main
11. Make a PR to confirm the test runs on PR
12. Take a screenshot of the page showing the 'Test Passed'
12. Make sure it's merged to main

13. Submit the screenshot and a short comment about this exercise
