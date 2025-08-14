// src/app/equipment/components/EquipmentFilter.js
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../equipment/equipment.module.css";

export default function EquipmentFilter({
	                                        filters,
	                                        isFilterVisible,
	                                        windowWidth,
	                                        toggleFilter,
	                                        onResetAllFilters
                                        }) {
	const { t } = useTranslation("common");

	const [showStates, setShowStates] = useState({
		power: true,
		manufacturer: true,
		voltage: true,
		condition: true,
		bodyType: true,
		genType: true,
	});

	const isMobile = windowWidth < 1250;

	useEffect(() => {
		if (isMobile) {
			setShowStates({
				power: true,
				manufacturer: true,
				voltage: true,
				condition: true,
				bodyType: true,
				genType: true,
			});
		}
	}, [isMobile, windowWidth]);

	const toggleFilterSection = (section) => {
			setShowStates(prev => ({ ...prev, [section]: !prev[section] }));
	};

	return (
		<>

			<ul className={`${styles.left} ${isFilterVisible ? styles.visible : ""}`}>
				{(isMobile && isFilterVisible) && (
					<button className={styles.mobile_menu_btn} onClick={toggleFilter}>
						<span></span>
						<span></span>
						<span></span>
					</button>
				)}
				<div className={styles.left_top}>
					<h2 className={styles.left_title}>{t("equipment.filters.title")}</h2>
					<button
						className="btn btn_outline"
						style={{color: "#94A3B8", fontSize: "14px", borderColor: "#94A3B8", height: "40px"}}
						type="button"
						onClick={onResetAllFilters}
					>
						{t("equipment.filters.items.sorting.reset")}
					</button>
				</div>
				{/* Power Filter */}
				<li className={`${styles.left_li} ${!showStates.power && styles.left_li__hide} ${styles.filter_power}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection("power")}
					>
						{t("equipment.filters.items.power")}

						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.power ? 0 : 180}deg)`}}
						/>

					</h3>
					{showStates.power && (
						<div className={styles.inputFilters}>
							<form onSubmit={(e) => {
								e.preventDefault();
								filters.applyPowerFilter(
									e.target.elements.minPower.value,
									e.target.elements.maxPower.value
								);
							}}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minPower"
										defaultValue={filters.filterPower.min}
										key={`min-${filters.filterPower.min}`}
										placeholder="Min power"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxPower"
										defaultValue={filters.filterPower.max}
										key={`max-${filters.filterPower.max}`}
										placeholder="Max power"
									/>
									<button type="submit"
									        className='btn btn_outline'
									        style={{
										        color: '#50AE55',
										        borderColor: '#50AE55',
										        padding: '10px 17px',
										        height: '40px',
										        marginLeft: '8px'
									        }}
									>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={filters.powerRange.min}
									max={filters.powerRange.max}
									value={[filters.filterPower.min, filters.filterPower.max]}
									onChange={(value) => {
										const [min, max] = value;
										filters.setFilterPower({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>
					)}
				</li>

				{/* Manufacturer Filter */}
				<li className={`${styles.left_li} ${!showStates.manufacturer && styles.left_li__hide} ${styles.filter_manufacturer}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection('manufacturer')}
					>
						{t("equipment.filters.items.manufacturer")}

						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.manufacturer ? 180 : 0}deg)`}}
						/>

					</h3>
					{showStates.manufacturer && (
						<>
							{filters.manufacturers.map((item, index) => (
								<div key={index} className={styles.left_input__text}>
									<input
										className={styles.checkboxes_input}
										type="checkbox"
										onChange={() => filters.onManufacturerInputClick(item)}
										checked={filters.filterManufacturer.includes(item)}
									/>
									{item}
								</div>
							))}
						</>
					)}
				</li>

				{/* Voltage Filter */}
				<li className={`${styles.left_li} ${!showStates.voltage && styles.left_li__hide} ${styles.filter_voltage}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection('voltage')}
					>
						{t("equipment.filters.items.voltage")}
						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.voltage ? 180 : 0}deg)`}}
						/>
					</h3>
					{showStates.voltage && (
						<div className={styles.inputFilters}>
							<form onSubmit={(e) => {
								e.preventDefault();
								filters.applyVoltageFilter(
									e.target.elements.minVoltage.value,
									e.target.elements.maxVoltage.value
								);
							}}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minVoltage"
										defaultValue={filters.filterVoltage.min}
										key={`min-${filters.filterVoltage.min}`}
										placeholder="Min voltage"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxVoltage"
										defaultValue={filters.filterVoltage.max}
										key={`max-${filters.filterVoltage.max}`}
										placeholder="Max voltage"
									/>
									<button type="submit"
									        className='btn btn_outline'
									        style={{
										        color: '#50AE55',
										        borderColor: '#50AE55',
										        padding: '10px 17px',
										        height: '40px',
										        marginLeft: '8px'
									        }}>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={filters.voltageRange.min}
									max={filters.voltageRange.max}
									value={[filters.filterVoltage.min, filters.filterVoltage.max]}
									onChange={(value) => {
										const [min, max] = value;
										filters.setFilterVoltage({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>
					)}
				</li>

				{/* Condition Filter */}
				<li className={`${styles.left_li} ${!showStates.condition && styles.left_li__hide} ${styles.filter_condition}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection('condition')}
					>
						{t("equipment.filters.items.condition")}
						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.condition ? 180 : 0}deg)`}}
						/>
					</h3>
					{showStates.condition && (
						<>
							{filters.conditions.map((item, index) => (
								<div key={index} className={styles.left_input__text}>
									<input
										className={styles.checkboxes_input}
										type="checkbox"
										onChange={() => filters.onConditionInputClick(item)}
										checked={filters.filterCondition.includes(item)}
									/>
									{item}
								</div>
							))}
						</>
					)}
				</li>

				{/* Body Type Filter */}
				<li className={`${styles.left_li} ${!showStates.bodyType && styles.left_li__hide} ${styles.filter_bodyType}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection('bodyType')}
					>
						{t("equipment.filters.items.bodyType")}

						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.bodyType ? 180 : 0}deg)`}}
						/>

					</h3>
					{showStates.bodyType && (
						<>
							{filters.bodyTypes.map((item, index) => (
								<div key={index} className={styles.left_input__text}>
									<input
										className={styles.checkboxes_input}
										type="checkbox"
										onChange={() => filters.onBodyTypeInputClick(item)}
										checked={filters.filterBodyType.includes(item)}
									/>
									{item}
								</div>
							))}
						</>
					)}
				</li>

				{/* Generator Type Filter */}
				<li className={`${styles.left_li} ${!showStates.genType && styles.left_li__hide} ${styles.filter_genType}`}>
					<h3
						className={styles.left_h3}
						onClick={() => toggleFilterSection('genType')}
					>
						{t("equipment.filters.items.genType")}

						<Image
							aria-hidden
							src="/images/rounder-right.svg"
							alt="Arrow icon"
							width={24}
							height={24}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.genType ? 180 : 0}deg)`}}
						/>

					</h3>
					{showStates.genType && (
						<>
							{filters.genTypes.map((item, index) => (
								<div key={index} className={styles.left_input__text}>
									<input
										className={styles.checkboxes_input}
										type="checkbox"
										onChange={() => filters.onGenTypeInputClick(item)}
										checked={filters.filterGenType.includes(item)}
									/>
									{item}
								</div>
							))}
						</>
					)}
				</li>
				{(isMobile && isFilterVisible) && (
					<div className={styles.filter_bottom_buttons}>
						<button className={`btn btn_outline`} onKeyDown={onResetAllFilters} style={{color:'#41A747', borderColor:'#41A747'}} onClick={toggleFilter}>
							{t('menu.cancel')}
						</button>
						<button className={`btn btn_green`} onClick={toggleFilter} style={{color: 'white'}}>
							{t('menu.apply')}
						</button>
					</div>
				)}
			</ul>
		</>
	);
}