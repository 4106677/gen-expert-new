"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchGoogleSheetData } from "@/services/google";
import { useLanguage } from "@/app/context";

export const SheetDataContext = createContext(null);

export function SheetDataProvider({ children }) {
	const { lang } = useLanguage(); // Отримуємо мову з контексту
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [cache, setCache] = useState(new Map());

	// Функція для отримання даних з кешем
	const fetchData = async (language = lang) => {
		const cacheKey = language.toUpperCase();

		// Перевіряємо кеш
		if (cache.has(cacheKey)) {
			const cachedData = cache.get(cacheKey);
			setData(cachedData);
			return cachedData;
		}

		setLoading(true);
		setError(null);

		try {
			const sheetData = await fetchGoogleSheetData(cacheKey);

			// Зберігаємо в кеш
			setCache(prev => new Map(prev).set(cacheKey, sheetData));
			setData(sheetData);

			return sheetData;
		} catch (err) {
			console.error("Failed to fetch sheet data:", err.message);
			setError(err.message);
			setData([]);
			return [];
		} finally {
			setLoading(false);
		}
	};

	// Функція для отримання одного елемента по ID
	const getItemById = (id) => {
		if (!data) return null;
		return data.find(item => item.id === id || item.id === parseInt(id));
	};

	// Функція для очищення кешу (якщо потрібно)
	const clearCache = () => {
		setCache(new Map());
		setData(null);
	};

	// Автоматично завантажуємо дані при зміні мови
	useEffect(() => {
		fetchData(lang);
	}, [lang]);

	const value = {
		data,
		loading,
		error,
		fetchData,
		getItemById,
		clearCache,
		cache: cache.size > 0 // індикатор наявності кешу
	};

	return (
		<SheetDataContext.Provider value={value}>
			{children}
		</SheetDataContext.Provider>
	);
}

export const useSheetData = () => {
	const context = useContext(SheetDataContext);
	if (!context) {
		throw new Error("useSheetData must be used within a SheetDataProvider");
	}
	return context;
};