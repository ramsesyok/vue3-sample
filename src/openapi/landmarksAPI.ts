import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/openapi/landmarks";

const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const body = res.headers.get("content-type")?.includes("json")
        ? await res.clone().json()
        : await res.clone().text();
      throw new Error(body);
    }
    return undefined;
  },
};


const landmarksAPI = createClient<paths>({ baseUrl: "http://127.0.0.1:8081" });

landmarksAPI.use(throwOnError);

export default landmarksAPI;