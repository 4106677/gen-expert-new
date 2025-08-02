import React from "react";
import styles from "./HowItWorks.module.scss";

const HowItWorks = ({sector: {details, images}, headers}) => {
	return (
		<div className={styles.how}>
			<h2
				className={styles.header}
			    dangerouslySetInnerHTML={{__html: headers.how_it_works?.replace(/\n/g, '<br/>')}}/>
			<span className={styles.title}>{details.how_it_works?.title}</span>
			<h3 className={styles.subtitle}>{details.how_it_works?.subtitle}</h3>
			<div className={styles.grid}>
				{details.how_it_works?.tips.map(({title, subtitle}, index) => (
					<div className={styles.gridItem} key={title + index}>
						<span className={styles.gridItem_rounder}>{index + 1}</span>
						<h4 className={styles.gridItem_header}>{title}</h4>
						<span className={styles.gridItem_description}>{subtitle}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default HowItWorks;
