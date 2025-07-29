// ./src/app/cooperation/page.js
'use client';

import React, {useEffect, useState} from "react";
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from './cooperation.module.css';
import Image from "next/image";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Tips from "@/app/(components)/Tips/tips";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import Realisation from "@/app/(components)/Realisation/Realisation";

export default function Cooperation() {
	const { t } = useTranslation('common');
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
			<GreenBox text={t('cooperation.title')}/>
			<div className={`${styles.container} container`}>
				<h2 className={styles.subtitle}>{t('cooperation.subtitle')}</h2>
				<span className={styles.description}>{t('cooperation.description')}</span>
				<div className={styles.sectors}>
					<div className={styles.sector}>
						<Image className={styles.sector_image} src='/images/cooperation/public.jpg' alt={t('cooperation.public.title')} width={598} height={358}/>
						<div className={styles.sector_details}>
							<h3 className={styles.sector_header}>{t("cooperation.public.title")}</h3>
							<span className={styles.sector_span}>{t("cooperation.public.subtitle")}</span>
							<CustomLink classname={styles.sector_button} href={`/sectors/public/`} text={t("menu.details")}/>
						</div>
					</div>
					<div className={styles.sector}>
						<Image className={styles.sector_image} src="/images/cooperation/private.jpg" alt={t("cooperation.private.title")} width={598} height={358}/>
						<div className={styles.sector_details}>
							<h3 className={styles.sector_header}>{t('cooperation.private.title')}</h3>
							<span className={styles.sector_span}>{t('cooperation.private.subtitle')}</span>
							<CustomLink classname={styles.sector_button} href={`/sectors/private/`} text={t('menu.details')}/>
						</div>
					</div>
				</div>
			</div>
			<Tips/>
			<Realisation/>
			<Consultation/>
		</>
	);
}