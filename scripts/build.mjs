import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const pathsToHide = [
  {
    original: path.join(process.cwd(), "src", "app", "api"),
    temp: path.join(process.cwd(), ".api-temp"),
    label: "src/app/api",
  },
  {
    original: path.join(process.cwd(), "src", "app", "keystatic"),
    temp: path.join(process.cwd(), ".keystatic-temp"),
    label: "src/app/keystatic",
  },
];

try {
  for (const entry of pathsToHide) {
    if (fs.existsSync(entry.original)) {
      console.log(`Temporarily hiding ${entry.label} during static build...`);
      fs.renameSync(entry.original, entry.temp);
    }
  }

  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });

} finally {
  for (const entry of pathsToHide) {
    if (fs.existsSync(entry.temp)) {
      console.log(`Restoring ${entry.label}...`);
      fs.renameSync(entry.temp, entry.original);
    }
  }
}