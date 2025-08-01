import React from "react";
import styles from './Advantages.module.scss'

const Advantages = ({sector, headers}) => {
	return (
		<div className={styles.advantages}>
			<h3 className={styles.advantages_header}>{headers.advantages}</h3>
			<div className={styles.advantages_grid}></div>
		</div>
	);
};

export default Advantages;
