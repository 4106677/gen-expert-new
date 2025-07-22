import styles from './banner.module.css'
import React from "react";
import Image from "next/image"

const Banner = () => {
	return (
		<div className={styles.main_banner}>
			<div className="container">
				<Image className={styles.main_banner_image} src='/images/MainPage/gpu.webp' alt='GPU' width={703}
				       height={390}></Image>
				<div className={styles.main_banner_container}>
					<h3 className={styles.main_banner_header}>Гнучкі можливості співпраці</h3>
					<div className={styles.main_banner_items}>
						<div className={styles.main_banner_item}>
							<Image src='/images/check-verified.svg' width={25} height={25} alt='check verified'></Image>
							<h5>Повний цикл «під ключ»</h5>
						</div>
						<div className={styles.main_banner_item}>
							<Image src='/images/check-verified.svg' width={25} height={25} alt='check verified'></Image>
							<h5>Проектування та супровід</h5>
						</div>
						<div className={styles.main_banner_item}>
							<Image src='/images/check-verified.svg' width={25} height={25} alt='check verified'></Image>
							<h5>Спільне фінансування</h5>
						</div>
						<div className={styles.main_banner_item}>
							<Image src='/images/check-verified.svg' width={25} height={25} alt='check verified'></Image>
							<h5>Купівля обладнання</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
