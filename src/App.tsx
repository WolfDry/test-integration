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
	const [noteToEdit, setNoteToEdit] = useState<NoteItem | undefined>(undefined); // État de la note à éditer

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

	const handleNoteEdit = (noteId: string) => {
		const noteToEdit = notes.find((note) => note.id === noteId);
		if (noteToEdit) {
			setNoteToEdit(noteToEdit);
		}
	};

	const handleNoteUpdate = (updatedNote: NoteItem) => {
		const updatedNotes = notes.map((note) =>
			note.id === updatedNote.id ? updatedNote : note
		);
		setNotes(updatedNotes);
		setNoteToEdit(undefined);
	};

	const handleNoteDelete = (noteId: string) => {
		const shouldDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?');
		if (shouldDelete) {
			const updatedNotes = notes.filter((note) => note.id !== noteId);
			setNotes(updatedNotes);
		}
	};


	return (
		<div className="app">
			<h1>Note Manager</h1>
			<NoteForm
				onNoteCreate={handleNoteCreate}
				onNoteUpdate={handleNoteUpdate}
				noteToEdit={noteToEdit}
			/>
			<NoteList
				notes={notes}
				onNoteEdit={handleNoteEdit}
				onDeleteNote={handleNoteDelete} // Nouvelle prop pour la suppression de la note
			/>


		</div>
	);
};

export default App;
