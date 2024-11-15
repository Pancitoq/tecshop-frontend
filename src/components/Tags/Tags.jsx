import { Link } from 'react-router-dom';
import classes from './tags.module.css';

/**
 * Componente de categorías o etiquetas
 * @param {*} param0 categorías y boolean si la página de origen es product page
 * @returns 
 */
function Tags({ tags, forProductPage }) {
    return (
        <div
            className={classes.container}
            style={{
                justifyContent: forProductPage ? 'start' : 'center'
            }}
        >
            {
                tags?.map(tag => (
                    <Link key={tag.name} to={`/tag/${tag.name}`}>
                        {tag.name}
                        {!forProductPage && ` (${tag.count})`}
                    </Link>
                ))
            }
        </div>
    )
}

export default Tags