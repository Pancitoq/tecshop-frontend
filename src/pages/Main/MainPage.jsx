import { Link } from 'react-router-dom';
import classes from './mainPage.module.css';
import styles from './Carousel.module.css';
import Footer from '../../components/Footer/Footer';

const clients = [
	{
		id: 1,
		name: 'Cliente 1',
		logo: 'https://content.wepik.com/statics/30190099/preview-page0.jpg',
	},
	{
		id: 2,
		name: 'Cliente 2',
		logo: 'https://i.pinimg.com/236x/5f/42/a8/5f42a81e3aff2333a0e5bd26e9e2547a.jpg',
	},
	{
		id: 3,
		name: 'Cliente 3',
		logo: 'https://img.freepik.com/vector-premium/plantilla-diseno-logotipo-empresa-construccion_23-2150022585.jpg',
	},
	{
		id: 4,
		name: 'Cliente 4',
		logo: 'https://i.pinimg.com/236x/5f/42/a8/5f42a81e3aff2333a0e5bd26e9e2547a.jpg',
	},
	{
		id: 5,
		name: 'Cliente 5',
		logo: 'https://content.wepik.com/statics/30190099/preview-page0.jpg',
	},
	{
		id: 6,
		name: 'Cliente 6',
		logo: 'https://img.freepik.com/vector-premium/plantilla-diseno-logotipo-empresa-construccion_23-2150022585.jpg',
	},
	{
		id: 7,
		name: 'Cliente 6',
		logo: 'https://content.wepik.com/statics/30190099/preview-page0.jpg',
	},
	{
		id: 8,
		name: 'Cliente 6',
		logo: 'https://img.freepik.com/vector-premium/plantilla-diseno-logotipo-empresa-construccion_23-2150022585.jpg',
	},
];
function MainPage() {
	const duplicatedItems = [...clients, ...clients];
	return (
		<div className={classes.container01}>
			<div className={classes.container}>
				<div className={classes.content}>
					<h3 className={classes.title}>TECSHOP</h3>
					<p className={classes.description}>
						Energía confiable para impulsar tu industria.
					</p>
					<Link to="/home" className={classes.btn_view_products}>
						Ver Productos
					</Link>
				</div>
			</div>
			<section className={classes.about}>
				<h4 className={classes.about_title}>NOSOTROS</h4>
				<div className={classes.about_content}>
					<div>
						<h6 className={classes.about_subtitle}>Quiénes somos</h6>
						<p>
							TecShop es una empresa dedicada a la gestión energética, que
							brinda soluciones en energía a pequeños, medianos y grandes
							consumidores de energía eléctrica, con el único objetivo de dar
							continuidad en el suministro de electricidad y generar ahorro en
							las facturaciones de electricidad a las empresas y/o Usuarios
							Libres.
						</p>
					</div>
					<div>
						<h6 className={classes.about_subtitle}>Qué nos diferencia</h6>
						<p>
							Nuestro equipo cuenta con personal especializado en baja, media y
							alta tensión, así como en temas comerciales en generación y
							consumo de energía (Usuarios Libres). Muchos de nuestros
							colaboradores han laborado en importantes empresas del sector como
							es el COES, OSINERGMIN, empresas privadas de generación de energía
							e industrias privadas.
						</p>
					</div>
				</div>
			</section>

			<section className={classes.products}>
				<h4 className={classes.products_title}>Servicios</h4>
				<h6 className={classes.products_subtitle}>Nuestros Servicios</h6>
				<ul className={classes.product_list}>
					<li className={classes.product_card}>
						<div className={classes.icon}>
							<img src="/icons/SolidLightning.svg" alt="ícono de rayo" />
						</div>
						<span className={classes.product_card_title}>
							Celdas de Media Tensión VOLTSEC 24kV
						</span>
						<p className={classes.product_card_description}>
							Nuestras celdas son la elección ideal para proteger y gestionar la
							distribución eléctrica en diversos entornos industriales y
							comerciales.
						</p>
					</li>
					<li className={classes.product_card}>
						<div className={classes.icon}>
							<img src="/icons/PlugCirclePlus.svg" alt="ícono de enchufe" />
						</div>
						<span className={classes.product_card_title}>
							Banco de Condensadores
						</span>
						<p className={classes.product_card_description}>
							Diseño, fabricación y suministro de banco de condensadores, que
							reduce el pago de energía reactiva en la facturación de
							electricidad.
						</p>
					</li>
					<li className={classes.product_card}>
						<div className={classes.icon}>
							<img src="/icons/MdiShield.svg" alt="ícono de escudo" />
						</div>
						<span className={classes.product_card_title}>
							Relés de Protección
						</span>
						<p className={classes.product_card_description}>
							Suministramos equipos marca ABB que aseguran la protección y
							eficiencia de su sistema eléctrico, como: REF601, REF611, REF615,
							REX 615, etc.
						</p>
					</li>
					<li className={classes.product_card}>
						<div className={classes.icon}>
							<img src="/icons/BxBroadcast.svg" alt="ícono broadcast" />
						</div>
						<span className={classes.product_card_title}>
							Suministro de Transformadores de Potencia
						</span>
						<p className={classes.product_card_description}>
							Transformadores trifásicos desde 100kVA hasta 2500kVA, con niveles
							de tensión de hasta 30kV. Nuestros transformadores se suministran
							con pruebas in situ.
						</p>
					</li>
					{/* <li className={classes.product_card}>
						<div className={classes.icon}>
							<img src="/icons/MdiTable.svg" alt="ícono de tabla" />
						</div>
						<span className={classes.product_card_title}>
							Suministro de Tableros Eléctricos
						</span>
						<p className={classes.product_card_description}>
							Ofrecemos una gama completa de tableros autosoportados y adosados,
							con protección IP65 para garantizar la seguridad, eficiencia y
							confiabilidad de sus instalaciones.
						</p>
					</li> */}
				</ul>
			</section>
			<div className={styles.carousel}>
				<h1 className={styles.products_subtitle}>Nuestros Clientes</h1>
				<div className={styles.carouselTrack}>
					{duplicatedItems.map((client, index) => (
						<div
							key={index}
							id={`carousel-item-${client.id}-${index}`}
							className={styles.carouselItem}
						>
							<img src={client.logo} alt={client.name} />
							{/* <p>{client.name}</p> */}
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default MainPage;
