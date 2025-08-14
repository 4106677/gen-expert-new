// src/app/equipment/components/ProductList.js
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import styles from "../equipment/equipment.module.css";
import { bbExtractor } from "@/helpers/bbExtractor";
import CustomLink from "@/app/(components)/CustomLink/customLink";

export default function ProductList({ products }) {
	const {t} = useTranslation("common");

	if (!products || products.length === 0) {
		return (
			<div className={styles.noResults}>
				<p>{t("equipment.noResults")}</p>
			</div>
		);
	}

	return (
		<ul>
			{products.map(item => (
				<li className={styles.product} key={item.article}>
					<Image
						// onClick={(event) => onOpenModal(item, event)}
						width={400}
						height={300}
						className={styles.img}
						src={bbExtractor(item.photo1)}
						alt={item.model}
					/>
					<div className={styles.productsSection}>
						<h3 className={styles.product_h3}>{item.manufacturer} {item.model}</h3>
						<ul className={styles.productDescription}>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.power')}:</span>{item.power} {item.powerUnit}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.voltage')}:</span>{item.voltage} {item.voltageUnit}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.frequency')}:</span>50Hz</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.condition')}:</span>{item.condition}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.release')}:</span>{item.year}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>{t('units.working')}:</span>{item.hours} {item.hoursUnit}</li>
						</ul>
						<CustomLink href={`/equipment/${item.article}`} text={t('menu.details')} height={40} classname={styles.product_button}></CustomLink>
					</div>
				</li>
			))}
		</ul>
	);
}