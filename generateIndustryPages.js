const fs = require("fs");
const path = require("path");

const industries = [
	{ slug: "silgosp" },
	{ slug: "teplytsi" },
	{ slug: "kharchova" },
	{ slug: "vidhody" },
	{ slug: "promyslovist" },
	{ slug: "khimiya" },
	{ slug: "tsod" },
	{ slug: "lohistyka" },
	{ slug: "enerhetyka" },
	{ slug: "okhorona" },
	{ slug: "hoteli" },
	{ slug: "transport" },
	{ slug: "hirnytstvo" },
	{ slug: "inshi" },
	{ slug: "derzhava" }
];

const baseDir = path.join(__dirname, "src", "app", "sectors");

industries.forEach(({ slug }) => {
	const folderPath = path.join(baseDir, slug);
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}

	const componentName = slug.charAt(0).toUpperCase() + slug.slice(1);

	const fileContent = `export default function ${componentName}Page() {
  return (
    <div>
      <h1>${componentName}</h1>
      <p>This is the "${slug}" industry page.</p>
    </div>
  );
}
`;

	fs.writeFileSync(path.join(folderPath, "page.jsx"), fileContent);
});
