"use client"
import React from "react";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Realisation from "@/app/(components)/Realisation/Realisation";
import Tips from "@/app/(components)/Tips/tips";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useTranslation} from "react-i18next";
import styles from './privatePage.module.scss'
import Image from "next/image";

const PrivateSector = () => {
	const { t } = useTranslation('common');
	const tips = t('sectors.private.top_tips', { returnObjects: true });
	const hero_tips = Object.values(t('sectors.private.hero.tips', {returnObjects: true}) || {});
	const solar_tips = Object.values(t('sectors.private.solar.tips', {returnObjects: true}) || {});

	return (
		<>
			<GreenBox text={t('sectors.private.title')} tips={tips}/>
			<div className={styles.page}>
				<h2 className={styles.for_header}>{t('sectors.private.subtitle')}</h2>
				{/*Для кого*/}
				<div className={styles.box}>
					{Object.values(t("sectors.private.for", {returnObjects: true}) || {})
						.filter(item => item && typeof item === "object")
						.map(({image, title, subtitle}, index) => (
							<div key={index} className={styles.box_item}>
								<Image className={styles.box_item__image} src={image} alt={title} width={131} height={110}/>
								<h3 className={styles.box_item__header}>{title}</h3>
								<span className={styles.box_item__span}>{subtitle}</span>
							</div>
						))}
				</div>
				{/*Зеленка*/}
				<div className={styles.hero}>
					<h3 className={styles.hero_title}>{t('sectors.private.hero.title')}</h3>
					<span className={styles.hero_subtitle}>{t('sectors.private.hero.subtitle')}</span>
					<div className={styles.hero_tips}>
						{hero_tips?.filter(item => item && typeof item === "object")
							.map(({image, title, subtitle}, index) => (
								<div key={index} className={styles.hero_tips__item}>
									<div className={styles.hero_tips__item_header}>
										<Image src='/images/check-verified.svg' width={30} height={30} alt='check verified'/>
										<h3 className={styles.hero_tips__title}>{title}</h3>
									</div>
									<span className={styles.hero_tips__subtitle}>{subtitle}</span>
								</div>
							))}
					</div>
					<Image className={styles.hero_image} src='/images/sectors/private/hero.webp' alt='Hero GPU' width={1240} height={404} />
				</div>
				{/*Solar*/}
				<div className={styles.solar}>
					<h3 className={styles.solar_title}>{t('sectors.private.solar.title')}</h3>
					<span className={styles.solar_subtitle}>{t('sectors.private.solar.subtitle')}</span>
					<div className={styles.solar_tips}>
						{solar_tips?.filter(item => item && typeof item === "object")
							.map(({image, title, subtitle}, index) => (
								<div key={index} className={styles.solar_tips__item}>
									<div className={styles.solar_tips__item_header}>
										<Image src='/images/check-verified-green.svg' width={30} height={30}
										       alt='check verified'/>
										<h3 className={styles.solar_tips__title}>{title}</h3>
									</div>
									<span className={styles.solar_tips__subtitle}>{subtitle}</span>
								</div>
							))}
					</div>
					<Image className={styles.solar_image}
					       src='/images/sectors/solar.webp' alt='Hero GPU'
					       width={1235} height={459}/>
				</div>
			</div>
			<Tips/>
			<Realisation/>
			<Consultation/>
		</>
	);
};

export default PrivateSector;
