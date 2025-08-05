// src/utils/urlUtils.js
export const createEquipmentUrl = (id) => {
	if (!id) return '/equipment';
	// Don't encode here - Next.js will handle URL encoding automatically
	return String(id);
};

export const decodeEquipmentId = (encodedId) => {
	if (!encodedId) return null;

	// Next.js already decodes URL parameters, so we might not need to decode again
	// But let's handle both cases
	try {
		// If it's still encoded, decode it
		if (encodedId.includes('%')) {
			return decodeURIComponent(encodedId);
		}
		// If it's already decoded, return as is
		return encodedId;
	} catch (error) {
		console.error('Error decoding ID:', error);
		return encodedId;
	}
};