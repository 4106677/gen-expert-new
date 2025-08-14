'use client'
import React, {useEffect, useState} from "react";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import styles from './blog.module.css'
import Image from "next/image"
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import {useTranslation} from "react-i18next";
import CustomLink from "@/app/(components)/CustomLink/customLink";

const Blog = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation('common');
	const tips = t("blog.tips", { returnObjects: true }) || [];
	const bannerTips = t("blog.banner.tips", { returnObjects: true }) || [];

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
			<GreenBox text={t("blog.title")}/>
			<div className={`${styles.blog} container`}>
				<h2 className={styles.head}>{t("blog.pageTitle")}</h2>
				<ul className={styles.tips}>
					{Array.isArray(tips) &&
						tips.map((tip, index) => (
							<li className={styles.tips_item} key={index}>
								{tip.title}
								<span className={styles.tips_item__span}>{tip.subtitle}</span>
							</li>
						))
					}
				</ul>
				<div className={styles.slogan}>
					<h3 className={styles.slogan_head}>{t("blog.banner.title")}</h3>
					<ul className={styles.slogan_items}>
						{Array.isArray(bannerTips) &&
							bannerTips.map((tip, index) => (
								<li className={styles.slogan_item} key={index}>
									<Image src="/images/check-verified.svg" width={25} height={25}
									       alt="check verified"></Image>
									{tip}
								</li>
							))
						}

					</ul>
				</div>
				<h3 className={styles.slug}>{t("blog.pageSlug")}</h3>
			</div>
			<div className={styles.grid}>
				{Object.values(t("blog.data", { returnObjects: true }) || {})
					.filter(item => item && typeof item === 'object')
					.map(({ id, image, title, subtitle, href }, index) => (
						<div key={id || index} className={styles.grid__item}>
							<Image className={styles.grid__image} src={image} alt={title} width={570} height={341} />
							<h4 className={styles.grid__header}>{title}</h4>
							<span className={styles.grid__description}>{subtitle}</span>
							<CustomLink href={href} height={40} text={t("blog.details")} classname={styles.grid__button} />
						</div>
					))}
			</div>
			<Consultation/>
		</>
	);
};

export default Blog;
