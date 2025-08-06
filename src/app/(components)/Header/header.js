'use client';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useLanguage } from "@/app/context";
import "@/i18n";
import Image from "next/image";
import './header.css'
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
	const { t } = useTranslation("common");
	const pathname = usePathname();
	const { lang, setLang } = useLanguage();
	const [langBox, setLangBox] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
		if (typeof window !== 'undefined') {
			setWindowWidth(window.innerWidth);
			const handleResize = () => {
				const width = window.innerWidth;
				setWindowWidth(width);
				if (width >= 769 && menuOpen) {
					setMenuOpen(false);
					setDropdownOpen(false);
				}
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [menuOpen]);

	// Блокировка скролла при открытом меню
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [menuOpen]);

	const scrollToContactForm = () => {
		const maxAttempts = 50;
		let attempts = 0;

		const tryScroll = () => {
			const anchor = document.getElementById("contactForm");
			if (anchor) {
				anchor.scrollIntoView({ behavior: "smooth" });
				return;
			}

			attempts++;
			if (attempts < maxAttempts) {
				setTimeout(tryScroll, 100);
			}
		};

		tryScroll();
	};

	const handleClick = (e) => {
		e.preventDefault();
		setMenuOpen(false); // Закрываем мобильное меню

		if (pathname === "/") {
			scrollToContactForm();
		} else {
			router.push("/");
			setTimeout(() => {
				scrollToContactForm();
			}, 500);
		}
	};

	const onLangBoxClick = (event, selectedLang) => {
		event.stopPropagation();
		setLang(selectedLang);
		setLangBox(false);
		import("i18next").then((i18next) => {
			i18next.changeLanguage(selectedLang);
		});
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		if (!menuOpen) {
			setLangBox(false);
			setDropdownOpen(false);
		}
	};

	const closeMenu = () => {
		setMenuOpen(false);
		setDropdownOpen(false);
	};

	const handleDropdownClick = (e) => {
		if (windowWidth <= 768) {
			e.preventDefault();
			setDropdownOpen(!dropdownOpen);
		}
	};

	const handleNavClick = () => {
		if (windowWidth <= 768) {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (langBox && !event.target.closest('.desktop-extras .language')) {
				setLangBox(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [langBox]);

	if (!isMounted) {
		return (
			<header className="header">
				<nav className="header-nav container">
					<Link href="/" className="logoLink">
						<Image className='logoLink_image' src='/images/logo.png' width={218} height={72} alt='Genexpert Site' />
					</Link>
				</nav>
			</header>
		);
	}

	return (
		<header className="header">
			<nav className="header-nav container">
				<Link href="/" className="logoLink">
					<Image className='logoLink_image' src='/images/logo.png' width={218} height={72} alt='Genexpert Site' />
				</Link>

				{/* Mobile menu button */}
				<button className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<div className={`nav-container ${menuOpen ? 'open' : ''}`}>
					{/* Mobile close button */}
					{/*<button className="mobile-close-btn" onClick={closeMenu}>*/}
					{/*	✕*/}
					{/*</button>*/}

					<ul className="nav-list">
						<li className={`dropdown ${dropdownOpen ? 'mobile-open' : ''}`}>
							<Link href="/cooperation" onClick={handleDropdownClick}>
								{t("menu.cooperation")}
								<Image
									src="/images/chevron-down.svg"
									alt="Arrow down"
									width={11}
									height={6}
									className="arrow-icon"
								/>
							</Link>

							<ul className="dropdown-menu">
								<li>
									<Link href="/sectors/public" onClick={handleNavClick}>
										{t("sectors.public.title")}
									</Link>
								</li>
								<li>
									<Link href="/sectors/private" onClick={handleNavClick}>
										{t("sectors.private.title")}
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link href="/sectors" onClick={handleNavClick}>
								{t("menu.sectors")}
							</Link>
						</li>
						<li>
							<Link href="/equipment" onClick={handleNavClick}>
								{t("menu.equipment")}
							</Link>
						</li>
						<li>
							<Link href="/blog" onClick={handleNavClick}>
								{t("menu.blog")}
							</Link>
						</li>
						<li>
							<Link href="/calculator" onClick={handleNavClick}>
								{t("menu.calculate")}
							</Link>
						</li>
					</ul>

					{/* Mobile extras */}
					<div className="mobile-extras">
						<div className="mobile-contacts">
							<a href="tel:+380732370045">+38(073)237-00-45</a>
							<a href="mailto:info@genexpert.com.ua">info@genexpert.com.ua</a>
						</div>

						<div className="mobile-language">
							<Image
								src="/images/globe-new.svg"
								alt="Globe icon"
								width={20}
								height={20}
							/>
							<div className="mobile-language-selector">
								<span
									className={lang === 'ru' ? 'active' : ''}
									onClick={(e) => onLangBoxClick(e, "ru")}
								>
									RU
								</span>
								<span
									className={lang === 'ua' ? 'active' : ''}
									onClick={(e) => onLangBoxClick(e, "ua")}
								>
									UA
								</span>
								<span
									className={lang === 'en' ? 'active' : ''}
									onClick={(e) => onLangBoxClick(e, "en")}
								>
									EN
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Desktop extras */}
				<div className="desktop-extras">
					<Link href="/#contactForm" onClick={handleClick}>
						<button className="btn btn_green" style={{ height: '41px' }}>
							{t("menu.callback")}
						</button>
					</Link>
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
						{langBox ? (
							<ul className="selector" style={{ display: langBox ? "flex" : "none" }}>
								<li onClick={(e) => onLangBoxClick(e, "ru")}>RU</li>
								<li onClick={(e) => onLangBoxClick(e, "ua")}>UA</li>
								<li onClick={(e) => onLangBoxClick(e, "en")}>EN</li>
							</ul>
						) : (
							<span className="rounder">{lang.toUpperCase()}</span>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}