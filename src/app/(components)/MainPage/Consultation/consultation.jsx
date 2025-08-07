'use client';
import React, {useEffect, useState} from "react";
import styles from './consultation.module.css'
import Image from "next/image"
import {useTranslation} from "react-i18next";

const Consultation = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const units = Object.values(t('main_page.team.units', { returnObjects: true }) || {});

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
		<div className={`${styles.consultation} container`}>
			<h3 className={styles.consultation_header}>{t('main_page.consultation.title')}</h3>
			<span className={styles.consultation_description}>{t('main_page.consultation.subtitle')}</span>
			<div className={styles.consultation_block}>
				<div className={styles.consultation_contacts}>
					<Image className={styles.consultation_photo} src='/images/mainPage/manager.jpg' width={51}
					       height={51} alt='Manager'></Image>
					<div className={styles.consultation_links}>
						<a href="tel:+380732370045">+38(073)237-00-45</a>
						<a href="mailto:info@genexpert.com.ua">info@genexpert.com.ua</a>
					</div>
				</div>
				<div className={styles.consultation_form}>
					<h6 className={styles.consultation_form__header}>{t('main_page.consultation.form_header')}</h6>
					<div className={styles.consultation_form__row}>
						<input type='number' placeholder={t('main_page.consultation.placeholder')}
						       className={styles.consultation_form__input}/>
						<button type='button' className={`${styles.consultation_form__button} btn btn_green`}>{t('main_page.consultation.button')}</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Consultation;
