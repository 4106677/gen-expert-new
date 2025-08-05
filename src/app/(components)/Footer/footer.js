'use client';
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const Footer = ({ className }) => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation('common');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<footer className={styles.footer}>
			<div className={`${styles.container} container`}>
				<div>
					<Link href="/" >
						<Image className={styles.logo} src='/images/logo.png' width={217} height={54} alt='Genexpert Site'></Image>
					</Link>
					<div className={styles.social}>
						<a
							href="https://t.me/genexpert_ua"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								aria-hidden
								src="/images/telegram.svg"
								alt="telegram icon"
								width={30}
								height={30}
							/>
						</a>
						<a
							href="https://www.instagram.com/genexpert_ua/?igsh=ZDVkdmIzNmIyM2d1&utm_source=qr#"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								aria-hidden
								src="/images/instagram.svg"
								alt="instagram icon"
								width={30}
								height={30}
							/>
						</a>
					</div>
				</div>
				<div >
					<span className={styles.span}>{t('footer.files')}</span>
					<div className={styles.links}>
						<div className={styles.list}>
							<Link href='/sectors/private'>{t('footer.business')}</Link>
							<Link href='/sectors/public'>{t('footer.public')}</Link>
							<Link href='/calculator'>{t('footer.project')}</Link>
						</div>
						<div className={styles.list}>
							<Link href='/cooperation'>{t('footer.cooperation')}</Link>
							<Link href='/sectors'>{t('footer.sectors')}</Link>
							<Link href='/equipment'>{t('footer.equipment')}</Link>
							<Link href='/calculator'>{t('footer.calculate')}</Link>
							<Link href='/blog'>{t('footer.blog')}</Link>
							{/*<Link href='/'>{t('footer.contacts')}</Link>*/}
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}