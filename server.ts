import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/product.ts";
const app = new Application();
const port = 5000;

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port });
