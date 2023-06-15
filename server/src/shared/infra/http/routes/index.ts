import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ ok: "api is running! 🔥" });
});

export { router };