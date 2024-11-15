import { Link } from 'react-router-dom';
import classes from './header.module.css';
import { useCart } from '../../hooks/useCart.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

function Header() {
	const { cart } = useCart();
	const { user, logout } = useAuth();

	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<Link to="/" className={classes.logo}>
					TecShop
				</Link>
				<nav>
					<ul>
						{user ? (
							<li className={classes.menu_container}>
								<Link to="/dashboard">{user.name}</Link>
								<div className={classes.menu}>
									<Link to="/profile">Perfil</Link>
									<Link to="/orders">Órdenes</Link>
									<a onClick={logout}>Salir</a>
								</div>
							</li>
						) : (
							<Link to="/login">Iniciar</Link>
						)}

						<li>
							<Link to="/cart">
								Carrito
								{cart.totalCount > 0 && (
									<span className={classes.cart_count}>{cart.totalCount}</span>
								)}
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
