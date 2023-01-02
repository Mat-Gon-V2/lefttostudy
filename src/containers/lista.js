import {useState } from "react";
import { format } from 'date-fns'
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


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
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Materia: 
                    <input 
                        type='text' 
                        name='nombre' 
                        value={materia.nombre || ''}
                        onChange={handleChange}  
                        required
                    />                        
                    Unidades: 
                    <input 
                        type='number' 
                        name="unidades"
                        value={materia.unidades || ''} 
                        onChange={handleChange} 
                        required
                    />
                    Fecha: 
                    <ReactDatePicker 
                        name='fecha'
                        value={materia.fecha || ''} 
                        selected={materia.fecha} 
                        onChange={date => setmateria(materia => ({...materia, fecha: date}))} 
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        isClearable                       
                        
                    />
                    
                    <button type="submit">
                        Agregar
                    </button>
                </label>
            </form>
            {listaDeMaterias.map((mat) => (    
                <div key={mat.id}>             
                        <span>Materia: {mat.nombre}  </span>
                        <span>Unidades: {mat.unidades}  </span>
                        <span>Fecha: {format(mat.fecha, 'dd-MM-yyyy')}</span>
                        <button 
                            type="button" 
                            onClick={() => {
                                eliminarMateria(mat.id)
                            }}
                            >Borrar
                        </button>                      
                </div>
                    
                ))}
            
            
        </div>

    )
}

export default Lista;