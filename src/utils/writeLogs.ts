import path from "path";
import os from "os";
import fs from "fs";
import { v4 } from "uuid";

export default function writeLogs(errors: string[]) {
  const homeDir = os.homedir();
  const filePath = path.join(homeDir, ".execute.dev-logs");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  let fileName;
  if (errors.length > 0) {
    try {
      fileName = v4();
      const file = path.join(filePath, `${fileName}.json`);
      const log: any = {};
      log.timestamp = Date.now();
      log.errors = errors;
      fs.writeFileSync(file, JSON.stringify(log, null, 2));
      fs.writeFileSync(filePath + "/latest.json", JSON.stringify(log, null, 2));
      fs.appendFileSync(filePath + "/logs", `\n${fileName}`);
    } catch (err) {
      return null;
    }
    return fileName;
  }
}
