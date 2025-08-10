import React from "react";
import Image from "next/image";
import styles from '../Sectors.module.scss'
import {useTranslation} from "react-i18next";

const Gpu = () => {
	const { t } = useTranslation('common');

	return (
		<div className={`${styles.banner} ${styles.gpu}`}>
			<div className={styles.gpu_description}>
				<h3 className={styles.banner_header}>{t("sectors.public.purpose.gpu.title")}</h3>
				<span className={styles.banner_subtitle}
				      style={{color: '#C7F6CA'}}>{t("sectors.public.purpose.gpu.aspect")}</span>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.gpu.subtitle")}</span>
				<span className={styles.banner_subtitle}
				      style={{color: '#C7F6CA'}}>{t("sectors.public.purpose.gpu.post")}</span>
			</div>
			<Image
				src="/images/sectors/gpu.webp"
				alt={t("sectors.public.purpose.gpu.title")}
				width={630}
				height={247}/>

		</div>
	);
};

export default Gpu;
