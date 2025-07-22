import React from "react";
import Link from "next/link";
import Image from "next/image";
import './customLink.css';

const CustomLink = ({ text = 'Text', href = '/', height = 48 }) => {
	const getStyles = (height) => {
		switch (height) {
			case 48:
				return {
					fontSize: `16px`,
					fontWeight: 600,
					borderRadius: `${height / 2}px`,
					padding: '13px 20px',
					display: 'inline-flex',
					alignItems: 'center',
					gap: '8px',
				};
			case 32:
				return {
					fontSize: `16px`,
					fontWeight: 500,
					borderRadius: `${height / 2}px`,
					padding: '8px 16px',
					display: 'inline-flex',
					alignItems: 'center',
					gap: '6px',
				};
			// додай ще варіанти за потреби
			default:
				return {
					fontSize: `16px`,
					padding: '10px 18px',
					borderRadius: `${height / 2}px`,
					display: 'inline-flex',
					alignItems: 'center',
					gap: '8px',
				};
		}
	};

	const styles = getStyles(height);

	return (
		<Link href={href} className='customLink' style={styles}>
			{text}
			<Image
				className='customLink-image'
				src='/images/arrow-up-right.svg'
				alt='arrow-up-right'
				width={height / 2 - 10}
				height={height / 2 - 10}
			/>
		</Link>
	);
};

export default CustomLink;
