import React from 'react';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import axios from "axios"

function Header(props) {

    async function handleClick() {
        try {
            const resp = await axios.get("/logout")
            props.sessionStatus(resp.data)
        } catch (err) {
            console.log(err);
        }
    }

    return <header>
        <h1 style={{ marginLeft: "10px",  display: "inline"}}>
            <CloudQueueIcon />
        Note Keeper
        </h1>

        <div className="logout" onClick={handleClick}>Log Out </div>

    </header>
}

export default Header;