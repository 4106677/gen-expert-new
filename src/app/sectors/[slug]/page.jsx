import SectorPageClient from "@/app/sectors/[slug]/SectorPageClient";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function generateStaticParams() {
	try {
		// Читаем файл через file system
		const filePath = join(process.cwd(), 'public', 'locales', 'en', 'common.json');
		const fileContents = readFileSync(filePath, 'utf8');
		const data = JSON.parse(fileContents);

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