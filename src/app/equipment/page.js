// src/app/equipment/page.js
'use client';
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import styles from "./equipment.module.css";
import { fetchGoogleSheetData } from "@/services/google";
import { useEquipmentFilters } from "./hooks/useEquipmentFilters";
import { useResponsive } from "./hooks/useResponsive";
import { usePagination } from "./hooks/usePagination";
import SortingHeader from "@/app/(components)/SortingHeader";
import EquipmentFilter from "@/app/(components)/EquipmentFilter";
import ProductList from "@/app/(components)/ProductList";
import Pagination from "@/app/(components)/Pagination/Pagination";
import Banner from "@/app/(components)/Banner/banner";
import Stripe from "@/app/(components)/Stripe/stripe";
import {useMediaQuery} from "@/hooks";

export default function Equipment({ modalId }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [itemsPerPage, setItemsPerPage] = useState(12);
	const [isMount, setIsMount] = useState(false);
	const mobile = useMediaQuery("(max-width: 768px)");

	// Состояние поиска в родительском компоненте
	const [searchInput, setSearchInput] = useState('');

	const { t } = useTranslation("common");
	const { lang } = useLanguage();

	const { windowWidth, isFilterVisible, toggleFilter, isMounted } = useResponsive();
	const filters = useEquipmentFilters(data);

	useEffect(() => {
		setIsMount(true);
	}, []);

	useEffect(() => {
		if (isFilterVisible && mobile) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => { document.body.style.overflow = 'unset'; };
	}, [isFilterVisible, mobile]);

	const filteredData = useMemo(() => {
		return filters.filterData || [];
	}, [filters.filterData]);

	const pagination = usePagination(filteredData, itemsPerPage);

	const handleItemsPerPageChange = (newItemsPerPage) => {
		setItemsPerPage(newItemsPerPage);
	};

	const handleResetAllFilters = () => {
		setSearchInput('');
		filters.setSearch('');
		filters.resetAllFilters();
	};

	useEffect(() => {
		async function loadSheetData() {
			try {
				setLoading(true);
				const sheetData = await fetchGoogleSheetData(lang.toUpperCase());
				setData(sheetData);
			} catch (error) {
				console.error("Failed to fetch sheet data:", error.message);
				setData([]);
			} finally {
				setLoading(false);
			}
		}

		loadSheetData();
	}, [lang]);

	if (!isMounted || loading) {
		return (
			<div className={styles.main}>
				<div className={`${styles.wrapper} container`}>
					<div className={styles.loadingContainer}>
						<div className={styles.loader}></div>
					</div>
				</div>
			</div>
		);
	}

	if (!isMount) {
		return (
			<div>
			</div>
		);
	}

	return (
		<div className={styles.main}>
			<div className={`${styles.wrapper} container`}>
				<Banner
					header={t('equipment.title')}
					direction='reverse'
					style={{ marginBottom: '46px' }}
					className={styles.banner}
				/>
				<Stripe className={styles.stripe}/>

				<div className={styles.container}>
					{!mobile &&
						<EquipmentFilter
						filters={filters}
						isFilterVisible={isFilterVisible}
						windowWidth={windowWidth}
						onResetAllFilters={handleResetAllFilters}
					/>}

					<div className={styles.right}>
						<SortingHeader
							search={filters.search}
							setSearch={filters.setSearch}
							searchInput={searchInput}
							setSearchInput={setSearchInput}
							isFilterVisible={isFilterVisible}
							toggleFilter={toggleFilter}
							totalItems={filteredData.length}
							showingItems={pagination.paginatedData.length}
						/>

						{mobile && <EquipmentFilter
							filters={filters}
							isFilterVisible={isFilterVisible}
							windowWidth={windowWidth}
							toggleFilter={toggleFilter}
							onResetAllFilters={handleResetAllFilters}
						/>}

						<ProductList
							products={pagination.paginatedData}
							loading={loading}
						/>

						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
							goToPage={pagination.goToPage}
							goToFirstPage={pagination.goToFirstPage}
							goToLastPage={pagination.goToLastPage}
							goToNextPage={pagination.goToNextPage}
							goToPrevPage={pagination.goToPrevPage}
							getPageNumbers={pagination.getPageNumbers}
							hasNextPage={pagination.hasNextPage}
							hasPrevPage={pagination.hasPrevPage}
							totalItems={pagination.totalItems}
							itemsPerPage={pagination.itemsPerPage}
							onItemsPerPageChange={handleItemsPerPageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}