'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image"
import './fields.css'
import Link from "next/link";
import {useTranslation} from "react-i18next";

const Fields = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const fields = Object.values(t('main_page.fields.tips', { returnObjects: true }) || {});

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
		<div className='fields'>
			<div className='fields-container container'>
				<div className="fields-left">
					<h3 className='fields-left__header'>{t('main_page.fields.title')}</h3>
					<span className='fields-left__description'>{t('main_page.fields.subtitle')}</span>
					<Image className='fields-left__image' src='/images/mainPage/fields.jpg' height={604} width={505} alt='Hero GPU'></Image>
				</div>
				<div className='fields-right custom-scroll'>
					{fields &&
						fields.map(({ title, subtitle, slug }, index) => {
							const safeTitle = title || `no-title-${index}`;
							const safeSubtitle = subtitle || `no-subtitle-${index}`;
							return (
								<Link href={`sectors/${slug}`} className='fields-right__item' key={`${safeTitle}-${safeSubtitle}`}>
									<h4 className='fields-right__item-header'>
										{title}
										<Image className='fields-right__item-image' src='/images/arrow-right.svg' alt='Arrow right' width={14} height={14}></Image>
									</h4>
									<span className='fields-right__item-description'>{subtitle}</span>
								</Link>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default Fields;
