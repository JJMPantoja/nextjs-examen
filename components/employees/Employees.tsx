import React from 'react'
import { useEffect, useState } from 'react'
import Services from '../../services/Service'
import { Container, Input, Table, Grid, GridColumn,  GridRow, Button } from 'semantic-ui-react'
import moment from 'moment'
import 'moment/locale/es-mx';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup';
import { Snackbar, Alert } from '@mui/material';
import LoaderScreen from '../shared/LoaderScreen'

interface LoginFormValues {
    name: string;
    last_name: string;
    birthday: string;
};

const initialValues: LoginFormValues = {
    name: '',
    last_name: '',
    birthday: '',
};

export default function EmployeesChild() {

    
    const [employee, setemployee] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [indice, setindice] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [busqueda, setBusqueda] = useState('');
    const isRequired = 'Campo obligatorio';
    const maxCaracteres = 'Màximo 30 caracteres';
    const [employeeFiltered, setEmployeeFiltered] = useState([]);
    const valorFilter = [];
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string().max(30, maxCaracteres).required(isRequired),
        last_name: yup.string().max(30, maxCaracteres).required(isRequired),
        birthday: yup.date().required(isRequired)
    }) 
    
    useEffect(() => {
      const res = Services.getEmployees().then(thenService);
      
    }, [])

    const thenService = (res) => {
            setemployee(res);
            const modulo = res.length % 10;
            debugger;
            modulo > 0 && modulo < 5 ? setTotalPages(Math.round( (res.length/ 10) + 1)) 
            : setTotalPages(Math.round( res.length/ 10));
            
    }
    
    const filteredData = () => {
        if (busqueda === '') {
            return employee.slice(currentPage, currentPage + 10);
        } else {
            return employeeFiltered.slice(currentPage, currentPage + 10);
        }
    }

    const goToFirstPage = async () => {
        if (indice > 1) {
            setCurrentPage(1);
            setindice(1);
            setCurrentPage(currentPage - currentPage);
        }
    }


    const goToPreviousPage = async () => {
        if (indice > 1) {
            setindice(indice - 1)
            setCurrentPage(currentPage - 10);

        }
    }

    const goToNextPage = () => {
        setindice(indice + 1);
        setCurrentPage(currentPage + 10);
    }

    const goToLastPage = async () => {

        if (indice < totalPages) {
            setindice(totalPages);
            setCurrentPage((totalPages - 1 ) * 10);
        }
    }

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        elementSearch(busqueda);
    }

    const elementSearch = (terminoBusqueda) => {
        const resultado = employee.filter((elemento) => {
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.last_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                console.log(elemento);
                valorFilter.push(elemento);
                setEmployeeFiltered(valorFilter);
              return elemento;
            } 
          });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
  return (
    <>
    {
        loading ? <LoaderScreen /> : 
                <Container className='containerTable'>
            <Formik
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={(formikData, {resetForm}) => {
                formikData.birthday = moment(formikData.birthday).format('YYYY/MM/DD');
                setLoading(true);
                Services.createUSer(formikData).then((res) => {
                    Services.getEmployees().then(thenService);
                    resetForm();
                    setLoading(false);
                    setOpen(true);
                })
            }}
            >
                <Form className='containerForm'>
                    <Field placeholder='Nombre(s)' className='inputFormEmployee' name='name' type='text'/>
                    <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback"
                        />
                    <Field placeholder='Apellido(s)' className='inputFormEmployee' name='last_name' type='text'/>
                    <ErrorMessage
                          component="div"
                          name="last_name"
                          className="invalid-feedback"
                        />
                    <Field className='inputFormEmployee' name='birthday' type='date'/>
                    <ErrorMessage
                          component="div"
                          name="birtday"
                          className="invalid-feedback"
                        />
                    <Button className='btnEmployees' type='submit'>Crear empleado</Button>
                </Form>
            </Formik>
            <br />
            <br />
            <Input 
                action={{ icon: 'search' }}
                className='inputSearchEmployee'
                placeholder='Buscar'
                value={busqueda}
                onBlur={handleChange}
                onChange={handleChange} 
            />

            <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Nombre completo</Table.HeaderCell>
                    <Table.HeaderCell>Cumpleaños</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  
                {filteredData().map((item, index) => {
                    return (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.name} {item.las_name}</Table.Cell>
                                <Table.Cell>{moment(item.birthday).format('DD/MM/YYYY') }</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
                  
                </Table.Body>
            </Table>
            <Grid width={16} className="centered aligned">
                    <GridRow>

                        <GridColumn width={8}>
                            <div>
                                <Grid className="centered aligned">
                                    <GridRow columns={2}>
                                        <Button
                                            disabled={indice === 1}
                                            className="buttonAction btn-simple-ghost to-left" onClick={goToFirstPage}>
                                            <i className="noMarginIcon angle double left icon"></i>
                                        </Button>

                                        <Button
                                            disabled={indice === 1}
                                            className="buttonAction btn-simple-ghost to-left" onClick={goToPreviousPage}>
                                            <i className="noMarginIcon angle left icon"></i>
                                        </Button>

                                        <Button

                                            className="buttonAction btn-simple-ghost to-left">
                                            {indice}
                                        </Button>

                                        <Button
                                            disabled={indice === totalPages}
                                            className="buttonAction btn-simple-ghost to-left" onClick={goToNextPage}>
                                            <i className="noMarginIcon angle right icon"></i>
                                        </Button>

                                        <Button
                                            disabled={indice === totalPages}
                                            className="buttonAction btn-simple-ghost to-left" onClick={goToLastPage}>
                                            <i className="noMarginIcon angle double right icon"></i>
                                        </Button>
                                    </GridRow>
                                </Grid>
                            </div>
                        </GridColumn>
                    </GridRow>
                    </Grid>
        </Container>
            }
        

        <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert icon={<i className="small user plus icon"></i>}
                     severity='success' className="toast" sx={{ width: '100%', justifyContent:'center', alignItems:'center' }}>
                    Usuario agregado exitosamente
                </Alert>
        </Snackbar>
  </>
  )
}
