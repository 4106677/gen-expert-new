import React from "react";
import styles from "./Principle.module.scss";

const Principle = ({sector: {details, images}, headers}) => {
	return (
		<div className={styles.principle} style={{backgroundImage: `url(${images.banner.desktop})`}}>
			<div className={styles.wrapper}>
				<h3 className={styles.header}>{headers.principle}</h3>
				<div className={styles.description}>
					{details.principle.map((item, index) => (
						<p className={styles.description_item} key={index}>{item}</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default Principle;
