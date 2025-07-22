import React from "react";
import Image from "next/image"
import './possibilities.css'

const Possibilities = () => {
	return (
		<div className='possibilities-container container'>
			<h4 className='possibilities-header'>Гнучкі можливості для вашого бізнесу</h4>
			<div className="possibilities-main">
				<div className='possibilities-left'>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>Когенерацію</h5>
						<span className='possibilities-left__item-description'>Оптимізація опалення, пастеризації, варіння — однією системою. Висока ефективність і збереження якості продукту.</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/cog.png' alt='Cogeneratiom'></Image>
					</div>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>Модуль CO₂</h5>
						<span className='possibilities-left__item-description'>Оптимізація опалення, пастеризації, варіння — однією системою. Висока ефективність і збереження якості продукту.</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/co2.png' alt='CO2 module'></Image>
					</div>
					<div className="possibilities-left__item">
						<h5 className='possibilities-left__item-header'>Виконання контейнерног та відкритому типу </h5>
						<span className='possibilities-left__item-description'>Оптимізація опалення, пастеризації, варіння — однією системою. Висока ефективність і збереження якості продукту.</span>
						<Image className='possibilities-left__item-image' height={232} width={242} src='/images/mainPage/possibilities/container.png' alt='Container type'></Image>
					</div>
				</div>
				<div className='possibilities-right'>
					<h5 className='possibilities-right__header'>Виконання контейнерног та відкритому типу </h5>
					<span className='possibilities-right__description'>Оптимізація опалення, пастеризації, варіння — однією системою. Висока ефективність і збереження якості продукту.</span>
					<Image className='possibilities-right__image' height={568} width={678} src='/images/mainPage/possibilities/3gen.png'
					       alt='Container type'></Image>
				</div>
			</div>
		</div>
	);
};

export default Possibilities;
