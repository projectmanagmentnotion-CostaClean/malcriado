/* eslint-disable no-undef */
import { spawn } from "node:child_process";

function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env,
      stdio: "inherit",
      shell: false,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code ?? "unknown"}.`));
      }
    });
  });
}

const productionEnv = {
  ...process.env,
  VITE_PUBLIC_SITE_URL: "https://malcriadobcn.com",
  VITE_RESERVATION_MODE: "contact",
  VITE_RESERVATION_API_URL: "",
  VITE_ENABLE_DEV_ROUTES: "false",
  VITE_ENABLE_ANALYTICS: "false",
  VITE_STAGING_NOINDEX: "false",
};

if (process.platform === "win32") {
  await run(
    process.env.ComSpec ?? "cmd.exe",
    ["/d", "/s", "/c", "npm run build"],
    productionEnv,
  );
} else {
  await run("npm", ["run", "build"], productionEnv);
}
await run(process.execPath, ["scripts/release/package-production.mjs"]);
