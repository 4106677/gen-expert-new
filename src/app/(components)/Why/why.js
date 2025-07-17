import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./why.module.css";
import {useLanguage} from "@/app/context";
import Link from "next/link";

export const Why = () => {
	const { t } = useTranslation("common");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className={styles.why}>
			<h2>{isClient ? t("why_main_page.title") : "..."}</h2>
			<ul className={styles.list}>
				{isClient &&
					Object.values(t("why_main_page.list", { returnObjects: true }) || [])?.map(
						({ id, title, text }, index) => (
							<li key={index} className={styles.listItem}>
								{id !== 7 ?
									<>
										<div></div>
										<p>
											<span className={styles.listItem_span}>{title}</span> {text}
										</p>
									</> :
									<>
										<div></div>
										<p>
											🤝 <span className={styles.listItem_span}><Link href="/cooperation" className={styles.listItem_span__link}>{title}</Link></span> {text}
										</p>
									</>
								}

							</li>
						)
					)}
			</ul>
		</div>
	);
};
