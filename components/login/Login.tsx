import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Services from '../../services/Service'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

// Se define la información que va a contener nuestro formulario
interface LoginFormValues {
    email: string;
    pass: string;
};

// Después se setean los valores iniciales del formulario
const initialValues: LoginFormValues = {
    email: "",
    pass: ""
};

export default function Login() {

    const [fakeToken, setFakeToken] = useState('');

    useEffect(() => {
        setFakeToken(JSON.parse(localStorage.getItem('fakeToken')));
        if ( fakeToken !== null && fakeToken !== '') { 
          router.push('/employees');
        } else {
            router.push('/login');
        }
    }, [])
    

    const router = useRouter();

    const isRequired = 'Campo obligatorio';
    const isEmail = 'Formato de correo incorrecto'
    const validationSchema = yup.object().shape({
        email: yup.string().email(isEmail).required(isRequired),
        pass: yup.string().required(isRequired).min(8)
    }) 

  return (
    <div className='containerfatherLogin'>
        <Container className='containerChildLogin'>
            <Header as='h1' >
                Bienvenidos
            </Header>
            <Container>
                <Formik initialValues={initialValues} 
                    validationSchema={validationSchema}
                    onSubmit={(formikData) => {
                    Services.postLogin(formikData).then((res) => {
                        if (res.status === 200) {
                            router.push('/employees');
                        }
                    })
                }}>
                    <Form className='containerForm' onCopy={(event)=>{event.preventDefault()}} onPaste={(event)=>{event.preventDefault()}}>
                        <Field className='input_form' name="email" type="email" autocomplete="off"/>
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                        <Field className='input_form' name="pass" type="password" autocomplete="off"/>
                        <ErrorMessage
                          component="div"
                          name="pass"
                          className="invalid-feedback"
                        />
                        <Button className='btnLogin' type='submit'>Iniciar sesión</Button>
                    </Form>
                </Formik>
            </Container>
        </Container>
    </div>
  )
}

