'use client';
import React, {useEffect, useState} from "react";
import styles from './BlogPage.module.css'
import {useLanguage} from "@/app/context";
import {useTranslation} from "react-i18next";
import {useParams} from "next/navigation";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useSheetData} from "@/context/SheetDataContext";
import Image from "next/image";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import BackButton from "@/app/(components)/BackButton/BackButton";
import {getAllBlogIds} from "@/utils/getBlogIds";

export async function generateStaticParams() {
	const blogIds = getAllBlogIds();

	return blogIds.map((id) => ({
		id: id,
	}));
}

const BlogPage = () => {
	const { id } = useParams();
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { loading } = useSheetData()

	const [item, setItem] = useState(null)
	const [itemLoading, setItemLoading] = useState(true);

	useEffect(() => {
		const loadItem = async () => {
			setItemLoading(true);
			const blogData = t('blog.data', { returnObjects: true });
			if (!Array.isArray(blogData) || blogData.length === 0) {
				setItemLoading(false);
				return;
			}
			const foundItem = blogData.find(item => item.href === id);

			if (!foundItem) {
				setItem(null);
				setItemLoading(false);
				return;
			}

			setItem(foundItem);
			setItemLoading(false);
		};

		if (lang) {
			loadItem();
		}
	}, [lang, id, t]);

	if (loading || itemLoading) {
		return (
			<div >
				<div >
					<h2>Loading...</h2>
				</div>
			</div>
		);
	}

	return (
		<div>
			<GreenBox text={item?.title}/>
			<div className={`${styles.container} container`}>
				{/*<button type="button" className={styles.back}*/}
				{/*        onClick={() => router.back()}>*/}
				{/*	<Image*/}
				{/*		src="/images/arrow-up-right.svg"*/}
				{/*		alt="arrow-up-right"*/}
				{/*		width={20}*/}
				{/*		height={20}*/}
				{/*		className={styles.back_image}*/}
				{/*	/>*/}
				{/*	Назад*/}
				{/*</button>*/}
				<BackButton/>
				<div className={styles.main}>
					<Image className={styles.main_image} src={item.image} alt={item.title} width={525} height={618}/>
					<div className={styles.details}>
						<h2 className={styles.details_header}>{item.detailsHeader}</h2>
						{item.details.split('\n').map((line, index) => (
							<p className={styles.details_p} key={index}>{line}</p>
						))}
					</div>
				</div>
				<h3 className={styles.details_header}>{item.descriptionHeader}</h3>
				{item.description.split('\n').map((line, index) => (
					<p className={styles.details_p} key={index}>{line}</p>
				))}
			</div>
				<div className={`${styles.news} container`}>
					<h2 className={styles.news_header}>{t("blog.pageSlug")}</h2>
					<div className={styles.news_list}>
						{Object.values(t("blog.data", {returnObjects: true}) || {})
							.filter(item => item && typeof item === 'object')
							.map(({id, image, title, subtitle, href}, index) => (
								<React.Fragment key={index + id}>
									{href !== item.href &&
										<div key={id || index} className={styles.news_item}>
											<Image className={styles.news_image}
											       src={image}
											       alt={title}
											       width={385}
											       height={233}/>
											<h4 className={styles.news_item__header}>{title}</h4>
											<span className={styles.news_item__span}>{subtitle}</span>
											<CustomLink href={`/blog/${href}`} height={40} text={t("blog.details")} style={{
												marginTop: "auto",
												border: '1px solid #50AE55',
												width: 'max-content',
											}}/>
										</div>
									}
								</React.Fragment>
							))}
					</div>
				</div>
			<Consultation/>
		</div>
	);
};

export default BlogPage;
