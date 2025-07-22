import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

export const Footer = ({ className }) => {
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
					<span className={styles.span}>Файли</span>
					<div className={styles.links}>
						<div className={styles.list}>
							<Link href='/'>Для бізнесу</Link>
							<Link href='/'>Для держ сектора</Link>
							<Link href='/'>Проектна заявка</Link>
						</div>
						<div className={styles.list}>
							<Link href='/'>Співпраця</Link>
							<Link href='/'>Галузі</Link>
							<Link href='/'>Обладнання</Link>
							<Link href='/'>Прорахувати проект</Link>
							<Link href='/'>Блог</Link>
							<Link href='/'>Контакти</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}