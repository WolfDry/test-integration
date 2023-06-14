// NoteList.tsx
import React from 'react';
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
    onNoteClick: (noteId: string) => void;
    onNoteEdit: (noteId: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, onNoteEdit }) => {
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
                        comment={note.comment.substring(0, 50) + '...'}
                    />
                    <div className="note-actions">
                        <button onClick={() => onNoteEdit(note.id)}>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
