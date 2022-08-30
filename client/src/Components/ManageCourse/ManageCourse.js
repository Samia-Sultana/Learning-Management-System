import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ManageCourse.css';

const  ManageCourse = () => {
    const [courses, setCourses] = useState();
    useEffect(() => {
        fetch('http://localhost:8080/manage/course')
            .then(res => res.json())
            .then(data => setCourses(data))
    },[])
    
   /* const handleDeleteService =(service)=>{
        const serviceId = service._id;
        fetch(`http://localhost:8080/delete/${serviceId}`)
        .then(res => res.json())
        .then(data => {
           console.log(data.deletedCount);
           const remainingService = courses.filter(service =>{
               if(service._id !== serviceId){
                   return service._id;
               }
            })
            setCourses(remainingService);
        })
    }*/

    return (
        <div className="manage-product">
            <div className="heading">
                <h1>Manage Course</h1>
            </div>
              <div className="table-container">
              <table class="table table-borderless serviceTable">
                <thead class="thead">
                    <tr className="tr">
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                     { 
                     courses?.map((course,index) =>(
                         <tr key={index} className="tr">
                             <td>{course.name}</td>
                             <td>${course.price}</td>
                             <td><Button variant="success" style={{marginRight: "5px"}}><FontAwesomeIcon icon={faPen}/></Button> 
                             <Button variant="danger" /*onClick={()=>{handleDeleteService(service)}}*/><FontAwesomeIcon icon={faTrashAlt} /></Button>
                             </td>
                        </tr>
                     ))
                     }
                </tbody>
            </table>
              </div>
        </div>
    );
};

export default ManageCourse;