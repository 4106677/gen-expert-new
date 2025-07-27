import { useState, useMemo } from 'react';

export const usePagination = (data, itemsPerPage = 12) => {
	const [currentPage, setCurrentPage] = useState(1);

	// Обчислюємо загальну кількість сторінок
	const totalPages = useMemo(() => {
		return Math.ceil((data?.length || 0) / itemsPerPage);
	}, [data?.length, itemsPerPage]);

	// Отримуємо дані для поточної сторінки
	const paginatedData = useMemo(() => {
		if (!data) return [];

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		return data.slice(startIndex, endIndex);
	}, [data, currentPage, itemsPerPage]);

	// Функції для навігації
	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const goToFirstPage = () => setCurrentPage(1);
	const goToLastPage = () => setCurrentPage(totalPages);
	const goToNextPage = () => goToPage(currentPage + 1);
	const goToPrevPage = () => goToPage(currentPage - 1);

	// Скидання на першу сторінку при зміні даних
	useMemo(() => {
		setCurrentPage(1);
	}, [data?.length]);

	// Генерація масиву номерів сторінок для відображення
	const getPageNumbers = (maxVisible = 5) => {
		const pages = [];
		const half = Math.floor(maxVisible / 2);

		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, currentPage + half);

		// Коригуємо діапазон якщо він менший за maxVisible
		if (end - start + 1 < maxVisible) {
			if (start === 1) {
				end = Math.min(totalPages, start + maxVisible - 1);
			} else if (end === totalPages) {
				start = Math.max(1, end - maxVisible + 1);
			}
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	return {
		currentPage,
		totalPages,
		paginatedData,
		goToPage,
		goToFirstPage,
		goToLastPage,
		goToNextPage,
		goToPrevPage,
		getPageNumbers,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
		totalItems: data?.length || 0,
		itemsPerPage
	};
};