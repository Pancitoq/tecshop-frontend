import { useForm } from 'react-hook-form';
import classes from './registerPage.module.css';
import Title from '../../components/Title/Title.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useEffect } from 'react';
import { EMAIL } from '../../constants/patterns.js';

function RegisterPage() {

    const [params] = useSearchParams(); // obtiene todas las query
    const returnUrl = params.get('returnUrl'); // obtiene la query 'returnUrl'

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors }
    } = useForm();

    const { register: registerUser, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/home');
    }, [user])


    const submit = async data => {
        await registerUser(data);
    };

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title='Regístrate' />

                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type='text'
                        label='Nombre'
                        {...register('name', {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.name}
                    />

                    <Input
                        type='email'
                        label='Correo'
                        {...register('email', {
                            required: true,
                            pattern: EMAIL
                        })}
                        error={errors.email}
                    />

                    <Input
                        type='password'
                        label='Contraseña'
                        {...register('password', {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.password}
                    />

                    <Input
                        type='password'
                        label='Confirmar contraseña'
                        {...register('confirmPassword', {
                            required: true,
                            validate: value =>
                                value !== getValues('password')
                                    ? 'Contraseñas no coinciden'
                                    : true
                        })}
                        error={errors.confirmPassword}
                    />

                    <Input
                        type='text'
                        label='Dirección'
                        {...register('address', {
                            required: true,
                            minLength: 10
                        })}
                        error={errors.address}
                    />

                    <Button
                        type='submit'
                        text='Registrarme'
                    />

                    <div className={classes.login}>
                        Ya tienes cuenta? &nbsp;
                        <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                            Inicia sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;