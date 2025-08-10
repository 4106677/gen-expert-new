import React from "react";
import Image from "next/image";
import styles from "../Sectors.module.scss";
import {useTranslation} from "react-i18next";

const Hybrid = () => {
	const { t } = useTranslation('common');
	return (
		<div className={`${styles.banner} ${styles.solar}`}>
			<Image
				src="/images/sectors/solar.webp"
				alt={t("sectors.public.purpose.solar.title")}
				style={{transform: 'scaleX(-1)'}}
				width={563}
				height={238}/>
			<div className={styles.solar_description}>
				<h3 className={styles.banner_header}>{t("sectors.public.purpose.solar.title")}</h3>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.solar.subtitle")}</span>
			</div>
		</div>
	);
};

export default Hybrid;
