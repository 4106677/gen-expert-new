"use client"
import React from "react";
import styles from './GreenBox.module.css'
import Image from "next/image";

const GreenBox = ({text='Text', tips = []}) => {
	const tipsArray = Array.isArray(tips) ? tips : [];
	
	return (
		<div className={styles.box}>
			<div className={`${styles.container} container`}>
				<h1 className={styles.header}>{text}</h1>
				{tips.length > 0 &&
					<div className={styles.tips}>
					{tipsArray.map((item, i) => (
						<div key={i} className={styles.tips_item}>
							<Image src='/images/check-verified.svg' width={25} height={25} alt='check verified'/>
							<span>{item}</span>
						</div>
					))}
				</div>
				}
			</div>
		</div>
	);
};

export default GreenBox;