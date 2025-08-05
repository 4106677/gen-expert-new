// src/app/equipment/[id]/page.js
import EquipmentDetailPageClient from "@/app/equipment/[id]/EquipmentDetailPageClient";
import { getAllEquipmentIds, getStaticEquipmentIds } from "@/utils/equipmentUtils";

export async function generateStaticParams() {
	try {
		console.log('Generating static params for equipment...');

		// Получаем динамические ID
		const dynamicIds = await getAllEquipmentIds();

		// Получаем статические ID (для проблемных случаев)
		const staticIds = getStaticEquipmentIds();

		// Объединяем все ID
		const allIds = [...new Set([...dynamicIds, ...staticIds])];

		console.log(`Found ${dynamicIds.length} dynamic IDs and ${staticIds.length} static IDs`);
		console.log('All equipment IDs:', allIds);

		if (allIds.length === 0) {
			console.warn('No equipment IDs found');
			return [];
		}

		return allIds.map((id) => ({
			id: id,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		// Fallback: используем только статические ID
		const fallbackIds = getStaticEquipmentIds();
		return fallbackIds.map(id => ({ id }));
	}
}

export default async function EquipmentDetailPage({ params }) {
	const { id } = await params;
	return <EquipmentDetailPageClient id={id} />;
}