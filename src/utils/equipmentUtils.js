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
				.filter(item => item && (item.article))
				.forEach(item => {
					try {
						const id = createEquipmentUrl(item.article);
						if (id) {
							allEquipmentIds.add(id);
						}
					} catch (error) {
						console.warn(`Failed to create URL for item:`, item, error);
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
		'GE-RU 0113', // Use unencoded IDs
		'GE-BF 0110', // Add this one if it's missing
	];
}