import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ManageCourse.css';

const  ManageCourse = () => {
    const [services, setServices] = useState();
    useEffect(() => {
        fetch('http://localhost:4200/getAllService')
            .then(res => res.json())
            .then(data => setServices(data))
    },[])
    
    const handleDeleteService =(service)=>{
        const serviceId = service._id;
        fetch(`http://localhost:4200/delete/${serviceId}`)
        .then(res => res.json())
        .then(data => {
           console.log(data.deletedCount);
           const remainingService = services.filter(service =>{
               if(service._id !== serviceId){
                   return service._id;
               }
            })
            setServices(remainingService);
        })
    }

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
                     services?.map((service,index) =>(
                         <tr key={index} className="tr">
                             <td>{service.name}</td>
                             <td>${service.price}</td>
                             <td><Button variant="success" style={{marginRight: "5px"}}><FontAwesomeIcon icon={faPen}/></Button> 
                             <Button variant="danger" onClick={()=>{handleDeleteService(service)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
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