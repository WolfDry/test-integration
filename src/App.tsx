// App.tsx
import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

interface NoteItem {
	id: string;
	title: string;
	grade: number;
	date: string;
	comment: string;
}

const App: React.FC = () => {
	const [notes, setNotes] = useState<NoteItem[]>([]);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const handleNoteCreate = (newNote: NoteItem) => {
		setNotes([...notes, newNote]);
	};

	const handleNoteClick = (noteId: string) => {
		// Handle note click here
		console.log(`Clicked note with ID: ${noteId}`);
	};

	return (
		<div className="app">
			<h1>Gestionnaire de notes</h1>
			<NoteForm onNoteCreate={handleNoteCreate} />
			<NoteList notes={notes} onNoteClick={handleNoteClick} />
		</div>
	);
};

export default App;
