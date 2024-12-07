
import {Link, useLoaderData} from "@remix-run/react";
import styles from "../styles/note-detail.css"
import {getStoredNotes} from "../data/notes.js";

function NoteDetailPage() {

    const note = useLoaderData();

    return (
        <main id={"note-details"}>
            <header>
                <nav>
                    <Link to={"/notes"} > Back to all Notes </Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id={"note-detail-content"}>{note.content}</p>
        </main>
    );
}

export function meta({data}){
    return [{
        title:data.title,
        description:data.description,
    }]
}

export default NoteDetailPage;

// params exists on params too.
export async function loader({params}){
    const notes= await getStoredNotes();
    const noteId = params.noteId;
    const selectedNote = notes.find(note => note.id === noteId);
    if (!selectedNote) {
        throw new Response("No note found with id " + noteId,{status:404});
    }
    return selectedNote;
}

export function links(){
    return [{
        rel:"stylesheet",
        href:styles
    }]
}