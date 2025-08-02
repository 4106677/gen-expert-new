import React from "react";
import styles from './Advantages.module.scss'

const Advantages = ({sector: {details}, headers}) => {
	const perks = details.perks
	const perksCount = perks.length

	return (
		<div className={styles.advantages}>
			<h3 className={styles.advantages_header}>{headers.advantages}</h3>
			<ul className={styles.advantages_grid} data-count={perksCount}>
				{perks.map(({title, text}, index) => (
					<li className={styles.advantages_gridItem} key={title + index}>
						<h5 className={styles.advantages_gridItem__header}>{title}</h5>
						<span className={styles.advantages_gridItem__description}>{text}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Advantages;