import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Services from '../../services/Service'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

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

    const router = useRouter();
    const [fakeToken, setFakeToken] = useState('');
    const [open, setOpen] = useState(false);
    const [resSerLogin, setResSerLogin] = useState('');
    const isRequired = 'Campo obligatorio';
    const isEmail = 'Formato de correo incorrecto';

    useEffect(() => {
        setFakeToken(JSON.parse(localStorage.getItem('fakeToken')));
        if ( fakeToken !== null && fakeToken !== '') { 
          router.push('/employees');
        } else {
            router.push('/login');
        }
    }, [])
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                        console.log(res);
                        // if (res === 200) {
                        //     router.push('/employees');
                        // } else {
                        //     // console.log(res);
                        //     // setResSerLogin(res)
                        //     setOpen(true);
                        // }
                    })
                }}>
                    <Form className='containerForm' onCopy={(event)=>{event.preventDefault()}} onPaste={(event)=>{event.preventDefault()}}>
                        <label>Correo</label>
                        <Field placeholder="ejemplo@ejemplo.com" className='input_form' name="email" type="email" autocomplete="off"/>
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                        <label>Contraseña</label>
                        <Field placeholder="ingresa una contraseña" className='input_form' name="pass" type="password" autocomplete="off"/>
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

        <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert icon={<i className="small user plus icon"></i>}
                     severity='error' className="toast" sx={{ width: '100%', justifyContent:'center', alignItems:'center' }}>
                    
                </Alert>
        </Snackbar>
    </div>
  )
}

