import React from "react";
import Image from "next/image"
import './fields.css'
import Link from "next/link";

const Fields = () => {
	return (
		<div className='fields'>
			<div className='fields-container container'>
				<div className="fields-left">
					<h3 className='fields-left__header'>Енергонезалежність для кожного сектору</h3>
					<span className='fields-left__description'>Комплексне обслуговування та постачання ГПУ та сонячних панелей для енергетичної незалежності вашого бізнесу</span>
					<Image className='fields-left__image' src='/images/mainPage/fields.jpg' height={604} width={505} alt='Hero GPU'></Image>
				</div>
				<div className='fields-right'>
					<Link href='/' className='fields-right__item'>
						<h4 className='fields-right__item-header'>Сільське господарство та теплиці</h4>
						<span className='fields-right__item-description'>Дешева енергія та CO₂ для теплиць, що збільшує врожайність. Удобрює рослини, підвищуючи врожайність на 20% та економію 30-50% на електроенергії</span>
						<Image className='fields-right__item-image' src='/images/arrow-right.svg' alt='Arrow right' width={14} height={14}></Image>
					</Link>

				</div>
			</div>
		</div>
	);
};

export default Fields;
