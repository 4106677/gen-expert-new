export async function generateStaticParams() {
	return [
		{ id: '1' },
		{ id: '2' },
		{ id: '3' },
	];
}


export default function EquipmentDetailPage({ params }) {
	const { id } = params;

	return (
		<div>
			<h1>Обладнання ID: {id}</h1>
			{/* Тут можна вивести інфу по ID */}
		</div>
	);
}
