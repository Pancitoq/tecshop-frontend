import { useParams } from 'react-router-dom';
import classes from './userEditPage.module.css';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getById, updateUser } from '../../services/userService.js';
import Title from '../../components/Title/Title.jsx';
import Input from '../../components/Input/Input.jsx';
import { EMAIL } from '../../constants/patterns.js';
import Button from '../../components/Button/Button.jsx';
import { toast } from 'react-toastify';

function UserEditPage() {

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
    const { userId } = useParams();
    const isEditMode = userId;

    useEffect(() => {
        // cargar usuario
        if (isEditMode) loadUser();
    }, [userId]);

    const loadUser = async () => {
        const user = await getById(userId);
        reset(user);
    };

    const submit = (userData) => {
        // actualizar usuario
        updateUser(userData)
            .then(() => toast.success('Usuario actualizado con éxito'))
            .catch(e => toast.error(e.message))
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Editar Usuario' : 'Crear Usuario'} />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        label='Nombre'
                        {...register('name', {
                            required: true,
                            minLength: 3
                        })}
                        error={errors.name}
                    />
                    <Input
                        label='Correo'
                        {...register('email', {
                            required: true,
                            pattern: EMAIL
                        })}
                        error={errors.email}
                    />
                    <Input
                        label='Dirección'
                        {...register('address', {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.address}
                    />
                    <Input
                        label='Es Admin'
                        type='checkbox'
                        {...register('isAdmin')}
                        error={errors.isAdmin}
                    />

                    <Button type='submit' text={isEditMode ? 'Editar' : 'Crear'} />
                </form>
            </div>
        </div>
    )
}

export default UserEditPage