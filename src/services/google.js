const SHEET_RANGE = "!A1:AI";

const API_KEY = "AIzaSyCh28SfuEdWGBg1S2ZdjBiX0j4PzAlcr3c";
const SHEET_ID = "1NzNqQsCbNPYqT6IyxrwDabslauegh_QQg8TSLJY7Ydo";
const RESERVE_API_KEY = "AIzaSyBl591hnUwv_D80UgQetNPiiJC5f5QfERI";
const RESERVE_SHEET_ID = "1ORLwDrBJ2ZkihqqAiByJ3zSfMkLuQW7-YydGuQdHTQo";

// Cache для зберігання даних
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 хвилин

const processSheetData = (data) => {
	return (
		data.values
			?.slice(1)
			.filter((item) => item[1]?.trim() !== '')
			.map((item) => ({
				manufacturer: item[0],
				model: item[1],
				article: item[2],
				power: item[3],
				powerUnit: item[4],
				voltage: item[5],
				voltageUnit: item[6],
				condition: item[7],
				year: item[8],
				hours: item[9],
				hoursUnit: item[10],
				price: item[11],
				priceUnit: item[12],
				price1kw: item[13],
				location: item[14],
				description: item[15],
				photo1: item[16],
				photo2: item[17],
				photo3: item[18],
				photo4: item[19],
				photo5: item[20],
				photo6: item[21],
				photo7: item[22],
				photo8: item[23],
				photo9: item[24],
				photo10: item[25],
				genType: item[28],
				bodyType: item[29],
				dataSheet1: item[30],
				dataSheet2: item[31],
				dataSheet3: item[32],
			})) || []
	);
};

// Функція для перевірки чи кеш актуальний
const isCacheValid = (cacheEntry) => {
	return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
};

// Функція для отримання даних з кешу
const getCachedData = (cacheKey) => {
	const cacheEntry = cache.get(cacheKey);
	if (isCacheValid(cacheEntry)) {
		console.log(`Data loaded from cache for ${cacheKey}`);
		return cacheEntry.data;
	}
	return null;
};

// Функція для збереження даних в кеш
const setCachedData = (cacheKey, data) => {
	cache.set(cacheKey, {
		data,
		timestamp: Date.now()
	});
};

export async function fetchGoogleSheetData(sheet) {
	const cacheKey = `${sheet}_${SHEET_ID}`;

	// Спробуємо отримати дані з кешу
	const cachedData = getCachedData(cacheKey);
	if (cachedData) {
		return cachedData;
	}

	const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet}${SHEET_RANGE}?key=${API_KEY}`;
	const reserveUrl = `https://sheets.googleapis.com/v4/spreadsheets/${RESERVE_SHEET_ID}/values/${sheet}${SHEET_RANGE}?key=${RESERVE_API_KEY}`;

	const fetchData = async (fetchUrl, apiKeyType) => {
		const response = await fetch(fetchUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log(`Data fetched successfully with ${apiKeyType} API key.`);
		return processSheetData(data);
	};

	try {
		const data = await fetchData(url, "primary");
		setCachedData(cacheKey, data);
		return data;
	} catch (error) {
		try {
			const data = await fetchData(reserveUrl, "reserve");
			setCachedData(cacheKey, data);
			return data;
		} catch (reserveError) {
			return [];
		}
	}
}

// Функція для примусового очищення кешу (якщо потрібно)
export const clearCache = () => {
	cache.clear();
	console.log('Cache cleared');
};

// Функція для отримання статусу кешу
export const getCacheStatus = () => {
	const status = {};
	cache.forEach((value, key) => {
		status[key] = {
			isValid: isCacheValid(value),
			age: Date.now() - value.timestamp,
			itemsCount: value.data.length
		};
	});
	return status;
};