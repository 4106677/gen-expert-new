// src/app/equipment/[id]/page.js
'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import { useSheetData } from "@/context/SheetDataContext";
import { decodeEquipmentId, createEquipmentUrl } from "@/utils/urlUtils";
import Fields from "@/app/(components)/Fields/fields";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Tips from "@/app/(components)/Tips/tips";
import styles from './EquipmentDetailPage.module.css'
import Image from "next/image"
import {bbExtractor} from "@/helpers/bbExtractor";

export default function EquipmentDetailPage() {
	const { id: rawId } = useParams();
	const router = useRouter();
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { data, loading, error, getItemById, fetchData } = useSheetData()
	const [item, setItem] = useState(null)
	const [itemLoading, setItemLoading] = useState(true);
	const [mainImage, setMainImage] = useState(null)
	const [photo, setPhoto] = useState([])
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const previewRef = useRef(null);

	const decodedId = rawId ? decodeEquipmentId(rawId) : null;

	const lines = item?.description?.split(/<br\s*\/?>/).map(line => line.trim()).filter(Boolean);
	const header = lines ? lines[0] : '';
	const listItems = lines?.slice(1);

	// Функція для перевірки можливості прокрутки
	const checkScrollButtons = () => {
		if (previewRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = previewRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	};

	// Функції прокрутки
	const scrollLeft = () => {
		if (previewRef.current) {
			previewRef.current.scrollBy({ left: -280, behavior: 'smooth' }); // 2 зображення (130px + 10px gap) * 2
		}
	};

	const scrollRight = () => {
		if (previewRef.current) {
			previewRef.current.scrollBy({ left: 280, behavior: 'smooth' }); // 2 зображення (130px + 10px gap) * 2
		}
	};

	useEffect(() => {
		const loadItem = async () => {
			setItemLoading(true);
			if (!data) {
				await fetchData(lang);
			}
			const foundItem = getItemById(decodedId);

			if (!foundItem) {
				setItem(null);
				setItemLoading(false);
				return;
			}

			setItem(foundItem);
			setItemLoading(false);
		};

		if (decodedId && lang) {
			loadItem();
		}
	}, [decodedId, data, lang, getItemById, fetchData]);

	useEffect(() => {
		if (item) {
			setMainImage(bbExtractor(item?.photo1) || bbExtractor(item?.photo2));

			const newPhotos = [];
			for (let i = 1; i <= 10; i++) {
				const key = `photo${i}`;
				if (item[key] && item[key].trim() !== "") {
					const extracted = bbExtractor(item[key]);
					if (extracted) newPhotos.push(extracted);
				}
			}
			setPhoto(newPhotos);
		}
	}, [item]);

	// Перевіряємо кнопки після завантаження фото
	useEffect(() => {
		if (photo.length > 0) {
			setTimeout(checkScrollButtons, 100); // Невелика затримка для рендерингу
		}
	}, [photo]);

	const handleImageClick = (imageUrl) => {
		setMainImage(imageUrl);
	};


	if (loading || itemLoading) {
		return (
			<div >
				<div >
					<h2>Loading...</h2>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div >
				<div >
					<h2>Error: {error}</h2>
					<button onClick={() => router.push('/equipment')}>
						Повернутись до каталогу
					</button>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div >
				<div >
					<h2>Обладнання не знайдено</h2>
					<p>Обладнання з ID "{decodedId}" не існує або було видалено.</p>
					<button onClick={() => router.push('/equipment')}>
						Повернутись до каталогу
					</button>
				</div>
			</div>
		);
	}

	return (
		<div >
			<div className={styles.page}>
				<div className={`${styles.container} container`}>
					<button type='button' className={styles.back}
					        onClick={() => router.back()}>
						<Image
							src='/images/arrow-up-right.svg'
							alt='arrow-up-right'
							width={20}
							height={20}
							className={styles.back_image}
						/>
						Назад
					</button>
					<div className={styles.wrapper}>
						<div className={styles.image_box}>
							{mainImage && <Image className={styles.image} src={mainImage} alt={item.model} width={610} height={388}></Image>}

							<div className={styles.preview_container}>
								{/* Кнопка прокрутки вліво */}
								{canScrollLeft && (
									<button
										className={`${styles.scroll_button} ${styles.scroll_button_left}`}
										onClick={scrollLeft}
									>
										<Image src='/images/arrow-right-white.svg' alt='left' width={18} height={18} style={{transform: 'rotate(180deg)'}}/>
									</button>
								)}

								{/* Кнопка прокрутки вправо */}
								{canScrollRight && (
									<button
										className={`${styles.scroll_button} ${styles.scroll_button_right}`}
										onClick={scrollRight}
									>
										<Image src='/images/arrow-right-white.svg' alt='left' width={18} height={18}/>
									</button>
								)}

								<div
									className={styles.preview}
									ref={previewRef}
									onScroll={checkScrollButtons}
								>
									{photo?.map((imageUrl, index) => (
										imageUrl !== "" &&
										<div className={styles.preview_image__wrapper} key={index}>
											<Image
												className={[styles.image, styles.preview_image].join(' ')}
												src={imageUrl}
												alt={item.manufacturer}
												width={130}
												height={130}
												onClick={() => handleImageClick(imageUrl)}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className={styles.description}>
							<h1 className={styles.description_header}>{item.manufacturer} {item.model}</h1>
							<ul className={styles.description_spec}>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Електрична потужність: </span>{item.power}</li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Напруга: </span>{item.voltage}</li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Частота: </span></li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Стан: </span>{item.condition}</li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Напрацювання: </span>{item.hours}</li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Рік виробництва: </span>{item.year}</li>
								<li className={styles.description_spec__item}><span className={styles.description_spec__span}>Виконання: </span>{item.bodyType}</li>
							</ul>
							<span className={styles.details}>Детали:</span>
							<h3 className={styles.details_header}>{header}</h3>
							{listItems.map((line, index) => (
								<li key={index} className={styles.details_item}>{line}</li>
							))}
						</div>
					</div>
				</div>
			</div>
			<Consultation/>
			<Tips header="Інші варінти установок"/>
			<Fields />
		</div>
	);
}