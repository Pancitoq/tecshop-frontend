import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css';
// import StarRating from '../StarRating/StarRating.jsx';
import Price from '../Price/Price.jsx';

function Thumbnails({ products }) {
    return (
        <ul className={classes.list}>
            {
                products.map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img
                                className={classes.image}
                                src={`${product.imageUrl}`}
                                alt={product.name}
                            />

                            <div className={classes.content}>
                                <div className={classes.name}>
                                    {/* {food.name} */}
                                    {
                                        product.name.length < 35
                                        ? product.name
                                        : product.name.slice(0, 35) + '...'
                                    }
                                </div>
                                {/* <span
                                    className={`${classes.favorite} 
                                ${food.favorite
                                            ? ''
                                            : classes.not
                                        }`}
                                >
                                    ❤
                                </span> */}
                                {/* <div className={classes.stars}>
                                    <StarRating stars={food.stars} />
                                </div> */}
                                {/* <div className={classes.product_item_footer}>
                                    <div className={classes.origins}>
                                        {
                                            food.origins.map(origin => (
                                                <span key={origin}>{origin}</span>
                                            ))
                                        }
                                    </div>
                                    <div className={classes.description}>
                                        {
                                            food.description.length < 55
                                                ? food.description
                                                : food.description.slice(0, 56) + '...'
                                        }
                                    </div>
                                </div> */}
                                <div className={classes.price}>
                                    <Price price={product.price} />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default Thumbnails