import { Router } from "express";

import { adminsRoutes } from "./admins.routes";
import { citiesRoutes } from "./cities.routes";
import { clientsRoutes } from "./clients.routes";
import { makersRoutes } from "./makers.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ ok: "api is running! 🔥" });
});

router.use("/admins", adminsRoutes);
router.use("/cities", citiesRoutes);
router.use("/clients", clientsRoutes);
router.use("/makers", makersRoutes);

export { router };