'use client';
import './hero.css';
import Stripe from "@/app/(components)/Stripe/stripe";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function Hero() {
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

	const aspects = Object.values(t('main_page.hero.aspects', { returnObjects: true }) || {});

	return <div className='hero-container'>
		<div className="hero-main container">
			<div className="video-wrapper ">
				<video src="/images/hero/hero.mp4"
				       autoPlay
				       muted
				       loop
				       playsInline
				       controls={false}
				       className='hero-video '/>

			</div>
			<div className="video-text-container">
				<h1 className='hero-title'>{t('main_page.hero.title')}</h1>
				{t('main_page.hero.subtitle')
					.split('\n')
					.map((line, index) => (
						<h2 className='hero-subtitle' key={index}>
							{line}
						</h2>
					))}


				<div className="hero-buttons">
					<Link href="/#contactForm" style={{height: '42px', fontSize: '15px'}}
					      className='btn btn_white'>{t('main_page.hero.contact')}</Link>
					<Link href="/calculator" style={{height: '42px', fontSize: '15px'}}
					      className='btn btn_outline'>{t('main_page.hero.calculate')}</Link>
				</div>

			</div>
			<ul className='hero-description'>
				{aspects &&
					aspects.map(({title, subtitle}, index) => {
						const safeTitle = title || `no-title-${index}`;
						const safeSubtitle = subtitle || `no-subtitle-${index}`;
						return (
							<li className="hero-description__item" key={`${safeTitle}-${safeSubtitle}`}>
								<p className="hero-description__bold">{title}</p>
								<span>{subtitle}</span>
							</li>
						);
					})
				}
			</ul>
		</div>
		<Stripe/>
		<div className="hero-buttons__mobile">
			<Link href="/#contactForm" style={{height: '54px', fontSize: '15px', borderColor: '#41A747', color: '#41A747'}}
			      className='btn btn_outline'>{t('main_page.hero.contact')}</Link>
			<Link href="/calculator" style={{height: '54px', fontSize: '15px', color: 'white'}}
			      className='btn btn_green'>{t('main_page.hero.calculate')}</Link>
		</div>
	</div>
}