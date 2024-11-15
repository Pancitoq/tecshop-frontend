import { useForm } from 'react-hook-form';
import classes from './profilePage.module.css';
import { useAuth } from '../../hooks/useAuth.jsx';
import Title from '../../components/Title/Title.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import ChangePassword from '../../components/ChangePassword/ChangePassword.jsx';

function ProfilePage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { user, updateProfile } = useAuth();
    const submit = user => {
        updateProfile(user);
    }

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title='Actualizar Perfil' />
                <form onSubmit={handleSubmit(submit)}>
                    <Input
                        defaultValue={user.name}
                        type='text'
                        label='Nombre'
                        {...register('name', {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.name}
                    />

                    <Input
                        defaultValue={user.address}
                        type='text'
                        label='Dirección'
                        {...register('address', {
                            required: true,
                            minLength: 10
                        })}
                        error={errors.address}
                    />

                    <Button type='submit' text='Actualizar' backgroundColor='#009e84' />
                </form>
                <ChangePassword />
            </div>
        </div>
    )
}

export default ProfilePage