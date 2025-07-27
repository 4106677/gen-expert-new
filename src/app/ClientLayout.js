// src/app/ClientLayout.js
'use client';
import { LanguageProvider } from "./context";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useState } from "react";
import {SheetDataProvider} from "@/context/SheetDataContext";


export default function ClientLayout({ children }) {
	const [showModal, setShowModal] = useState(false);
	const [showContactsModal, setContactsShowModal] = useState(false);

	return (
		<I18nextProvider i18n={i18n}>
			<LanguageProvider modal={showModal} setModal={setShowModal}>
				<SheetDataProvider>
					{children}
				</SheetDataProvider>
			</LanguageProvider>
		</I18nextProvider>
	);
}