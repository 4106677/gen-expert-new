// src/app/equipment/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import { useSheetData } from "@/context/SheetDataContext";
import { decodeEquipmentId, createEquipmentUrl } from "@/utils/urlUtils";
import Fields from "@/app/(components)/Fields/fields";
import Consultation from "@/app/(components)/MainPage/Consultation/consultation";
import Tips from "@/app/(components)/MainPage/Tips/tips";

export default function EquipmentDetailPage() {
	const { id: rawId } = useParams();
	const router = useRouter();
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { data, loading, error, getItemById, fetchData } = useSheetData();

	const [item, setItem] = useState(null);
	const [itemLoading, setItemLoading] = useState(true);

	const decodedId = rawId ? decodeEquipmentId(rawId) : null;

	useEffect(() => {
		const loadItem = async () => {
			setItemLoading(true);
			if (!data) {
				await fetchData(lang);
			}
			const foundItem = getItemById(decodedId);

			if (!foundItem) {
				setItem(null);
				setItemLoading(false);
				return;
			}

			setItem(foundItem);
			setItemLoading(false);
		};

		if (decodedId && lang) {
			loadItem();
		}
	}, [decodedId, data, lang, getItemById, fetchData]);

	// Loading state
	if (loading || itemLoading) {
		return (
			<div >
				<div >
					<h2>Loading...</h2>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div >
				<div >
					<h2>Error: {error}</h2>
					<button onClick={() => router.push('/equipment')}>
						Повернутись до каталогу
					</button>
				</div>
			</div>
		);
	}

	// Item not found
	if (!item) {
		return (
			<div >
				<div >
					<h2>Обладнання не знайдено</h2>
					<p>Обладнання з ID "{decodedId}" не існує або було видалено.</p>
					<button onClick={() => router.push('/equipment')}>
						Повернутись до каталогу
					</button>
				</div>
			</div>
		);
	}

	console.log(item)

	return (
		<div >
			<Consultation/>
			<Tips header='Інші варінти установок'/>
			<Fields />
		</div>
	);
}