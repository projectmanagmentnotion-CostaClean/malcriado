import { buildContentReport } from "../../src/content/validation";

const report = buildContentReport();

console.log("Editorial content report");
console.log(`ok: ${report.ok}`);
console.log(`sources: ${report.sources}`);
console.log(`scenes: ${report.scenes}`);
console.log(`menuCategories: ${report.menuCategories}`);
console.log(`menuItems: ${report.menuItems}`);
console.log(`legalPages: ${report.legalPages}`);
console.log(`activeOffers: ${report.activeOffers}`);
console.log(`errors: ${report.errors}`);
console.log(`warnings: ${report.warnings}`);
