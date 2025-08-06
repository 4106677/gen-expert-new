// src/app/equipment/components/SortingHeader.js
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import styles from "../equipment/equipment.module.css";

export default function SortingHeader({
	                                      search,
	                                      setSearch,
	                                      searchInput,
	                                      setSearchInput,
	                                      isFilterVisible,
	                                      toggleFilter
                                      }) {
	const { t } = useTranslation("common");

	const handleInputChange = (event) => {
		setSearchInput(event.target.value);
	};

	const handleSearchClick = () => {
		setSearch(searchInput);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearchClick();
		}
	};

	return (
		<>
			<div className={styles.sortWrapper}>
				<input
					type="text"
					value={searchInput}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					placeholder={t("menu.search")}
					className={`${styles.search} ${styles.sortWrapper_input}`}
				/>
				<button
					className='btn btn_outline'
					style={{color: '#94A3B8', fontSize: '14px', borderColor: '#94A3B8', height: '40px'}}
					type='button'
					onClick={handleSearchClick}
				>
					{t('menu.search')}
				</button>
			</div>

			<button
				className={styles.mobileFilterToggle}
				onClick={toggleFilter}
			>
				<Image
					src="/filter-icon.svg"
					alt="Filter icon"
					width={24}
					height={24}
				/>
				{isFilterVisible
					? t("equipment.filters.hideFilters")
					: t("equipment.filters.showFilters")}
			</button>
		</>
	);
}