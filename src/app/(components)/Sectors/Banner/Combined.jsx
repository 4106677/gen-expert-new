import React from "react";
import {useTranslation} from "react-i18next";
import styles from '../Sectors.module.scss'
import Image from "next/image";

const Combined = () => {
	const { t } = useTranslation('common');

	return (
		<div className={`${styles.banner} ${styles.hybrid}`}>
			<div className={styles.hybrid_description}>
				<h3 className={styles.banner_header}>{t("sectors.public.purpose.hybrid.title")}</h3>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.aspect")}</span>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.subtitle")}</span>
			</div>
			<Image
				src="/images/sectors/hybrid.webp"
				alt={t("sectors.public.purpose.hybrid.title")}
				width={567}
				height={320}/>
		</div>
	)
		;
};

export default Combined;
