'use client';
import styles from './banner.module.css'
import React, {useEffect, useState} from "react";
import Image from "next/image"
import {useTranslation} from "react-i18next";

const Banner = ({header, direction = 'default', style, className}) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { t } = useTranslation("common");
	const tips = t("main_page.banner.tips", { returnObjects: true }) || [];

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}
	return (
		<div className={`${styles.main_banner} ${className}`} style={{
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
					height={390}
				>
				</Image>
				<div
					className={styles.main_banner_container}
					style={{
						marginLeft: direction === "reverse" ? 0 : "auto",
					}}>
					<h3 className={styles.main_banner_header}>{header || 'Гнучкі можливості співпраці'}</h3>
					<div className={styles.main_banner_items}>
						{Array.isArray(tips) && tips?.map((tip, index) => (
							<div className={styles.main_banner_item} key={index}>
								<Image
									src="/images/check-verified.svg"
									width={25}
									height={25}
									alt="check verified"
								/>
								<h5 className={styles.main_banner_item__tip}>{tip}</h5>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
