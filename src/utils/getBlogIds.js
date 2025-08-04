export function getAllBlogIds() {
	const allIds = new Set();
	const languages = [ru];

	languages.forEach(lang => {
		if (lang.blog && lang.blog.data && Array.isArray(lang.blog.data)) {
			lang.blog.data.forEach(item => {
				if (item.href) {
					allIds.add(item.href);
				}
			});
		}
	});

	return Array.from(allIds);
}