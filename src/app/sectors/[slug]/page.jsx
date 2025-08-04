import SectorPageClient from "@/app/sectors/[slug]/SectorPageClient";
import data from '/public/locales/en/common.json'

export async function generateStaticParams() {
	try {
		const sectorIds = data?.sectors?.industries || [];

		return sectorIds.map(({slug}) => ({
			slug: slug,
		}));
	} catch (error) {
		console.error('Error generating static params for sectors:', error);
		return [];
	}
}

export default async function SectorPage({ params }) {
	const { slug } = await params;
	return <SectorPageClient slug={slug} />;
}