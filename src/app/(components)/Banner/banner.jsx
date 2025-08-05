import styles from './banner.module.css'
import React from "react";
import Image from "next/image"

const Banner = ({header, direction = 'default', style}) => {
	return (
		<div className={styles.main_banner} style={{
			height: direction === 'reverse' ? '397px' : '335px', ...style
		}}>
			<div className="container">
				<Image
					style={{
						transform: direction === "reverse"  ? "scaleX(-1)" : '',
						right: direction === "reverse" ? 0 : "auto",
						left: direction === "reverse" ? "auto" : 0,
						height: direction === "reverse" ? '302px' : "390px",
						top: direction === "reverse" ? '62px' : 0,
					}}
					className={styles.main_banner_image}
					src='/images/mainPage/gpu.webp' alt='GPU'
					width={703}
					height={390}>
				</Image>
				<div
					className={styles.main_banner_container}
					style={{
						marginLeft: direction === "reverse" ? 0 : "auto",
					}}>
					<h3 className={styles.main_banner_header}>{header || 'Гнучкі можливості співпраці'}</h3>
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
