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
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick }) => {
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
                    onClick={() => onNoteClick(note.id)}
                >
                    <Note
                        title={note.title}
                        date={note.date}
                        comment={note.comment.substring(0, 50) + '...'}
                    />
                </div>
            ))}
        </div>
    );
};

export default NoteList;
