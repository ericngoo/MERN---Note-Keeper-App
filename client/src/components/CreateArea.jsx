import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const [isExpanded, setExpanded] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function expandInput() {
        setExpanded(true);
    }

    function handleSubmit(event) {
        props.onAdd(note);
        event.preventDefault();
        setNote(() => {
            return {
                title: "",
                content: ""
            };
        });
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded ? <input
                    onChange={handleChange}
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    autoComplete="off"
                /> : null}
                <textarea
                    onChange={handleChange}
                    onClick={expandInput}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpanded ? "3" : "1"}
                    value={note.content}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={handleSubmit}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
