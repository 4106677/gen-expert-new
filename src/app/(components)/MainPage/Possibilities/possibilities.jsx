'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image"
import './possibilities.css'
import {useTranslation} from "react-i18next";

const Possibilities = () => {
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
		<div className='possibilities-container container'>
			<h4 className='possibilities-header'>{t('main_page.possibilities.title')}</h4>
			<div className="possibilities-main">
				<div className='possibilities-left'>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>{t('main_page.possibilities.cog.title')}</h5>
						<span className='possibilities-left__item-description'>{t('main_page.possibilities.cog.subtitle')}</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/cog.png' alt='Cogeneratiom'></Image>
					</div>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>{t('main_page.possibilities.co2.title')}</h5>
						<span className='possibilities-left__item-description'>{t('main_page.possibilities.co2.subtitle')}</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/co2.png' alt='CO2 module'></Image>
					</div>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>{t('main_page.possibilities.container.title')}</h5>
						<span className='possibilities-left__item-description'>{t('main_page.possibilities.container.subtitle')}</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/container.png' alt='Container type'></Image>
					</div>
				</div>
				<div className='possibilities-right'>
					<h5 className='possibilities-right__header'>{t('main_page.possibilities.3gen.title')}</h5>
					<span className='possibilities-right__description'>{t('main_page.possibilities.3gen.subtitle')}</span>
					<Image className='possibilities-right__image' height={568} width={678} src='/images/mainPage/possibilities/3gen.png'
					       alt='Container type'></Image>
				</div>
			</div>
		</div>
	);
};

export default Possibilities;
