import errorTypes from "../types/errors";
import writeLogs from "../utils/writeLogs";
export class ExecuteError extends Error {
  constructor(errors: string[], name?: string) {
    const log = writeLogs(errors);
    let i = 1;
    let errorString = "";
    errorString += `\n\n$"Following errors were encountered while deploying your app:"`;
    for (const error of errors) {
      errorString += `\n${i}: ${errorTypes[error]}`;
      i++;
    }

    if (log) {
      errorString += `\n\nru \`npx @execute.dev/cli troubleshoot ${log}\` to find out more`;
    } else {
      errorString += `\n\nCouldn't write logs. Please report this to team@execute.dev`;
    }
    console.log(errorString);
    super(`Errors: ${errors}`);
    this.name = `${name?.toUpperCase()} ERROR` || "ExecuteError";
  }
}
