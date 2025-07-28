import React from "react";
import styles from './GreenBox.module.css'

const GreenBox = ({text='Text'}) => {
	return (
		<div className={styles.box}>
			<div className={`${styles.container} container`}>
				<h1 className={styles.header}>{text}</h1>
			</div>
		</div>
	);
};

export default GreenBox;
