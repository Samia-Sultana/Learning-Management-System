
import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateTeacher.css';


const CreateTeacher = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
       

    }

    return (
        <div className="createAdmin">
            <div className="pageHeading">
                <h3 className="createHeading">Create Teacher account</h3>
            </div>
            <div className="adminFormPart">
                <form onSubmit={handleSubmit(onSubmit)} className="adminForm">
                    <div className="adminInput">
                        <input {...register("name", { required: true })} placeholder="Name" />
                        {errors.name?.type === 'required' && "First name is required"}
                    </div>

                    <div className="adminInput">
                        <input {...register("email", { required: true })} placeholder="Email" />
                        {errors.email?.type === 'required' && "Email is required"}
                    </div>

                    <div className="adminInput">
                        <input {...register("contact", { required: true })} placeholder="Contact number" />
                        {errors.contact && "Contact Number is required"}
                    </div>

                    <div className="adminInput">
                        <input type="password"  {...register("password", { required: true })} placeholder="Password" />
                        {errors.password?.type === 'required' && "password is required"}
                    </div>

                    <div className="createAdminButton"><input type="submit" className="create" /></div>
                </form>
            </div>
        </div>

    );
};

export default CreateTeacher;