import React from "react";
import Image from "next/image";
import styles from "../Sectors.module.scss";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@/hooks";

const Hybrid = () => {
	const { t } = useTranslation('common');
	const mobile = useMediaQuery("(max-width: 768px)");

	return (
		<div className={`${styles.banner} ${styles.solar}`}>
			<Image
				src={`/images/sectors/solar${mobile ? '_mobile' : ''}.webp`}
				alt={t("sectors.public.purpose.solar.title")}
				// style={{transform: 'scaleX(-1)'}}
				width={mobile ? 348 : 563}
				height={mobile ? 147 : 238}
				className={styles.banner_image}
			/>
			<div className={styles.solar_description}>
				<h3 className={styles.banner_header}>{t("sectors.public.purpose.solar.title")}</h3>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.solar.subtitle")}</span>
			</div>
		</div>
	);
};

export default Hybrid;
