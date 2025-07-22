import React from "react";
import Image from "next/image"
import './team.css'

const Team = () => {
	return (
		<div className='team'>
			<div className="team-container container">
				<h5 className='team-header'>Досвідчена команда інженерів та менеджерів </h5>
				<span className='team-description'>Комплексне обслуговування та постачання ГПУ та сонячних панелей для енергетичної незалежності вашого бізнесу</span>
				<ul className='team-list'>
					<li className='team-list__item'>
						<Image className='team-list__item-image' width={348} height={295} src="/images/mainPage/team/dovgal.jpg" alt="Team Manager Dovgal"/>
						<div className="team-list__item-text">
							<h6 className='team-list__item-text__header'>Віталій Довгаль</h6>
							<div className='team-list__item-text-description'>
								<span className='team-list__item-text-span'>Очолював «Центренерго», лідер стратегічного управління енергетичними підприємствами </span>з
								досвідом понад 25 років. Експерт із керівництва стратегічними підприємствами
								енергетичної системи України.
							</div>
						</div>
					</li>
					<li className="team-list__item">
						<Image className='team-list__item-image' width={348} height={295} src="/images/mainPage/team/egorc.jpg"
						       alt="Team Manager Danylo"/>
						<div className="team-list__item-text">
							<h6 className='team-list__item-text__header'>Данило Єгорченко</h6>
							<div className='team-list__item-text-description'>
								<span className='team-list__item-text-span'>Понад 10 років досвіду в енергетиці, </span>постачання енергоресурсів для
								приватного та комунального секторів України. Провідний експерт з енергогенеруючого
								обладнання (ГПУ/КГУ) у міжнародній донорській організації.
							</div>
						</div>
					</li>
					<li className="team-list__item">
						<Image className='team-list__item-image' width={348} height={295} src="/images/mainPage/team/konon.jpg"
						       alt="Team Manager Oleksij"/>
						<div className="team-list__item-text">
							<h6 className='team-list__item-text__header'>Олексій Кононенко</h6>
							<div className='team-list__item-text-description'>
								<span className='team-list__item-text-span'>15 років досвіду в комунальному господарстві та проектному менеджменті </span>у
								сфері критичної інфраструктури, енергетики, та впровадженні рішень для життєзабезпечення
								громад.
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Team;
