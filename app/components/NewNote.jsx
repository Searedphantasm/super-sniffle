import styles from './NewNote.css';
import {Form, useActionData, useNavigation} from "@remix-run/react";

function NewNote({error}) {
    const data = useActionData();
    const navigation = useNavigation();
    // getting data about what is happening and back-scene requests.
    // navigation.state
    // navigation.type

    const isSubmitting =  navigation.state === "submitting";

    return (
        <Form method="post" id="note-form">
            {data?.message && <p>{data.message}</p>}
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" required />
            </p>
            <div className="form-actions">
                <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Note"}</button>
            </div>
        </Form>
    );
}

export default NewNote;

// remix don't give a shit about other routes links functions.
export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}