import React from 'react';
import {
    useParams
} from "react-router-dom";
import AddCourse from '../AddCourse/AddCourse';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import CreateTeacher from '../CreateTeacher/CreateTeacher';
import ManageCourse from '../ManageCourse/ManageCourse';
import './AdminPage.css';
 

const AdminPage = () => {
    let { selectedNav } = useParams();
    var content;
    const pageContent = () =>{
        console.log("hiiiiiiiiiiiii")
        if(selectedNav === 'dashboard'){
            console.log("dashboard")
            return content = <AdminDashboard/> 
        }
        else if(selectedNav === 'createTeacher'){
            console.log("create teacher")
            return content = <CreateTeacher/> 
        }
        else if(selectedNav === 'manageCourse'){
            console.log("manage course")
            return content = <ManageCourse/>
        }
        else if(selectedNav === 'addCourse'){
            console.log("add copurse")
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