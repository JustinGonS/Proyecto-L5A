import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './LoginForm.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const defaultState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(defaultState);
    const [errors, setErrors] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate])

    const onInputChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const errors = [];

        if (!formData.email) {
            errors.push('The email is required');
        }
        if (!formData.password) {
            errors.push('The password is required');
        }
        if (formData.email && formData.password) {
            // aquí se llama a un API para validar los datos
            if (formData.email !== 'test@gmail.com' ||
                formData.password !== 'user123'
            ) {
                errors.push('Invalid credentials');
            }
        }

        if (errors.length === 0) {
            setIsLoggedIn(true);
        }

        setErrors(errors);
    };

    return (
        <Form className='login-form' onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={formData.email} onChange={onInputChange}
                    name="email"
                    placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3"
                controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={formData.password} onChange={onInputChange}
                    name="password" placeholder="Password" />
            </Form.Group>
            {errors.length > 0 && errors.map(error => <Alert
                variant={"danger"}>{error}</Alert>)}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default LoginForm;
