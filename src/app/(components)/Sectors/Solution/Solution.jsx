import React from "react";
import styles from "./Solution.module.scss";
import Image from "next/image";

const Solution = ({sector: {details, images}, headers}) => {
	return (
		<div className={styles.solution}>
			<div className="">
				<h2 className={styles.header}>{headers.solution} <span className={styles.header_span}>Genexpert</span></h2>
				{details.solution.map((item, index) => (
					<p className={styles.description} key={item + index}>{item}</p>
				))}
			</div>
			<Image
				className={styles.image}
				src={images.solution}
				alt={`${headers.solution} Genexpert`}
				width={525}
				height={295} />
		</div>
	);
};

export default Solution;
