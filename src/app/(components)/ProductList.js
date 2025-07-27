// src/app/equipment/components/ProductList.js
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import styles from "../equipment/equipment.module.css";
import { bbExtractor } from "@/helpers/bbExtractor";
import CustomLink from "@/app/(components)/CustomLink/customLink";

export default function ProductList({ products, onOpenModal }) {
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
						onClick={(event) => onOpenModal(item, event)}
						width={400}
						height={300}
						className={styles.img}
						src={bbExtractor(item.photo1)}
						alt={item.model}
					/>
					<div className={styles.productsSection}>
						<h3 className={styles.product_h3}>{item.manufacturer} {item.model}</h3>
						<ul className={styles.productDescription}>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Електрична потужність:</span>{item.power} {item.powerUnit}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Напруга:</span>{item.price} {item.priceUnit}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Text</span>{item.voltage} {item.voltageUnit}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Text</span>{item.condition}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Text</span>{item.year}</li>
							<li className={styles.productDescription_item}><span className={styles.productDescription_itemSpan}>Text</span>{item.hours} {item.hoursUnit}</li>
						</ul>
						<CustomLink href={`/equipment/${item.article}`} text='Детально' height={40} style={{border: '1px solid #50AE55', width: 'max-content', marginTop: '15px'}}></CustomLink>
						{/*<p*/}
						{/*	dangerouslySetInnerHTML={{__html: item.description}}*/}
						{/*	className={styles.productsSection_p}*/}
						{/*/>*/}
						{/*<button*/}
						{/*	type="button"*/}
						{/*	className={styles.product_button}*/}
						{/*	onClick={(event) => onOpenModal(item, event)}*/}
						{/*>*/}
						{/*	{t("equipment.button")}*/}
						{/*</button>*/}
					</div>
				</li>
			))}
		</ul>
	);
}