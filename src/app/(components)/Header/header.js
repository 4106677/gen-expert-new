'use client';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useLanguage } from "@/app/context";
import "@/i18n";
import Image from "next/image";
import { Footer } from "@/app/(components)/Footer/footer";
import footerStyles from "@/app/(components)/Footer/footer.module.css";
import './header.css'

export default function Header() {
	const { t } = useTranslation("common");
	const { lang, setLang } = useLanguage();
	const [langBox, setLangBox] = useState(false);
	const [mobileLangBox, setMobileLangBox] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

	useEffect(() => {
		setIsMounted(true);

		if (typeof window !== 'undefined') {
			setWindowWidth(window.innerWidth);

			// Close menu when screen size changes to desktop
			const handleResize = () => {
				setWindowWidth(window.innerWidth);
				if (window.innerWidth >= 1250 && menuOpen) {
					setMenuOpen(false);
				}
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [menuOpen]);

	const onLangBoxClick = (event, selectedLang) => {
		event.stopPropagation();
		setLang(selectedLang);
		setLangBox(false);
		setMobileLangBox(false);
		import("i18next").then((i18next) => {
			i18next.changeLanguage(selectedLang);
		});
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		// When opening the menu, close the language selector
		if (!menuOpen) {
			setLangBox(false);
			setMobileLangBox(false);
		}
	};

	// Close menus when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Close mobile language selector when clicking outside
			if (mobileLangBox && !event.target.closest('.nav-container .language')) {
				setMobileLangBox(false);
			}

			// Close desktop language selector when clicking outside
			if (langBox && !event.target.closest('.desktop-extras .language')) {
				setLangBox(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [langBox, mobileLangBox]);

	if (!isMounted) {
		return (
			<header className="header">

			</header>
		);
	}

	return (
		<header className="header">
			<nav className="header-nav container">
				<Link href="/" className="logoLink">
					<Image src='/images/logo.png' width={218} height={72} alt='Genexpert Site'></Image>
				</Link>

				{/* Burger Menu Button (shows on small screens) */}
				<button
					className="burger-btn"
					onClick={toggleMenu}
					style={{position: menuOpen ? "fixed" : "absolute"}}
					aria-label="Toggle menu"
				>
					<span className={`burger-bar ${menuOpen ? 'open' : ''}`}></span>
					<span className={`burger-bar ${menuOpen ? 'open' : ''}`}></span>
					<span className={`burger-bar ${menuOpen ? 'open' : ''}`}></span>
				</button>

				{/* Desktop Nav and Mobile Nav Menu */}
				<div className={`nav-container ${menuOpen ? 'open' : ''}`}>
					{/* Mobile-only language selector */}
					<div className="language" onClick={(e) => {
						e.stopPropagation();
						setMobileLangBox(!mobileLangBox);
					}}>
						<Image
							aria-hidden
							src="/globe-black.svg"
							alt="Globe icon"
							width={24}
							height={24}
						/>
						<span className="rounder">{lang.toUpperCase()}</span>
						<ul className="selector" style={{ display: mobileLangBox ? "flex" : "none" }}>
							<li className='selector_li' onClick={(e) => onLangBoxClick(e, "ru")}>RU</li>
							<li className='selector_li' onClick={(e) => onLangBoxClick(e, "ua")}>UA</li>
							<li className='selector_li' onClick={(e) => onLangBoxClick(e, "en")}>EN</li>
						</ul>
					</div>

					<ul className="nav-list">
						<li className="dropdown">
							<Link href="/cooperation" onClick={() => setMenuOpen(false)}>{t("menu.cooperation")}
								<Image src="/images/chevron-down.svg" alt="Arrow down" width={11} height={6} className="arrow-icon"/>
							</Link>

							<ul className="dropdown-menu">
								<li><Link href="/cooperation/subpage1" onClick={() => setMenuOpen(false)}>Підсторінка
									1</Link></li>
								<li><Link href="/cooperation/subpage2" onClick={() => setMenuOpen(false)}>Підсторінка
									2</Link></li>
							</ul>
						</li>
						<li><Link href="/sectors" onClick={() => setMenuOpen(false)}>{t("menu.sectors")}</Link></li>
						<li><Link href="/equipment" onClick={() => setMenuOpen(false)}>{t("menu.equipment")}</Link></li>
						<li><Link href="/blog" onClick={() => setMenuOpen(false)}>{t("menu.blog")}</Link></li>
						{/*<li><Link href="/why" onClick={() => setMenuOpen(false)}>{t("menu.why")}</Link></li>*/}
						{/*<li><Link href="/useful" onClick={() => setMenuOpen(false)}>{t("menu.useful")}</Link></li>*/}
						<li><Link href="/calculate" onClick={() => setMenuOpen(false)}>{t("menu.calculate")}</Link>
						{/*<li><Link href="/calculator" onClick={() => setMenuOpen(false)}>{t("menu.calculator")}</Link>*/}
						</li>

					</ul>

					<div className="mobile-extras">
						{/* Использование Footer с классом burgerFooter */}
						<Footer className={footerStyles.burgerFooter} />
					</div>
				</div>

				{/* Desktop-only language and contacts */}
				<div className="desktop-extras">
					<button className='btn btn_green' style={{height: '41px'}}>{t("menu.callback")}</button>
					<div className="contacts">
						<a href="tel:+380732370045">+38(073)237-00-45</a>
						<a href="mailto:info@genexpert.com.ua">info@genexpert.com.ua</a>
					</div>
					<div className="language" onClick={(e) => {
						e.stopPropagation();
						setLangBox(!langBox);
					}}>
						<Image
							aria-hidden
							src="/images/globe-new.svg"
							alt="Globe icon"
							width={24}
							height={24}
						/>
						<span className="rounder">{lang.toUpperCase()}</span>
						<ul className="selector" style={{display: langBox ? "flex" : "none"}}>
							<li onClick={(e) => onLangBoxClick(e, "ru")}>RU</li>
							<li onClick={(e) => onLangBoxClick(e, "ua")}>UA</li>
							<li onClick={(e) => onLangBoxClick(e, "en")}>EN</li>
						</ul>
					</div>


				</div>
			</nav>
		</header>
	);
}