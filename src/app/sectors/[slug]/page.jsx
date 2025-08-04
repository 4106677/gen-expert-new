import SectorPageClient from "@/app/sectors/[slug]/SectorPageClient";
import data from '/public/locales/en/common.json'

export async function generateStaticParams() {
	const sectorIds = data?.sectors.industries

	return sectorIds.map(({slug}) => ({
		id: slug,
	}));
}

export default async function SectorPage({ params }) {
	const { id } = await params;
	return <SectorPageClient id={id} />;
}