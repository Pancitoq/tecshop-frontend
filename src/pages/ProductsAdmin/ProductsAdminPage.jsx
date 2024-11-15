import { useEffect, useState } from 'react';
import classes from './productsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/productService.js';
import NotFound from '../../components/NotFound/NotFound.jsx';
import Title from '../../components/Title/Title.jsx';
import Search from '../../components/Search/Search.jsx';
import Price from '../../components/Price/Price.jsx';
import { toast } from 'react-toastify';

function ProductsAdminPage() {

    const [products, setProducts] = useState();
    const { searchTerm } = useParams();

    useEffect(() => {
        loadProducts();
    }, [searchTerm]);


    const loadProducts = async () => {
        const productsResponse = searchTerm ? await search(searchTerm) : await getAll();
        setProducts(productsResponse);
    };

    const ProductsNotFound = () => {
        if (products && products.length > 0) return;

        return searchTerm
            ? <NotFound linkRoute='/admin/products' linkText='Ver Todos' />
            : <NotFound linkRoute='/dashboard' linkText='Ir a Dashboard' />
    };

    const deleteProduct = async product => {
        const confirmed = window.confirm(`Eliminar el producto ${product.name}?`);
        if (!confirmed) return;

        await deleteById(product.id);
        toast.success(`"${product.name}" fue eliminado`);
        setProducts(products.filter(f => f.id !== product.id));
    };

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                <Title title='Administrar Productos' margin='1rem auto' />

                <Search
                    // ejemplo -> searchRoute='/admin/products/pizza'
                    searchRoute='/admin/products/'
                    defaultRoute='/admin/products'
                    placeholder='Buscar productos...'
                    margin='1rem 0'
                />

                <Link to='/admin/addProduct' className={classes.add_food}>
                    Agregar +
                </Link>

                <ProductsNotFound />

                {
                    products && (
                        products.map(product => (
                            <div key={product.id} className={classes.list_item}>
                                <img src={product.imageUrl} alt={product.name} />
                                <Link to={'/product/' + product.id}>{product.name}</Link>
                                <Price price={product.price} />
                                <div className={classes.actions}>
                                    <Link to={'/admin/editProduct/' + product.id}>Editar</Link>
                                    <Link onClick={() => deleteProduct(product)}>Eliminar</Link>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default ProductsAdminPage