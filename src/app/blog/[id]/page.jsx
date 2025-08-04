// page.jsx (серверный компонент)
import BlogPageClient from './BlogPageClient';
import {getAllBlogIds} from "@/utils/getBlogIds";

export async function generateStaticParams() {
	const blogIds = getAllBlogIds();

	return blogIds.map((id) => ({
		id: id,
	}));
}

export default async function BlogPage({ params }) {
	const { id } = await params;
	return <BlogPageClient id={id} />;
}