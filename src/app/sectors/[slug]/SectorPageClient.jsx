'use client'
import React from "react";
import BackButton from "@/app/(components)/BackButton/BackButton";
import styles from '../SectorsPage.module.scss'
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import {useTranslation} from "react-i18next";
import SectorHead from "@/app/(components)/Sectors/Head/SectorHead";
import Advantages from "@/app/(components)/Sectors/Advantages/Advantages";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Principle from "@/app/(components)/Sectors/Principle/Principle";

const SectorPageClient = ({ slug }) => { // Принимаем slug как проп
	const { t } = useTranslation("common");
	const sectors = t("sectors", { returnObjects: true });
	const sector = sectors?.industries?.find((item) => item.slug === slug);
	const headers = sectors.headers

	if (!sector) {
		return (
			<div>
				<h2>Sector not found</h2>
				<p>Sector with slug "{slug}" does not exist.</p>
			</div>
		)
	}

	return (
		<>
			<GreenBox text={sector.name}/>
			<div className={`${styles.container} container`}>
				<BackButton/>
				<SectorHead sector={sector} headers={headers}/>
				<Advantages sector={sector} headers={headers}/>
				<Principle sector={sector} headers={headers}/>
			</div>
			<Consultation/>
		</>
	);
};

export default SectorPageClient;