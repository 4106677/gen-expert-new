"use client"
import React from "react";
import {useTranslation} from "react-i18next";
import styles from './SectorsPage.module.scss'
import Image from "next/image";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";

const SectorsPage = () => {
	const { t } = useTranslation('common');
	const industries = Object.values(t('sectors.industries', { returnObjects: true }) || {});
	console.log(industries);

	return (
		<>
			<GreenBox
				text={t('sectors.title').split('\n').map((line, index) => (
					<React.Fragment key={index}>
						{line}
						<br />
					</React.Fragment>
				))}
			/>
			<div className={`${styles.container} container`}>
				{industries &&
					<ul className={styles.list}>
						{industries.map(({name, description, slug, image}, index) => {
							const isFullWidth = [4, 7, 10].includes(index);
							return (
									(image && image !== '') &&
										<li
											className={`${styles.list_item} ${isFullWidth ? styles.fullWidth : ''}`}
											key={index}
											style={isFullWidth ? {backgroundImage: `url(${image})`} : {}}
										>
											{!isFullWidth && (
												<Image
													src={image}
													alt={name}
													width={530}
													height={286}
													className={styles.itemImage}
												/>
											)}
											<div className={styles.list_item_wrapper} >
												<h3 className={styles.list_item_header}>{name}</h3>
												<span className={styles.list_item_description}>{description}</span>
												<CustomLink
													href={`/sectors/${slug}`} text={t('menu.details')}
													style={{width: "max-content"}}/>
											</div>
										</li>
							);
						})}
					</ul>
				}
			</div>
			<Consultation/>
		</>
	);
};

export default SectorsPage;
