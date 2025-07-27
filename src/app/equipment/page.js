// src/app/equipment/page.js
'use client';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import styles from "./equipment.module.css";

// Import custom hooks and components
import { useEquipmentFilters } from "./hooks/useEquipmentFilters";
import { useResponsive } from "./hooks/useResponsive";
import SortingHeader from "@/app/(components)/SortingHeader";
import EquipmentFilter from "@/app/(components)/EquipmentFilter";
import ProductList from "@/app/(components)/ProductList";
import Banner from "@/app/(components)/Banner/banner";
import Stripe from "@/app/(components)/Stripe/stripe";
import {useSheetData} from "@/context/SheetDataContext";

export default function Equipment({ modalId }) {
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { data, loading, error, fetchData } = useSheetData();

	// Use our custom hooks
	const { windowWidth, isFilterVisible, toggleFilter, isMounted } = useResponsive();
	const filters = useEquipmentFilters(data);

	// Завантажуємо або оновлюємо дані при зміні мови
	useEffect(() => {
		if (lang && isMounted) {
			fetchData(lang);
		}
	}, [lang, isMounted, fetchData]);

	// Show loading state
	if (!isMounted || loading) {
		return (
			<div className={styles.main}>
				<div className={styles.loading}>
					<h1>Loading...</h1>
				</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className={styles.main}>
				<div className={styles.error}>
					<h1>Error loading data: {error}</h1>
					<button onClick={() => fetchData(lang)}>
						Try again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.main}>
			<div className={`${styles.wrapper} container`}>
				<Banner
					header='Каталог ГПУ під потреби бізнесу та держ установ'
					direction='reverse'
					style={{ marginBottom: '46px' }}
				/>
				<Stripe style={{ marginBottom: '46px' }} />

				<div className={styles.container}>
					{/* Filter Sidebar */}
					<EquipmentFilter
						filters={filters}
						isFilterVisible={isFilterVisible}
						windowWidth={windowWidth}
					/>

					{/* Product List Section */}
					<div className={styles.right}>
						<SortingHeader
							search={filters.search}
							setSearch={filters.setSearch}
							isFilterVisible={isFilterVisible}
							toggleFilter={toggleFilter}
						/>
						<ProductList
							products={filters.filterData}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}