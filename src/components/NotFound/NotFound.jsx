import { Link } from 'react-router-dom';
import classes from './notFound.module.css';

function NotFound({ message = 'Sin registros por mostrar!', linkRoute = '/home', linkText = 'Ir al Inicio' }) {
    return (
        <div className={classes.container}>
            {message}
            <Link to={linkRoute}>{linkText}</Link>
        </div>
    )
}

export default NotFound