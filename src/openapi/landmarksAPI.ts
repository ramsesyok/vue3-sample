import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/openapi/landmarks";
import {NotFoundError,BadRequestError,ServerError} from "@/openapi/exceptions"


const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const body = res.headers.get("content-type")?.includes("json")
        ? await res.clone().json()
        : await res.clone().text();
        if (res.status == 400) {
          throw new BadRequestError(body)
        }
        if (res.status == 404) {
          throw new NotFoundError(body)
        }
        if (res.status == 500) {
          throw new ServerError(body)
        }
        throw new Error(body);
    }
    return undefined;
  },
};


const landmarksAPI = createClient<paths>({ baseUrl: "http://127.0.0.1:8081" });

landmarksAPI.use(throwOnError);

export default landmarksAPI;