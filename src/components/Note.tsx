// Note.tsx
import React from 'react';

interface NoteProps {
    title: string;
    date: string;
    comment: string;
}

const Note: React.FC<NoteProps> = ({ title, date, comment }) => {
    return (
        <div className="note">
            <h3>{title}</h3>
            <p>Date: {date}</p>
            <p>{comment}</p>
        </div>
    );
};

export default Note;
