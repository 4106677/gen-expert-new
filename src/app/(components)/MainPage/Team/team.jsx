'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import './team.css';
import { useTranslation } from "react-i18next";

const Team = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const units = Object.values(t('main_page.team.units', { returnObjects: true }) || {});

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div></div>;
	}

	return (
		<div className='team'>
			<div className="team-container container">
				<h5 className='team-header'>{t("main_page.team.title")}</h5>
				<span className='team-description'>{t('main_page.team.subtitle')}</span>
				<ul className='team-list'>
					{units &&
						units.map(({ title, subtitle, text, image }, index) => {
							const safeTitle = title || `no-title-${index}`;
							const safeSubtitle = subtitle || `no-subtitle-${index}`;
							// Only render if image is a non-empty string
							if (typeof image === 'string' && image.trim() !== '') {
								return (
									<li className="team-list__item" key={`${safeTitle}-${safeSubtitle}`}>
										<Image
											className="team-list__item-image"
											width={348}
											height={295}
											src={image}
											alt={safeTitle}
										/>
										<div className="team-list__item-text">
											<h6 className="team-list__item-text__header">{safeTitle}</h6>
											<div className="team-list__item-text-description">
												<span className="team-list__item-text-span">{safeSubtitle}</span>
												{text}
											</div>
										</div>
									</li>
								);
							}
							return null;
						})}
				</ul>
			</div>
		</div>
	);
};

export default Team;