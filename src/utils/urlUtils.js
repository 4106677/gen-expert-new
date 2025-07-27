// src/utils/urlUtils.js

/**
 * Створює безпечний URL для equipment page з правильним кодуванням ID
 * @param {string|number} id - ID обладнання
 * @returns {string} - Закодований URL
 */
export const createEquipmentUrl = (id) => {
	if (!id) return '/equipment';

	// Кодуємо ID для використання в URL
	const encodedId = encodeURIComponent(String(id));
	return `/equipment/${encodedId}`;
};

/**
 * Декодує ID з URL параметра
 * @param {string} encodedId - Закодований ID з URL
 * @returns {string} - Декодований ID
 */
export const decodeEquipmentId = (encodedId) => {
	if (!encodedId) return null;

	try {
		return decodeURIComponent(encodedId);
	} catch (error) {
		console.error('Error decoding ID:', error);
		return encodedId; // Повертаємо оригінальний ID у випадку помилки
	}
};

/**
 * Перевіряє, чи є ID валідним для використання в URL
 * @param {string|number} id - ID для перевірки
 * @returns {boolean} - true якщо ID валідний
 */
export const isValidEquipmentId = (id) => {
	return id !== null && id !== undefined && String(id).trim() !== '';
};