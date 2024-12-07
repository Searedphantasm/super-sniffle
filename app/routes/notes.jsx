import NewNote , {links as newNoteLinks} from "../components/NewNote.jsx"


const NotesPage = () => {
    return (
        <main>
            <NewNote />
        </main>
    );
};

export default NotesPage;

export function links() {
    return [...newNoteLinks()];
}