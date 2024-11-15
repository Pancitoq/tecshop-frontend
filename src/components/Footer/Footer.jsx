import styles from './footer.module.css'; // Si usas CSS Modules, importa tu archivo CSS aquí

export const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#222' }}>
			<div className={styles.footer}>
				<div className={styles.footerContainer}>
					{/* Logo y descripción */}
					<div className={styles.footerLogo}>
						{/* <img
						src="/logo.png"
						alt="Logo Ecommerce"
						className={styles.footerLogoImg}
					/> */}
						<h1>TecShop</h1>
						<p className={styles.footerDescription}>
							Tu tienda online de confianza para productos de calidad.
						</p>
					</div>

					{/* Enlaces importantes */}
					<div className={styles.footerLinks}>
						<h3 className={styles.footerTitle}>Enlaces rápidos</h3>
						<ul className={styles.footerList}>
							<li>
								<a href="#" className={styles.footerLink}>
									{`>`} Tienda
								</a>
							</li>
							<li>
								<a href="#" className={styles.footerLink}>
									{`>`} Nosotros
								</a>
							</li>
							<li>
								<a href="#" className={styles.footerLink}>
									{`>`} Contacto
								</a>
							</li>
							<li>
								<a href="#" className={styles.footerLink}>
									{`>`} Preguntas Frecuentes
								</a>
							</li>
							<li>
								<a href="#" className={styles.footerLink}>
									{`>`} Términos y Condiciones
								</a>
							</li>
						</ul>
					</div>

					{/* Redes Sociales */}
					<div className={styles.footerSocials}>
						<h3 className={styles.footerTitle}>Síguenos</h3>
						<ul className={styles.footerSocialList}>
							<li>
								<a
									href="https://facebook.com"
									className={styles.footerSocialLink}
								>
									{`>`} Facebook
								</a>
							</li>
							<li>
								<a
									href="https://instagram.com"
									className={styles.footerSocialLink}
								>
									{`>`} Instagram
								</a>
							</li>
							<li>
								<a
									href="https://twitter.com"
									className={styles.footerSocialLink}
								>
									{`>`} Twitter
								</a>
							</li>
						</ul>
					</div>

					{/* Información de contacto */}
					<div className={styles.footerContact}>
						<h3 className={styles.footerTitle}>Contáctanos</h3>
						<p className={styles.footerEmail}>Email: contacto@ecommerce.com</p>
						<p className={styles.footerPhone}>Teléfono: +1 234 567 890</p>
					</div>
				</div>

				{/* Copyright */}
				<div className={styles.footerBottom}>
					<p>&copy; 2024 Ecommerce. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
