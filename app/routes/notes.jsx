import NewNote , {links as newNoteLinks} from "../components/NewNote.jsx"
import NoteList, {links as noteListLinks} from "../components/NoteList.jsx"
import {getStoredNotes, storeNotes} from "../data/notes.js";
import {isRouteErrorResponse, Link, redirect, useLoaderData, useRouteError} from "@remix-run/react";

const NotesPage = () => {
    const notes = useLoaderData();

    return (
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    );
};

// activated when a GET request reach this route.
export async function loader(){
    const notes = await getStoredNotes();

    if (!notes || notes.length === 0 ) {
        // a thrown Response rendered the closest ErrorBoundary.
        throw new Response("No notes found.",{
            status: 404,
            statusText: "Not Found",
        });
    }

    // returns to the frontend
    // if the user is visiting our website for the firstTime it will render on the serverside.

    // return new Response(JSON.stringify(notes),{headers:{"Content-type": "application/json"}});
    return notes;
}

export default NotesPage;

// backend code. Only executes this code on server
// It's activated when the non-GET request get to the route.
export async function action({request}){
    // extracting submited data from the coming request
    const formData = await request.formData();

    const noteData = {
        title: formData.get('title'),
        content: formData.get('content'),
    }

    if (noteData.title.trim().length < 5){
        return {
            message:"Invalid title - must be at least 5 characters long.",
        }
    }

    // another way of doing this.
    // const noteData = Object.fromEntries(formData);
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);

    await storeNotes(updatedNotes);
    return redirect(`/notes`);
}

export function links() {
    return [...newNoteLinks(),...noteListLinks()];
}

export function meta() {
    return [{
        title: "All Notes",
        description: "Manage your notes with ease",
    }]
}

export function ErrorBoundary() {
    const error = useRouteError();

    // when true, this is what used to go to `CatchBoundary`
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <NewNote />
                <p className={"info-message"}>{error.data}</p>
            </main>
        );
    }

    // Any value can be thrown, not just errors!

    return (
        <main className={"error"}>

            <h1>
                An error related to your notes occurred!
            </h1>
            <p>
                {error.message}
            </p>
            <p>Back to <Link to={"/"}>
                safety!
            </Link></p>
        </main>
    )
}