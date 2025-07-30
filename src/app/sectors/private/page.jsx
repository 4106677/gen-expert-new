"use client"
import React, {useEffect, useState} from "react";
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
	const tech_type = Object.values(t('sectors.private.tech.type', {returnObjects: true}) || {});
	const tech_body = Object.values(t('sectors.private.tech.body', {returnObjects: true}) || {});
	const cooperation_tips = Object.values(t('sectors.private.cooperation.tips', {returnObjects: true}) || {});
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}
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
					<h3 className={`${styles.hero_title} ${styles.title}`}>{t('sectors.private.hero.title')}</h3>
					<span className={`${styles.hero_subtitle} ${styles.subtitle}`}>{t('sectors.private.hero.subtitle')}</span>
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
					<h3 className={`${styles.solar_title} ${styles.title}`}>{t('sectors.private.solar.title')}</h3>
					<span className={`${styles.solar_subtitle} ${styles.subtitle}`}>{t('sectors.private.solar.subtitle')}</span>
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
				{/*конфігурації*/}
				<div className={styles.tech}>
					<h3 className={`${styles.tech_title} ${styles.title}`}>{t('sectors.private.tech.title')}</h3>
					<span
						className={`${styles.tech_subtitle} ${styles.subtitle}`}>{t('sectors.private.tech.subtitle')}</span>
					<div className={styles.tech_grid}>
						<div className={styles.tech_grid__column}>
							{tech_type?.filter(item => item && typeof item === "object")
								.map(({image, title, subtitle, tips}, index) => (
									<div className={styles.tech_grid__column_item} key={index + title}>
										<h4 className={styles.tech_grid__column_title}>{title}</h4>
										{subtitle !== "" &&
											<span className={styles.tech_grid__column_subtitle}>{subtitle}</span>
										}
										<ul className={styles.tech_grid__column_list}>
											{tips.map((i) =>
												<li key={i}>{i}</li>
											)}
										</ul>
										<Image className={styles.tech_grid__column_image} src={image} alt={title} width={240} height={230}/>
									</div>
								))}
						</div>
						<div className={styles.tech_grid__column}>
							{tech_body?.filter(item => item && typeof item === "object")
								.map(({image, title, subtitle, tips}, index) => (
									<div className={`${styles.tech_grid__column_item} ${styles.tech_grid__column_custom}`} key={index + title}>
										<h4 className={styles.tech_grid__column_title}>{title}</h4>
										{subtitle !== "" &&
											<span className={styles.tech_grid__column_subtitle}>{subtitle}</span>
										}
										<ul className={styles.tech_grid__column_list}>
											{tips.map((i) =>
												<li key={i}>{i}</li>
											)}
										</ul>
										<Image className={styles.tech_grid__column_image} src={image} alt={title} width={375} height={400}/>
									</div>
								))}
						</div>
					</div>
				</div>
				{/*види співпраці*/}
				<div className={styles.cooperation}>
					<h3 className={`${styles.title} ${styles.cooperation_title}`}>{t('sectors.private.cooperation.title')}</h3>
					<div className={styles.cooperation_container}>
						{cooperation_tips?.map(({title, subtitle, advantages, slug, tips}, index) => {
							const key = (title && slug) ? `${title}-${slug}` : `cooperation-${index}`;
							return (
								<div className={styles.cooperation_item} key={key}>
									<Image src='/images/check-verified-green.svg' width={30} height={30} alt='check verified'/>
									<h4 className={styles.cooperation_item__title}>{title}</h4>
									<h5 className={styles.cooperation_item__subtitle}>{subtitle}</h5>
									<h6 className={styles.cooperation_item__advantages}>{advantages}</h6>
									<span className={styles.cooperation_item__slug}>{slug}</span>
									<ul className={styles.cooperation_item__list}>
										{tips?.map((i) => (
											<li key={i}>{i}</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>

			</div>
			<Tips/>
			<Realisation/>
			{/*напрями реалізації*/}
			<div className={`${styles.realization} container`}>
				<h3 className={`${styles.title} ${styles.realization_title}`}>{t('sectors.private.hero.title')}</h3>
				<div className={styles.realization_container}>
					<div className={styles.realization_item}>
						<h4 className={styles.realization_item__header}>{t('sectors.private.realization.usage.title')}</h4>
						<span className={styles.realization_item__subtitle}>{t('sectors.private.realization.usage.subtitle')}</span>
						<ul className={styles.realization_item__list}>
							{Array.isArray(t('sectors.private.realization.usage.tips', { returnObjects: true })) ?
								t('sectors.private.realization.usage.tips', { returnObjects: true }).map((tip, index) => (
									<li key={index}>{tip}</li>
								)) : null
							}
						</ul>
					</div>
					<div className={styles.realization_item}>
						<h4 className={styles.realization_item__header}>{t('sectors.private.realization.sale.title')}</h4>
						<span className={styles.realization_item__subtitle}>{t('sectors.private.realization.sale.subtitle')}</span>
						<ul className={styles.realization_item__list}>
							{Array.isArray(t('sectors.private.realization.usage.tips', { returnObjects: true })) ?
								t('sectors.private.realization.sale.tips', { returnObjects: true }).map((tip, index) => (
									<li key={index}>{tip}</li>
								)) : null
							}
						</ul>
					</div>
				</div>
			</div>
			<Consultation/>
		</>
	);
};

export default PrivateSector;
