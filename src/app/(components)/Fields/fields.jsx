'use client';
import React from "react";
import Image from "next/image"
import './fields.css'
import Link from "next/link";
import {useTranslation} from "react-i18next";

const Fields = () => {
	const { t } = useTranslation("common");
	const fields = Object.values(t('main_page.fields.tips', { returnObjects: true }) || {});

	return (
		<div className='fields'>
			<div className='fields-container container'>
				<div className="fields-left">
					<h3 className='fields-left__header'>{t('main_page.fields.title')}</h3>
					<span className='fields-left__description'>{t('main_page.fields.subtitle')}</span>
					<Image className='fields-left__image' src='/images/mainPage/fields.jpg' height={604} width={505} alt='Hero GPU'></Image>
				</div>
				<div className='fields-right'>
					{fields &&
						fields.map(({ title, subtitle, slug }, index) => {
							const safeTitle = title || `no-title-${index}`;
							const safeSubtitle = subtitle || `no-subtitle-${index}`;
							return (
								// <li className="hero-description__item" key={`${safeTitle}-${safeSubtitle}`}>
								// 	<p className="hero-description__bold">{title}</p>
								// 	<span>{subtitle}</span>
								// </li>

									<Link href={`sectors/${slug}`} className='fields-right__item' key={`${safeTitle}-${safeSubtitle}`}>
										<h4 className='fields-right__item-header'>Сільське господарство та теплиці
											<Image className='fields-right__item-image' src='/images/arrow-right.svg' alt='Arrow right' width={14} height={14}></Image>
										</h4>
										<span className='fields-right__item-description'>Дешева енергія та CO₂ для теплиць, що збільшує врожайність. Удобрює рослини, підвищуючи врожайність на 20% та економію 30-50% на електроенергії</span>

									</Link>

							);
						})
					}
					{/*<Link href='/public' className='fields-right__item'>*/}
					{/*	<h4 className='fields-right__item-header'>Сільське господарство та теплиці</h4>*/}
					{/*	<span className='fields-right__item-description'>Дешева енергія та CO₂ для теплиць, що збільшує врожайність. Удобрює рослини, підвищуючи врожайність на 20% та економію 30-50% на електроенергії</span>*/}
					{/*	<Image className='fields-right__item-image' src='/images/arrow-right.svg' alt='Arrow right' width={14} height={14}></Image>*/}
					{/*</Link>*/}
				</div>
			</div>
		</div>
	);
};

export default Fields;
