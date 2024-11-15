import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title.jsx';
import { useCart } from '../../hooks/useCart.jsx';
import classes from './cartPage.module.css';
import Price from '../../components/Price/Price.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

function CartPage() {

    const { cart, removeFromCart, changeQuantity } = useCart();

    return (
        <>
            <Title title='Carro de compras' margin='1.5rem 0 0 2.5rem' />
            {
                cart.items.length === 0
                    ? (<NotFound message='El carrito está vacío!' />)
                    : (
                        <div className={classes.container}>
                            <ul className={classes.list}>
                                {
                                    cart.items.map(item => (
                                        <li key={item.product.id}>
                                            <div>
                                                <img
                                                    src={`${item.product.imageUrl}`}
                                                    alt={item.product.name}
                                                />
                                            </div>

                                            <div>
                                                <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                            </div>

                                            <div>
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) => changeQuantity(item, Number(e.target.value))}
                                                >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                </select>
                                            </div>

                                            <div>
                                                <Price price={item.price} />
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className={classes.remove_button}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                            <div className={classes.checkout}>
                                <div>
                                    <div className={classes.foods_count}>
                                        {cart.totalCount}
                                    </div>
                                    <div className={classes.total_price}>
                                        <Price price={cart.totalPrice} />
                                    </div>
                                </div>

                                <Link to='/checkout'>Continuar</Link>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default CartPage
