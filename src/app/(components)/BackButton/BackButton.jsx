'use client'
import React from "react";
import styles from "./BackButton.module.scss";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

const BackButton = ({hover = 'transparent'}) => {
	const { t } = useTranslation("common");
	const router = useRouter();

	return (
		<button type="button" className={styles.back}
		        onClick={() => router.back()}>
			<Image
				src="/images/arrow-up-right.svg"
				alt="arrow-up-right"
				width={20}
				height={20}
				className={styles.back_image}
			/>
			{t("menu.back")}
		</button>
	);
};

export default BackButton;
