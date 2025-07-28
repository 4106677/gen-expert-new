import React from "react";
import styles from "./blog.module.css";
import CustomLink from "@/app/(components)/CustomLink/customLink";
import {useTranslation} from "react-i18next";
import Image from "next/image";

const Blog = () => {
	const { t } = useTranslation('common');

	return (
		<div className={styles.blog}>
			<div className={`${styles.blog_container} container`}>
				<div className={styles.blog_heading}>
					<h2 className={styles.blog_header}>{t("blog.title")}</h2>
					<CustomLink href='/blog' height={48} text={t("blog.button")}/>
				</div>
				<div className={styles.blog_list}>
					{Object.values(t("blog.data", { returnObjects: true }) || {})
						.filter(item => item && typeof item === 'object')
						.map(({ id, image, title, subtitle, href }, index) => (
							<div key={id || index} className={styles.blog_list__item}>
								<Image className={styles.list__itemImage} src={image} alt={title} width={277} height={233} />
								<h4 className={styles.list__itemHeader}>{title}</h4>
								<span className={styles.list__itemSpan}>{subtitle}</span>
								<CustomLink href={`blog/${href}`} height={40} text={t("blog.details")} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Blog;
