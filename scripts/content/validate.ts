import { validateContentModel } from "../../src/content/validation";

const result = validateContentModel();
const errors = result.issues.filter((issue) => issue.level === "error");
const warnings = result.issues.filter((issue) => issue.level === "warning");

console.log(
  `Content validation: ${errors.length} errors, ${warnings.length} warnings`,
);

for (const issue of result.issues) {
  console.log(`[${issue.level}] ${issue.area}: ${issue.message}`);
}

if (!result.ok) {
  process.exitCode = 1;
}
