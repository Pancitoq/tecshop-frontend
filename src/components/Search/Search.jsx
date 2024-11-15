import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';

function Search({ searchRoute = '/search/', defaultRoute = '/home', placeholder = 'Buscar...', margin }) {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchTerm } = useParams();

    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm])


    const search = async () => {
        term ? navigate(searchRoute + term) : navigate(defaultRoute)
    }

    return (
        <div className={classes.container} style={{ margin }}>

            <input
                type='text'
                placeholder={placeholder}
                onChange={e => setTerm(e.target.value)}
                // evento que se ejecuta cuando se suelta la tecla
                onKeyUp={e => e.key === 'Enter' && search()}
                value={term}
            />
            <button onClick={search}>
                Buscar
            </button>
        </div>
    )
}

export default Search