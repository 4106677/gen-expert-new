import React from "react";
import Image from "next/image";
import styles from './SectorHead.module.scss'

const SectorsHead = ({sector, headers}) => {
	return (
		<div className={styles.subsectors}>
			<Image
				src={sector.images.hero}
				alt={sector.name}
				width={525}
				height={618}
				className={styles.subsectors_image}
			/>
			<div className={styles.subsectors_text}>
				<h2 className={styles.subsectors_text__header}>{headers.sub_sectors}</h2>
				<ul className={styles.subsectors_text__list}>
					{sector.details.sub_sectors.tips.map((item, index) => (
						<li key={index} className={styles.subsectors_text__listItem}>
							<Image src='/images/check-verified-green.svg' width={20} height={20} alt='check verified'/>
							{item}
						</li>
					))}
				</ul>
				<h3 className={styles.subsectors_text_description__header}>{headers.justification}</h3>
				{sector.details.sub_sectors.paragraph.map((item, index) => (
					<p className={styles.subsectors_text_description__paragraph} key={item + index}>{item}</p>
				))
				}
			</div>
		</div>
	);
};

export default SectorsHead;
