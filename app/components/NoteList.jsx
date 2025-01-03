import styles from './NoteList.css';
import {Link} from "@remix-run/react";

function NoteList({ notes }) {
    return (
        <ul id="note-list">
            {notes.map((note, index) => (
                <li key={note.id} className="note">
                    {/* if we don't put the slash at the start of the to attribute it will append it to the end of url , with slash it's absolute path*/}
                    <Link to={note.id}>
                        <article>
                            <header>
                                <ul className="note-meta">
                                    <li>#{index + 1}</li>
                                    <li>
                                        <time dateTime={note.id}>
                                            {new Date(note.id).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </time>
                                    </li>
                                </ul>
                                <h2>{note.title}</h2>
                            </header>
                            <p>{note.content}</p>
                        </article>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NoteList;

export function links() {
    return [{rel: 'stylesheet', href: styles}];
}