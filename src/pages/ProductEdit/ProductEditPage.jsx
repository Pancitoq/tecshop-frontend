import { useNavigate, useParams } from 'react-router-dom';
import classes from './productEditPage.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/productService.js';
import Title from '../../components/Title/Title.jsx';
import InputContainer from '../../components/InputContainer/InputContainer.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { uploadImage } from '../../services/uploadService.js';
import { toast } from 'react-toastify';

function ProductEditPage() {

    const { productId } = useParams();
    // !!productId : convierte productId a su booleano equivalente
    // !!123 : true
    // !!null : false
    const isEditMode = !!productId;
    const [imageUrl, setImageUrl] = useState();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return;

        getById(productId)
            .then(product => {
                if (!product) return;
                reset(product);
                setImageUrl(product.imageUrl);
            })
    }, [productId]);

    const submit = async productData => {
        if(!imageUrl){
            toast.warning('Debe seleccionar una imagen', 'Carga de Archivos');
            return;
        }

        const product = { ...productData, imageUrl };

        if (isEditMode) {
            await update(product);
            toast.success(`Producto ${product.name} actualizado con éxito`);
            return;
        }

        // Crear producto
        const newProduct = await add(product);
        toast.success(`Producto ${newProduct.name} creado con éxito`);
        navigate('/admin/editProduct/' + newProduct.id, { replace: true });
    }

    const upload = async event => {
        setImageUrl(null);
        const imageUrlResponse = await uploadImage(event);
        setImageUrl(imageUrlResponse);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Editar Producto' : 'Agregar Producto'} />
                <form
                    onSubmit={handleSubmit(submit)}
                    noValidate
                    className={classes.form}
                >
                    <InputContainer label='Seleccionar imagen'>
                        <input type='file' onChange={upload} accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </InputContainer>

                    {
                        imageUrl && (
                            <a
                                href={imageUrl}
                                className={classes.image_link}
                                target='blank'
                            >
                                <img src={imageUrl} alt='Uploaded' />
                            </a>
                        )
                    }

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
                        type='number'
                        label='Precio'
                        {...register('price', {
                            required: true
                        })}
                        error={errors.price}
                    />

                    <Input
                        type='text'
                        label='Tags'
                        {...register('tags', {
                            required: true
                        })}
                        error={errors.tags}
                    />

                    {/* <Input
                        type='text'
                        label='Origins'
                        {...register('origins', {
                            required: true
                        })}
                        error={errors.origins}
                    /> */}

                    <Input
                        type='text'
                        label='Descripción'
                        {...register('description', {
                            required: true
                        })}
                        error={errors.description}
                    />

                    <Button
                        type='submit'
                        text={isEditMode ? 'Editar' : 'Crear'}
                    />
                </form>
            </div>
        </div>
    )
}

export default ProductEditPage