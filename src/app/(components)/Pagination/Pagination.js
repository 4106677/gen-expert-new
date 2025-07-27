// components/Pagination/Pagination.js
import React from 'react';
import styles from './Pagination.module.css';
import Image from 'next/image';

const Pagination = ({
	                    currentPage,
	                    totalPages,
	                    goToPage,
	                    goToFirstPage,
	                    goToLastPage,
	                    goToNextPage,
	                    goToPrevPage,
	                    getPageNumbers,
	                    hasNextPage,
	                    hasPrevPage,
	                    totalItems,
	                    itemsPerPage
                    }) => {
	if (totalPages <= 1) return null;

	const pageNumbers = getPageNumbers(3);
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className={styles.paginationContainer}>
			<nav className={styles.pagination}>

				{/* Кнопка "Попередня" */}
				{hasPrevPage && (
					<button
						className={styles.pageButton}
						onClick={goToPrevPage}
						title="Попередня сторінка"
					>
						<Image src="/images/chevron-right.svg" alt="Arrow down" width={24} height={24} style={{transform: 'rotate(180deg)'}}/>
					</button>
				)}

				{/* Номери сторінок */}
				{pageNumbers.map((pageNum) => (
					<button
						key={pageNum}
						className={`${styles.pageButton} ${
							pageNum === currentPage ? styles.active : ''
						}`}
						onClick={() => goToPage(pageNum)}
					>
						{pageNum}
					</button>
				))}

				{/* Кнопка "Наступна" */}
				{hasNextPage && (
					<button
						className={styles.pageButton}
						onClick={goToNextPage}
						title="Наступна сторінка"
					>
						<Image src="/images/chevron-right.svg" alt="Arrow down" width={24} height={24} />
					</button>
				)}
			</nav>
		</div>
	);
};

export default Pagination;