import React from "react";
import styles from "./stripe.module.css";

const brandLogos = [
	'weichai.png',
	'mwm.png',
	'guascor.png',
	'jenbacher.png',
	'man.png',
	'mtu.png',
	'bergen.png',
	'cat.png',
	'mitsubishi.png',
	'wartsila.png',
	'perkins.png',
	'supermaly.png',
];

const Stripe = ({style, className}) => {
	return (
		<div className={`${styles.brands} ${className}`} style={style}>
			<div className={styles.brands_track}>
				{/* Первый набор логотипов */}
				{brandLogos.map((logo, index) => (
					<img
						key={`first-${index}`}
						src={`/images/brands/${logo}`}
						alt={`Brand ${index + 1}`}
						className={styles.brand_logo}
					/>
				))}
				{/* Дублируем логотипы для бесшовной анимации */}
				{brandLogos.map((logo, index) => (
					<img
						key={`second-${index}`}
						src={`/images/brands/${logo}`}
						alt={`Brand ${index + 1}`}
						className={styles.brand_logo}
					/>
				))}
			</div>
		</div>
	);
};

export default Stripe;
