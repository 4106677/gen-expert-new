// src/utils/urlUtils.js
export const createEquipmentUrl = (id) => {
	if (!id) return '/equipment';
	const encodedId = encodeURIComponent(String(id));
	return `${encodedId}`;
};

export const decodeEquipmentId = (encodedId) => {
	if (!encodedId) return null;

	try {
		return decodeURIComponent(encodedId);
	} catch (error) {
		console.error('Error decoding ID:', error);
		return encodedId;
	}
};
