import fetch from "node-fetch";
// const apiUrl = "https://api.execute.dev/v1";
const apiUrl = "http://localhost:3000/v1";

export default class apiClient {
  accessKey: string;
  secretKey: string;
  constructor(accessKey: string, secretKey: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }
  async get(path: string, query?: any, body?: any) {
    return await api(
      "GET",
      path.replace(".", "/"),
      this.accessKey,
      this.secretKey,
      query,
      body
    );
  }
  async post(path: string, query?: any, body?: any) {
    return await api(
      "POST",
      path.replace(".", "/"),
      this.accessKey,
      this.secretKey,
      query,
      body
    );
  }
  async put(path: string, query?: any, body?: any) {
    return await api(
      "PUT",
      path.replace(".", "/"),
      this.accessKey,
      this.secretKey,
      query,
      body
    );
  }
  async delete(path: string, query?: any, body?: any) {
    return await api(
      "DELETE",
      path.replace(".", "/"),
      this.accessKey,
      this.secretKey,
      query,
      body
    );
  }
}

async function api(
  method: string,
  endpoint: string,
  accessKey: string,
  secretKey: string,
  query?: any,
  body?: any
): Promise<any> {
  let requestOptions: any = {
    method: method,
    body: JSON.stringify(body),
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      "x-access-key": accessKey,
      "x-secret-key": secretKey,
    },
  };
  let finalQuery = "";
  if (query) {
    Object.keys(query).forEach((key) => {
      finalQuery += `${key}=${query[key]}&`;
    });
  }

  let url: string = `${apiUrl}/${endpoint}${
    finalQuery ? `?${finalQuery}` : ""
  }`;
  const x = await fetch(url, requestOptions)
    .then(async (response: any) => {
      return { value: await response.json() };
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
  return x;
}
