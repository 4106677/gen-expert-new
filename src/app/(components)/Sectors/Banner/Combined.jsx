import React from "react";
import {useTranslation} from "react-i18next";
import styles from '../Sectors.module.scss'
import Image from "next/image";
import {useMediaQuery} from "@/hooks";

const Combined = () => {
	const { t } = useTranslation('common');
	const mobile = useMediaQuery("(max-width: 768px)");
	return (

		<div className={`${styles.banner} ${styles.hybrid}`}>
			<div className={styles.hybrid_description}>
				<h3 className={styles.banner_header}>{t("sectors.public.purpose.hybrid.title")}</h3>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.aspect")}</span>
				<span className={styles.banner_subtitle}>{t("sectors.public.purpose.hybrid.subtitle")}</span>
			</div>
			<Image
				src={`/images/sectors/hybrid${mobile && '_mobile'}.webp`}
				alt={t("sectors.public.purpose.hybrid.title")}
				width={mobile ? 348 : 567}
				height={mobile ? 196 : 320}
				className={styles.banner_image}
			/>
		</div>
	)
		;
};

export default Combined;
