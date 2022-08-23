import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import firebaseConfig from '../Configuration/firebaseConfig';

const app = initializeApp(firebaseConfig);


const Registration = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword)
            .then((userCredential) => {
                const token = userCredential.user.accessToken;
                navigate(from);
            })

    }

    const handleGoogleSignUp = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                navigate(from);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <div className="login-container">
                <div className="login-signup-form">
                    <h3>Create an account</h3>
                    <Form onSubmit={handleSubmit(onSubmit)} className="">
                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Control size="sm" type="text" {...register("userName", { required: true })} placeholder="Name" />
                            {errors.userName?.type === 'required' && "User name is required"}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userEmail">
                            <Form.Control size="sm" type="email" {...register("userEmail", { required: true })} placeholder="Email" />
                            {errors.userEmail && "email is required"}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userPassword">
                            <Form.Control size="sm" type="password"  {...register("userPassword", { required: true })} placeholder="Password" />
                            {errors.userPassword?.type === 'required' && "password is required"}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmUserPass">
                            <Form.Control size="sm" type="password" {...register("confirmUserPass", { required: true })} placeholder="Confirm password" />
                            {errors.confirmUserPass?.type === 'required' && "confirm password is required"}
                        </Form.Group>
                        <Button type="submit">Sign up</Button>
                    </Form>
                    <p><small>Already have an account?<Link to="/">Login</Link></small></p>
                </div>
                <div className="signup-login-with">
                    <button onClick={handleGoogleSignUp} className="googleLogin"><FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
                </div>

            </div>
    );
};

export default Registration;