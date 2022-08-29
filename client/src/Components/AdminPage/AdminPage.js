import React from 'react';
import {
    useParams
} from "react-router-dom";
import AddCourse from '../AddCourse/AddCourse';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import CreateTeacher from '../CreateTeacher/CreateTeacher';
import ManageCourse from '../ManageCourse/ManageCourse';
import './AdminPage.css';
 

const AdminPage = () => {
    let { selectedNav } = useParams();
    var content;
    const pageContent = () =>{
        if(selectedNav === 'createTeacher'){
            return content = <CreateTeacher/> 
        }
        else if(selectedNav === 'manageCourse'){
            return content = <ManageCourse/>
        }
        else if(selectedNav === 'addCourse'){
            return content = <AddCourse/>
        }
    }
    
    
    return (
        <div className="adminPage">
            <div className="adminNavbar">
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="adminPageContent">
                    {
                        pageContent()
                    }
            </div>
        </div>
    );
};

export default AdminPage;