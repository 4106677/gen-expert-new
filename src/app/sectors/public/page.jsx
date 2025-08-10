"use client"
import React from "react";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useTranslation} from "react-i18next";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Realisation from "@/app/(components)/Realisation/Realisation";
import Tips from "@/app/(components)/Tips/tips";
import styles from './publicPage.module.scss'
import Image from "next/image";

const PublicSector = () => {
	const { t } = useTranslation('common');

	return (
		<>
			<GreenBox text={t('sectors.public.title')}/>
			<div className={`${styles.page} container`}>
				{/*Для кого*/}
				<h2 className={styles.for_header}>{t("sectors.public.subtitle")}</h2>
				{Object.values(t("sectors.public.for", {returnObjects: true}) || {})
					.filter(item => item && typeof item === "object")
					.map(({image, title, subtitle}, index) => (
						<div key={index} className={styles.for_item}>
							<Image className={styles.item_image} src={image} alt={title} width={131} height={110}/>
							<h3 className={styles.item_header}>{title}</h3>
							<span className={styles.item_span}>{subtitle}</span>
						</div>
					))}
				{/*варіанти співпраці:*/}
				<h2 className={styles.main_title}>{t("sectors.public.for_cooperation.title")}</h2>
				<span className={styles.main_subtitle}>{t("sectors.public.for_cooperation.subtitle")}</span>
				<div className={styles.for_cooperation_list}>
					{Object.values(t("sectors.public.for_cooperation.list", {returnObjects: true}) || {})
						.filter(item => item && typeof item === "object")
						.map(({image, title, subtitle}, index) => (
							<div key={index} className={styles.for_item}>
								<Image className={styles.item_image} src={image} alt={title} width={131} height={110}/>
								<h3 className={styles.item_header}>{title}</h3>
								<span className={styles.item_span}>{subtitle}</span>
							</div>
						))}
				</div>
				{/*Що пропонуємо*/}
				<h2 className={styles.main_title}>{t("sectors.public.purpose.title")}</h2>
				<span className={styles.main_subtitle}>{t("sectors.public.purpose.subtitle")}</span>
				<div className={`${styles.banner} ${styles.gpu}`}>
					<div className={styles.gpu_description}>
						<h3 className={styles.banner_header}>{t("sectors.public.purpose.gpu.title")}</h3>
						<span className={styles.banner_subtitle} style={{color: '#C7F6CA'}}>{t("sectors.public.purpose.gpu.aspect")}</span>
						<span className={styles.banner_subtitle}>{t("sectors.public.purpose.gpu.subtitle")}</span>
						<span className={styles.banner_subtitle} style={{color: '#C7F6CA'}}>{t("sectors.public.purpose.gpu.post")}</span>
					</div>
					<Image
						src="/images/sectors/gpu.webp"
						alt={t("sectors.public.purpose.gpu.title")}
						width={630}
						height={247}/>

				</div>
				<div className={`${styles.banner} ${styles.solar}`}>

					<Image
						src="/images/sectors/solar.webp"
						alt={t("sectors.public.purpose.solar.title")}
						style={{transform: 'scaleX(-1)'}}
						width={563}
						height={238}/>
					<div className={styles.solar_description}>
						<h3 className={styles.banner_header}>{t("sectors.public.purpose.solar.title")}</h3>
						<span className={styles.banner_subtitle}>{t("sectors.public.purpose.solar.subtitle")}</span>
					</div>

				</div>
				<div className={`${styles.banner} ${styles.hybrid}`}>
					<div className={styles.hybrid_description}>
						<h3 className={styles.banner_header}>{t("sectors.public.purpose.hybrid.title")}</h3>
						<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.aspect")}</span>
						<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.subtitle")}</span>
					</div>
					<Image
						src="/images/sectors/hybrid.webp"
						alt={t("sectors.public.purpose.hybrid.title")}
						width={567}
						height={320}/>
				</div>
			</div>
			<Consultation/>
			<Tips/>
			<Realisation/>

		</>
	);
};

export default PublicSector;
