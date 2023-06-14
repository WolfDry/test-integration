// NoteForm.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface NoteItem {
    id: string;
    title: string;
    grade: number;
    date: string;
    comment: string;
}

interface NoteFormProps {
    onNoteCreate: (newNote: NoteItem) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreate }) => {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [comment, setComment] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(e.target.value);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newNote: NoteItem = {
            id: uuidv4(),
            title: title,
            grade: parseInt(grade),
            comment: comment,
            date: new Date().toLocaleString(),
        };
        onNoteCreate(newNote);
        setTitle('');
        setGrade('');
        setComment('');
    };

    return (
        <div className="note-form">
            <h3>Create a Note</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="grade">Grade:</label>
                    <input
                        type="number"
                        id="grade"
                        value={grade}
                        onChange={handleGradeChange}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default NoteForm;
