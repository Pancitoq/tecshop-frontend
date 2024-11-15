import { useEffect, useReducer } from 'react';
import classes from './ordersPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteOrderById, getAll, getAllStatus } from '../../services/orderService.js';
import Title from '../../components/Title/Title.jsx';
import DateTime from '../../components/DateTime/DateTime.jsx';
import Price from '../../components/Price/Price.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth.jsx';

const initialState = {};
const reducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case 'ALL_STATUS_FETCHED':
            return { ...state, allStatus: payload };
        case 'ORDERS_FETCHED':
            return { ...state, orders: payload };
        case 'DELETE_ORDER':
            return { ...state, orders: state.orders.filter(order => order.id !== payload) };
        default:
            return state;
    }
};

function OrdersPage() {

    const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);
    const { filter } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        getAllStatus().then(status => {
            dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
        });
        getAll(filter)
            .then(orders => {
                dispatch({ type: 'ORDERS_FETCHED', payload: orders });
            });
    }, [filter]);

    const deleteOrder = async orderId => {
        const confirmed = window.confirm(`Borrar la orden ${orderId} ?`);
        if (!confirmed) return;

        await deleteOrderById(orderId)
            .then(() => {
                toast.success('Eliminado con éxito');
                dispatch({ type: 'DELETE_ORDER', payload: orderId });
            })
            .catch(e => toast.error(e))
    }

    return (
        <div className={classes.container}>
            <Title title='Órdenes' margin='1.5rem 0 0 0.2rem' fontSize='1.9rem' />

            {
                allStatus && (
                    <div className={classes.all_status}>

                        <Link to='/orders' className={!filter ? classes.selected : ''}>
                            TODOS
                        </Link>

                        {
                            allStatus.map(state => (
                                <Link
                                    key={state}
                                    className={state === filter ? classes.selected : ''}
                                    to={`/orders/${state}`}
                                >
                                    {state}
                                </Link>
                            ))
                        }
                    </div>
                )
            }

            {
                orders?.length === 0 && (
                    <NotFound
                        linkRoute={filter ? '/orders' : '/home'}
                        linkText={filter ? 'Ver Todos' : 'Ir al inicio'}
                    />
                )
            }

            {
                orders && (
                    orders.map(order => (
                        <div key={order.id} className={classes.order_summary}>
                            <div className={classes.header}>
                                <span>{order.id}</span>
                                <span>
                                    <DateTime date={order.createdAt} />
                                </span>
                                <span>
                                    {order.status}
                                </span>
                            </div>

                            <div className={classes.items}>
                                {order.items.map(item =>
                                    <Link key={item.product.id} to={`/product/${item.product.id}`}>
                                        <img src={item.product.imageUrl} alt={item.product.name} />
                                    </Link>
                                )}
                            </div>

                            <div className={classes.footer}>
                                <div className={classes.actions}>
                                    <Link to={`/track/${order.id}`}>Ver orden</Link>
                                    {
                                        user.isAdmin && (
                                            <button
                                                type='button'
                                                className={classes.btn_delete}
                                                onClick={() => deleteOrder(order.id)}
                                            >
                                                Borrar
                                            </button>
                                        )
                                    }
                                </div>
                                <div>
                                    <span className={classes.price}>
                                        <Price price={order.totalPrice} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default OrdersPage