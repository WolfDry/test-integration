import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
	test('renders App component', () => {
		render(<App />);
	});

	test('adds a new note', () => {
		const { getByTestId } = render(<App />);
		const titleInput = getByTestId('title');
		const gradeInput = getByTestId('grade');
		const commentInput = getByTestId('comment');
		const addButton = getByTestId('addButton');

		fireEvent.change(titleInput, { target: { value: 'Maths' } });
		fireEvent.change(gradeInput, { target: { value: '15' } });
		fireEvent.change(commentInput, { target: { value: 'Bon devoir' } });
		fireEvent.click(addButton);

		// Assert that the new note is added and displayed in the NoteList component)
		expect(getByTestId('note')).toBeInTheDocument()
	});
});
