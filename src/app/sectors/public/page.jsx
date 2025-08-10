"use client"
import React from "react";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useTranslation} from "react-i18next";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Realisation from "@/app/(components)/Realisation/Realisation";
import Tips from "@/app/(components)/Tips/tips";
import styles from './publicPage.module.scss'
import Image from "next/image";
import Hybrid from "@/app/(components)/Sectors/Banner/Hybrid";
import Gpu from "@/app/(components)/Sectors/Banner/Gpu";
import Combined from "@/app/(components)/Sectors/Banner/Combined";

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
				<Gpu/>
				<Hybrid/>
				<Combined/>
			</div>
			<Consultation/>
			<Tips/>
			<Realisation/>

		</>
	);
};

export default PublicSector;
