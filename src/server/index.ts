import express from "express";
import { makeAuthMiddleware } from "../factories/makeAuthMiddleware";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { routeAdapter } from "./adapters/routeAdapters";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
  "/leads",
  middlewareAdapter(makeAuthMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.listen(3001, () => {
  console.log("Server is running on port 3001 🚀");
});
