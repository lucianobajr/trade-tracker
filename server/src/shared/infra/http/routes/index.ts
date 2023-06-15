import { Router } from "express";

import { adminsRoutes } from "./admins.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ ok: "api is running! 🔥" });
});

router.use("/admins", adminsRoutes);

export { router };