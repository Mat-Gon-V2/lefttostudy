import {useState } from "react";
import { format } from 'date-fns'
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from "react-bootstrap";
import './lista.css'


let id = 0
const defaultMateria = {
    id: '',
    nombre: '',
    unidades: '',
    fecha: ''
    };

const Lista = () => {
    const [listaDeMaterias, setlistaDeMaterias] = useState([]);
    const [materia, setmateria] = useState(defaultMateria);

        const handleSubmit = (event) => {
        event.preventDefault();
        id++
        console.log(id)
        setlistaDeMaterias([...listaDeMaterias,
            {
            id: id,
            nombre: materia.nombre,
            unidades: materia.unidades,
            fecha: materia.fecha
            }]);
        setmateria({nombre: '', unidades: ''})
    }

    const handleChange = (event) => {
        const atrib = event.target.name;
        const value = event.target.value;
        setmateria(materia => ({...materia, [atrib]: value}))       
    }

    const eliminarMateria = (matid) => {
        const listaFiltrada = listaDeMaterias.filter((mat) => {
            return matid!==mat.id;
        });
        setlistaDeMaterias(listaFiltrada);
    }

    return (
        <div>
            <h1>LeftToStudy</h1>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form onSubmit={handleSubmit}>                    
                            <Form.Group  >
                                <Form.Label >Nombre Materia: </Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='nombre' 
                                    value={materia.nombre || ''}
                                    onChange={handleChange}  
                                    required
                                />                        
                                <Form.Label>Unidades: </Form.Label> 
                                <Form.Control 
                                    type='number' 
                                    name="unidades"
                                    value={materia.unidades || ''} 
                                    onChange={handleChange} 
                                    required
                                />
                                <Form.Label>Fecha: </Form.Label> 
                                <ReactDatePicker 
                                    wrapperClassName=""
                                    name='fecha'
                                    value={materia.fecha || ''} 
                                    selected={materia.fecha} 
                                    onChange={date => setmateria(materia => ({...materia, fecha: date}))} 
                                    dateFormat='dd/MM/yyyy'
                                    minDate={new Date()}
                                    isClearable   
                                />                    
                                <Button type="submit">
                                    Agregar
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            {listaDeMaterias.map((mat) => (    
                <div key={mat.id}>             
                        <span>Materia: {mat.nombre}  </span>
                        <span>Unidades: {mat.unidades}  </span>
                        <span>Fecha: {format(mat.fecha, 'dd-MM-yyyy')}</span>
                        <Button 
                            type="Button" 
                            onClick={() => {
                                eliminarMateria(mat.id)
                            }}
                            >Borrar
                        </Button>                      
                </div>
                    
                ))}
            
            
        </div>

    )
}

export default Lista;