import { useEffect, useState } from 'react';
import classes from './usersPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { getAll, deleteUserById } from '../../services/userService.js';
import Title from '../../components/Title/Title.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import Search from '../../components/Search/Search.jsx';
import { toast } from 'react-toastify';
import NotFound from '../../components/NotFound/NotFound.jsx';

function UsersPage() {

    const [users, setUsers] = useState();
    const { searchTerm } = useParams();
    const auth = useAuth();

    useEffect(() => {
        loadUsers();
    }, [searchTerm]);


    const loadUsers = async () => {
        const users = await getAll(searchTerm);
        setUsers(users);
    };

    // const handleToggleBlock = async (userId) => {
    //     const isBlocked = await toggleBlock(userId);

    //     setUsers(oldUsers => oldUsers.map(user => user.id === userId ? { ...user, isBlocked } : user));
    // }

    const deleteUser = async user => {
        const confirmed = window.confirm(`Eliminar el usuario ${user.name}?`);
        if (!confirmed) return;

        await deleteUserById(user.id)
            .then(() => {
                setUsers(oldUsers => oldUsers.filter(ou => ou.id !== user.id));
                toast.success('Usuario eliminado');
            })
            .catch(e => console.log(e))
    }

    const UsersNotFound = () => {
        if (users && users.length > 0) return;

        return searchTerm
            ? <NotFound linkRoute='/admin/users' linkText='Ver todos' />
            : <NotFound linkRoute='/dashboard' linkText='Ir a Dashboard' />
    }

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                <Title title='Administrar Usuarios' />

                <Search
                    // ejemplo -> searchRoute='/admin/users/jan'
                    searchRoute='/admin/users/'
                    defaultRoute='/admin/users'
                    margin='1rem 0'
                    placeholder='Buscar usuarios...'
                />

                <UsersNotFound />

                {
                    users?.length > 0 && (
                        <div className={classes.list_item}>
                            <h3>Nombre</h3>
                            <h3>Correo</h3>
                            <h3>Dirección</h3>
                            <h3>Admin</h3>
                            <h3>Acciones</h3>
                        </div>
                    )
                }


                {
                    users && (
                        users.map(user => (
                            <div key={user.id} className={classes.list_item}>
                                <span>{user.name}</span>
                                <span>{user.email}</span>
                                <span>{user.address}</span>
                                <span>{user.isAdmin ? '✅' : '❌'}</span>
                                <span className={classes.actions}>
                                    <Link className={classes.btn_editar} to={'/admin/editUser/' + user.id}>Editar</Link>
                                    {
                                        auth.user.id !== user.id && (
                                            // <Link onClick={() => handleToggleBlock(user.id)}>
                                            //     {user.isBlocked ? 'Unblock' : 'Block'}
                                            // </Link>
                                            <button className={classes.btn_delete} onClick={() => deleteUser(user)}>
                                                Eliminar
                                            </button>
                                        )
                                    }
                                </span>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default UsersPage