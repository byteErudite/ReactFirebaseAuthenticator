import React,{useRef,useState} from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'

export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const[error,setError] = useState();
    const[loading, setLoading] = useState(false);
    const {signup} = useAuth.signup;

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== confPasswordRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (e) {
            setError('signup failed,  Please try again....');
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                <h2 className='text-center mb4'>SignUp</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label >Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="confirmPassword">
                        <Form.Label >Passsword Confirmation</Form.Label>
                        <Form.Control type="password" ref={confPasswordRef} required/>
                    </Form.Group><br/>
                    <Button disabled={loading} className = 'w-100' type="submit">SignUp</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account ? logIn
            </div>
        </>
    )
}


