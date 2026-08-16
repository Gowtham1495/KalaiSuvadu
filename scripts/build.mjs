import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const apiPath = path.join(process.cwd(), "src", "app", "api");
const tempPath = path.join(process.cwd(), ".api-temp");

try {
  if (fs.existsSync(apiPath)) {
    console.log("Temporarily hiding src/app/api during static build...");
    fs.renameSync(apiPath, tempPath);
  }

  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });

} finally {
  if (fs.existsSync(tempPath)) {
    console.log("Restoring src/app/api...");
    fs.renameSync(tempPath, apiPath);
  }
}