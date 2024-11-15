import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price.jsx';
// import StarRating from '../../components/StarRating/StarRating.jsx';
import Tags from '../../components/Tags/Tags.jsx';
import { getById } from '../../services/productService.js';
import classes from './productPage.module.css';
import { useCart } from '../../hooks/useCart.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

function ProductPage() {

    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    }

    useEffect(() => {
        getById(id).then(setProduct);
    }, [id])


    return (
        <div>
            {
                !product
                    ? (<NotFound message='Product Not Found!' linkText='Back To Homepage' />)
                    : (
                        <div className={classes.container}>
                            <img
                                className={classes.image}
                                src={`${product.imageUrl}`}
                                alt={product.name}
                            />

                            <div className={classes.details}>
                                <div className={classes.header}>
                                    <span className={classes.name}>{product.name}</span>
                                    {/* <span className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
                                        ❤
                                    </span> */}
                                </div>

                                {/* <div className={classes.rating}>
                                    <StarRating stars={food.stars} size={25} />
                                </div> */}

                                {/* <div className={classes.origins}>
                                    {
                                        food.origins?.map(origin => (
                                            <span key={origin}>{origin}</span>
                                        ))
                                    }
                                </div> */}

                                {
                                    product.tags  && (
                                        <div className={classes.tags}>
                                            <Tags
                                                tags={product.tags.map(tag => (
                                                    { name: tag }
                                                ))}
                                                forProductPage={true}
                                            />
                                        </div>
                                    )
                                }

                                <div className={classes.description}>
                                    <span>
                                        {product.description}
                                    </span>
                                </div>

                                <div className={classes.price}>
                                    <Price price={product.price}></Price>
                                </div>

                                <button onClick={handleAddToCart}>Agregar al carrito</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ProductPage