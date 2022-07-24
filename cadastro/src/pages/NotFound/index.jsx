import { React } from 'react';
import './style.css'

const NotFound = () => {   
    return (
        <div className="not-found">
            <h1>404 Not found</h1>
            <p>{window.location.pathname} not found in this server.</p>
        </div>
    )
}

export default NotFound;