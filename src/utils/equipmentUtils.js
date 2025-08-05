// utils/equipmentUtils.js
import { createEquipmentUrl } from "@/utils/urlUtils";
import { fetchGoogleSheetData } from "@/services/google";

export async function getEquipmentData(language = 'EN') {
	try {
		const data = await fetchGoogleSheetData(language.toUpperCase());
		return data;
	} catch (error) {
		console.error('Error fetching equipment data:', error);
		return [];
	}
}

export async function getAllEquipmentIds() {
	try {
		const allEquipmentIds = new Set();
			const equipmentData = await getEquipmentData('RU');

			if (Array.isArray(equipmentData)) {
				equipmentData
					.filter(item => item && (item.id || item.article))
					.forEach(item => {
						try {
							const encodedId = createEquipmentUrl(
								item.article);
							if (encodedId) {
								allEquipmentIds.add(encodedId);
							}

							if (item.id) {
								allEquipmentIds.add(String(item.id));
								allEquipmentIds.add(encodeURIComponent(String(item.id)));
							}

						} catch (error) {
							console.warn(`Failed to create URL for item:`, item, error);
							if (item.id) {
								allEquipmentIds.add(String(item.id));
							}
						}
					});
			}

		console.log('Generated equipment IDs:', Array.from(allEquipmentIds));
		return Array.from(allEquipmentIds);
	} catch (error) {
		console.error('Error getting all equipment IDs:', error);
		return [];
	}
}

export function getStaticEquipmentIds() {
	return [
		'GE-RU%200113',
		'GE-RU 0113',
	];
}

export async function debugEquipmentIds() {
	const equipmentData = await getEquipmentData('EN');

	equipmentData.slice(0, 10).forEach(item => {
		console.log('Item:', {
			id: item.id,
			manufacturer: item.manufacturer,
			model: item.model,
			createEquipmentUrl: createEquipmentUrl(item.id || item.article, item.manufacturer || '', item.model || ''),
			encoded: encodeURIComponent(`${item.manufacturer || ''}-${item.model || ''}`.trim())
		});
	});
}