import { Router } from "express";

import { adminsRoutes } from "./admins.routes";
import { citiesRoutes } from "./city.routes";
import { clientsRoutes } from "./clients.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ ok: "api is running! 🔥" });
});

router.use("/admins", adminsRoutes);
router.use("/cities", citiesRoutes);
router.use("/clients", clientsRoutes);

export { router };