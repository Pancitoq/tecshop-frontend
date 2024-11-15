import { useForm } from 'react-hook-form'
import Title from '../Title/Title';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

function ChangePassword() {

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors }
    } = useForm();

    const { changePassword } = useAuth();

    const submit = passwords => {
        changePassword(passwords)
    };

    return (
        <div>
            <Title title='Cambiar Contraseña' />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    type='password'
                    label='Contraseña actual'
                    {...register('currentPassword', {
                        required: true
                    })}
                    error={errors.currentPassword}
                />

                <Input
                    type='password'
                    label='Nueva contraseña'
                    {...register('newPassword', {
                        required: true,
                        minLength: 5
                    })}
                    error={errors.newPassword}
                />

                <Input
                    type='password'
                    label='Confirmar contraseña'
                    {...register('confirmNewPassword', {
                        required: true,
                        validate: value =>
                            value !== getValues('newPassword')
                                ? 'Contraseñas no coinciden'
                                : true
                    })}
                    error={errors.confirmNewPassword}
                />

                <Button type='submit' text='Cambiar' />
            </form>
        </div>
    )
}

export default ChangePassword