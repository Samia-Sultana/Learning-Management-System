import React from 'react';
import { Link } from "react-router-dom";
import './AdminNavbar.css';

const AdminNavbar = (props) => {
    const url = props.url;
    return (
        <div className="navigation">
            <div className="nav-heading">
                <h2>Udamy</h2>
            </div>
            <div className="nav-items">
                <Link to="/admin/createTeacher" className="item">Create Teacher</Link>
                <Link to="/admin/addCourse" className="item">Add Course</Link>
                <Link to="/admin/manageCourse" className="item">Manage Course</Link>
                <Link to="/admin/bulkEmail" className="item">Send Email</Link>
 
            </div>

        </div>
    );
};

export default AdminNavbar;