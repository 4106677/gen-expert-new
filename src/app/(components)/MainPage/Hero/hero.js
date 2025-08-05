'use client';
import './hero.css';
import Stripe from "@/app/(components)/Stripe/stripe";
import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function Hero() {
	const { t } = useTranslation("common");
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
				<h2 className='hero-subtitle'>{t('main_page.hero.subtitle')}</h2>
				<div className="hero-buttons">
					<Link href="/#contactForm" style={{height: '42px', fontSize: '15px'}} className='btn btn_white'>{t('main_page.hero.contact')}</Link>
					<Link href="/calculator" style={{height: '42px', fontSize: '15px'}} className='btn btn_outline'>{t('main_page.hero.calculate')}</Link>
				</div>

			</div>
			<ul className='hero-description'>
				{aspects &&
					aspects.map(({ title, subtitle }, index) => {
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



				{/*<li className='hero-description__item'>*/}
				{/*	<p className='hero-description__bold'>250–4500 кВт</p>*/}
				{/*	<span>нові та вживані ГПУ</span>*/}
				{/*</li>*/}
				{/*<li className='hero-description__item'>*/}
				{/*	<p className='hero-description__bold'>100+</p>*/}
				{/*	<span>варіантів ГПУ/ КГУ</span>*/}
				{/*</li>*/}
				{/*<li className='hero-description__item'>*/}
				{/*	<p className='hero-description__bold'>15-20%</p>*/}
				{/*	<span>економія на вартості ГПУ/КГУ</span>*/}
				{/*</li>*/}
				{/*<li className='hero-description__item'>*/}
				{/*	<p className='hero-description__bold'>25+ років </p>*/}
				{/*	<span>досвіду в енергетиці</span>*/}
				{/*</li>*/}
			</ul>
		</div>
		<Stripe/>
	</div>
}