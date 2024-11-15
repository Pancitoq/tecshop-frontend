import { useNavigate } from 'react-router-dom';
import classes from './checkoutPage.module.css';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useCart } from '../../hooks/useCart.jsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderService.js';
import Input from '../../components/Input/Input.jsx';
import Title from '../../components/Title/Title.jsx';
import Button from '../../components/Button/Button.jsx';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList.jsx';
import Map from '../../components/Map/Map.jsx';

function CheckoutPage() {

    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart });

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const submit = async data => {

        if (!order.addressLatLng) {
            toast.warning('Por favor selecciona tu ubicación en el mapa');
            return;
        }

        await createOrder({ ...order, name: data.name, address: data.address })
            .then(res => {
                toast.success('Orden creada con éxito!');
                navigate(`/track/${res.data.id}`);
                clearCart();
            })
            .catch(e => {
                toast.error(e.message)
            });
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(submit)}
                className={classes.container}
            >
                <div className={classes.content}>
                    <Title title='Formulario de la orden' fontSize='1.6rem' />
                    <div className={classes.inputs}>
                        <Input
                            defaultValue={user.name}
                            label='Nombre'
                            {...register('name')}
                            error={errors.name}
                        />

                        <Input
                            defaultValue={user.address}
                            label='Dirección'
                            {...register('address')}
                            error={errors.address}
                        />
                    </div>
                    <OrderItemsList order={order} />
                </div>

                <div>
                    <Title title='Elige tu ubicación' fontSize='1.6rem' />
                    <Map
                        location={order.addressLatLng}
                        onChange={latlng => {
                            setOrder({ ...order, addressLatLng: latlng });
                        }}
                    />
                </div>

                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button
                            type='submit'
                            text='Registrar Orden'
                            width='100%'
                            height='3rem'
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CheckoutPage