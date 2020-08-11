import { MongoClient } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
const mongoServerUrl = "mongodb://localhost:27017";
const client = new MongoClient();
client.connectWithUri(mongoServerUrl);
console.log("DB connected successfully");
const DB = client.database("deno");
export default DB;
