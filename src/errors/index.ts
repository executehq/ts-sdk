import errorTypes from "../types/errors";
export class ExecuteError extends Error {
  constructor(errors: string[], name?: string) {
    let log;
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
      errorString += `\n\nPlease report this to support@execute.dev if you need help`;
    }
    console.log(errorString);
    super(`Errors: ${errors}`);
    this.name = `${name?.toUpperCase()} ERROR` || "ExecuteError";
  }
}
