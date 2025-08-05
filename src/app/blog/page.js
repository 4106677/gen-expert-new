'use client'
import React, {useEffect, useState} from "react";
import GreenBox from "@/app/(components)/GreenBox/GreenBox";
import styles from './blog.module.css'
import Image from "next/image"
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import {useTranslation} from "react-i18next";
import CustomLink from "@/app/(components)/CustomLink/customLink";

const Blog = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation('common');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<>
			<GreenBox text={t("blog.title")}/>
			<div className={`${styles.blog} container`}>
				<h2 className={styles.head}>{t("blog.pageTitle")}</h2>
				<ul className={styles.tips}>
					<li className={styles.tips_item}>
						Економія на електроенергії до 50%
						<span className={styles.tips_item__span}>знижені тарифи, відсутність платежів за передачу і розподіл.</span>
					</li>
					<li className={styles.tips_item}>
						Жодних блекаутів
						<span className={styles.tips_item__span}>незалежність від мережі – стабільна робота навіть при аваріях в мережі.</span>
					</li>
					<li className={styles.tips_item}>
						Ефективність
						<span className={styles.tips_item__span}>конкурентна перевага – низька собівартість електроенергії дає вам сильну перевагу на ринку.</span>
					</li>
					<li className={styles.tips_item}>
						Рентабельність
						<span className={styles.tips_item__span}>вище, ніж у дизельних генераторів за рахунок дешевшого палива (газ дешевше дизеля в 3-4 рази), а викидів NOₓ і CO₂ на 80% менше</span>
					</li>
					<li className={styles.tips_item}>
						Низькі експлуатаційні витрати
						<span className={styles.tips_item__span}>газове паливо забезпечує більш плавну роботу двигуна і знижує знос.</span>
					</li>
					<li className={styles.tips_item}>
						Стабільна вартість палива
						<span className={styles.tips_item__span}>природний газ має меншу волатильність цін у порівнянні з електроенергією і дизельним паливом.</span>
					</li>
					<li className={styles.tips_item}>
						Комбіноване виробництво
						<span className={styles.tips_item__span}>електро- і теплової енергії – когенерація дозволяє виробляти одночасно і електричество і тепло, збільшуючи ККД установки до 90%!</span>
					</li>
					<li className={styles.tips_item}>
						Оптимальне рішення
						<span className={styles.tips_item__span}>під ваші задачі і бюджет – нові та б/в ГПУ в відмінному стані.</span>
					</li>
				</ul>
				<div className={styles.slogan}>
					<h3 className={styles.slogan_head}>ГПУ - це найкраще рішення для таких об’єктів:</h3>
					<ul className={styles.slogan_items}>
						<li className={styles.slogan_item}>
							<Image src="/images/check-verified.svg" width={25} height={25} alt="check verified"></Image>
							Виробничі підприємства
						</li>
						<li className={styles.slogan_item}>
							<Image src="/images/check-verified.svg" width={25} height={25} alt="check verified"></Image>
							Бізнес-центри
						</li>
						<li className={styles.slogan_item}>
							<Image src="/images/check-verified.svg" width={25} height={25} alt="check verified"></Image>
							Торгові і логістичні центри
						</li>
						<li className={styles.slogan_item}>
							<Image src="/images/check-verified.svg" width={25} height={25} alt="check verified"></Image>
							Центри обробки даних
						</li>
						<li className={styles.slogan_item}>
							<Image src="/images/check-verified.svg" width={25} height={25} alt="check verified"></Image>
							Тепличні комплекси
						</li>
					</ul>
				</div>
				<h3 className={styles.slug}>{t("blog.pageSlug")}</h3>
			</div>
			<div className={styles.grid}>
				{Object.values(t("blog.data", { returnObjects: true }) || {})
					.filter(item => item && typeof item === 'object')
					.map(({ id, image, title, subtitle, href }, index) => (
						<div key={id || index} className={styles.grid__item}>
							<Image className={styles.grid__image} src={image} alt={title} width={570} height={341} />
							<h4 className={styles.grid__header}>{title}</h4>
							<span className={styles.grid_description}>{subtitle}</span>
							<CustomLink href={href} height={40} text={t("blog.details")} style={{border: '1px solid #50AE55', marginTop: 'auto'}}/>
						</div>
					))}
			</div>
			<Consultation/>
		</>
	);
};

export default Blog;
