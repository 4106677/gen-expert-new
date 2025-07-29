import React, { useState } from "react";
import styles from "./tips.module.css";
import Image from "next/image"
import CustomLink from "@/app/(components)/CustomLink/customLink";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useSheetData} from "@/context/SheetDataContext";

const Tips = ({ header='ГПУ від 250-4500 кВт'}) => {
	const { data } = useSheetData();
	const [currentSlide, setCurrentSlide] = useState(0);
	const itemsPerSlide = 3;
	const totalSlides = Math.ceil(data?.length / itemsPerSlide) || 0;

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % totalSlides);
	};

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
	};

	const getCurrentItems = () => {
		if (!data) return [];
		const startIndex = currentSlide * itemsPerSlide;
		return data.slice(startIndex, startIndex + itemsPerSlide);
	};

	return (
		<div className={styles.tips}>
			<div className={`${styles.tips_container} container`}>
				<div className={styles.tips_heading}>
					<h2 className={styles.tips_header}>{header}</h2>
					<CustomLink href='/equipment' height={48} text='Всі ГПУ'/>
				</div>

				<div className={styles.slider_wrapper}>
					<button
						className={`${styles.tips_rounder} ${styles.tips_rounder_left}`}
						onClick={prevSlide}
						disabled={totalSlides <= 1}
					>
						<Image src='/images/arrow-right-white.svg' alt='left' width={18} height={18} style={{transform: 'rotate(180deg)'}}/>
					</button>

					<ul className={styles.tips_list}>
						{getCurrentItems().map(({photo1, model, article, manufacturer, voltage, voltageUnit, power, powerUnit, hours, hoursUnit, bodyType}) => (
							<li className={styles.tips_list__item} key={article}>
								<Image className={styles.tips_list__itemImage} src={bbExtractor(photo1)} alt={model}
								       width={386} height={233}/>
								<h3 className={styles.tips_list__itemHeader}>{manufacturer} {model}</h3>
								<ul className={styles.tips_list__details}>
									<li className={styles.tips_list__detailsItem}>Електрична потужність:
										<span className={styles.tips_list__detailsSpan}>{power} {powerUnit}</span>
									</li>
									<li className={styles.tips_list__detailsItem}>Напруга:
										<span className={styles.tips_list__detailsSpan}>{voltage}{voltageUnit}</span>
									</li>
									<li className={styles.tips_list__detailsItem}>Частота:
										<span className={styles.tips_list__detailsSpan}>Description</span>
									</li>
									<li className={styles.tips_list__detailsItem}>Напрацювання:
										<span className={styles.tips_list__detailsSpan}>{hours} {hoursUnit}</span>
									</li>
									<li className={styles.tips_list__detailsItem}>Виконання:
										<span className={styles.tips_list__detailsSpan}>{bodyType}</span>
									</li>
								</ul>
								<CustomLink href={`/equipment/${article}`} height={40} text='Детальніше'></CustomLink>
							</li>
						))}
					</ul>

					<button
						className={`${styles.tips_rounder} ${styles.tips_rounder_right}`}
						onClick={nextSlide}
						disabled={totalSlides <= 1}
					>
						<Image src='/images/arrow-right-white.svg' alt='right' width={18} height={18}/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Tips;