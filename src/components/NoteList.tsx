// NoteList.tsx
import React, { useState } from 'react';
import Note from './Note';

interface NoteItem {
    id: string;
    title: string;
    grade: number;
    date: string;
    comment: string;
}

interface NoteListProps {
    notes: NoteItem[];
    onNoteEdit: (noteId: string) => void;
    onDeleteNote: (noteId: string) => void;
}


const NoteList: React.FC<NoteListProps> = ({ notes, onNoteEdit, onDeleteNote }) => {

    const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>(notes);

    const handleNoteDelete = (noteId: string) => {
        onDeleteNote(noteId); // Appeler la fonction onDeleteNote pour supprimer la note
    };

    return (
        <div className="note-list">
            {notes.map((note) => (
                <div
                    className={`note-item ${note.grade < 8
                        ? 'red'
                        : note.grade < 10
                            ? 'orange'
                            : note.grade < 13
                                ? 'yellow'
                                : 'green'
                        }`}
                    key={note.id}
                >
                    <Note
                        title={note.title}
                        date={note.date}
                        note={note.grade}
                        comment={note.comment.substring(0, 50) + '...'}
                    />
                    <div className="note-actions">
                        <button onClick={() => onNoteEdit(note.id)}>Edit</button>
                        <button onClick={() => handleNoteDelete(note.id)}>Delete</button> {/* Nouveau bouton de suppression */}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default NoteList;
