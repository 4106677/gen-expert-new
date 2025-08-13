"use client"
import React from "react";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import styles from './Realisation.module.css'
import Link from "next/link";

const Realisation = () => {
	const { t } = useTranslation('common');

	return (
		<div className={`${styles.container} container`}>
			<div className={styles.heading}>
				<h2 className={styles.header}>{t("cooperation.topList.header")}</h2>
				<CustomLink classname={styles.heading_button} href={`/sectors/`} height={40} text={t("cooperation.topList.buttonAll")} style={{border: '1px solid #50AE55'}}/>
			</div>
			{Object.values(t("cooperation.topList.data", { returnObjects: true }) || {})
				.filter(item => item && typeof item === 'object')
				.map(({ title, href }, index) => (
					<Link href={href} key={index + href} className={styles.item}>
						<h3 className={styles.item_header}>{title}</h3>
						<div  className={styles.item_link}>
							<Image
								className={styles.item_image}
								src='/images/arrow-up-right.svg'
								alt='arrow-up-right'
								width={13}
								height={13}
							/>
						</div>
					</Link>
				))}
		</div>
	);
};

export default Realisation;
