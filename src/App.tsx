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
	const [noteToEdit, setNoteToEdit] = useState<NoteItem | undefined>(undefined);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

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
		const shouldDelete = window.confirm(
			'Êtes-vous sûr de vouloir supprimer cette note ?'
		);
		if (shouldDelete) {
			const updatedNotes = notes.filter((note) => note.id !== noteId);
			setNotes(updatedNotes);
		}
	};

	const filteredNotes = notes.filter(
		(note) =>
			note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			note.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
			note.grade.toString().toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	return (
		<div className="app">
			<h1>Gestionnaire de note</h1>
			<div className="input-wrapper">
				<label>Rechercher</label>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Rechercher..."
				/>
			</div>

			<NoteForm
				onNoteCreate={handleNoteCreate}
				onNoteUpdate={handleNoteUpdate}
				noteToEdit={noteToEdit}
			/>
			<NoteList
				notes={filteredNotes}
				onNoteEdit={handleNoteEdit}
				onDeleteNote={handleNoteDelete}
			/>
		</div>
	);
};

export default App;

