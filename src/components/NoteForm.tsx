// NoteForm.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/css/NoteForm.css'; // Import du fichier CSS

interface NoteItem {
    id: string;
    title: string;
    grade: number;
    date: string;
    comment: string;
}

interface NoteFormProps {
    onNoteCreate: (newNote: NoteItem) => void;
    onNoteUpdate: (updatedNote: NoteItem) => void;
    noteToEdit?: NoteItem;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreate, onNoteUpdate, noteToEdit }) => {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setGrade(noteToEdit.grade.toString());
            setComment(noteToEdit.comment);
        }
    }, [noteToEdit]);

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
            id: noteToEdit ? noteToEdit.id : uuidv4(),
            title: title,
            grade: parseInt(grade),
            comment: comment,
            date: noteToEdit ? noteToEdit.date : new Date().toLocaleString(),
        };
        if (noteToEdit) {
            onNoteUpdate(newNote);
        } else {
            onNoteCreate(newNote);
        }
        setTitle('');
        setGrade('');
        setComment('');
    };

    return (
        <div className="note-form">
            <h3>{noteToEdit ? 'Modifier la note' : 'Créer une note'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div className="label-input">
                        <label htmlFor="title">Titre:</label>
                        <input
                            title='title'
                            type="text"
                            data-testid="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="label-input">
                        <label htmlFor="grade">Note:</label>
                        <input
                            title='grade'
                            type="number"
                            data-testid="grade"
                            value={grade}
                            onChange={handleGradeChange}
                        />
                    </div>
                    <div className="label-input">
                        <label htmlFor="comment">Commentaire:</label>
                        <textarea
                            data-testid="comment"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </div>
                </div>
                <button type="submit" data-testid='addButton'>{noteToEdit ? 'Modifier' : 'Créer'}</button>
            </form>
        </div>
    );
};

export default NoteForm;
