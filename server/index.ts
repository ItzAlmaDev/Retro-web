import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createRegistration, getRegistration, initDb } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedDecades = new Set(["70s", "80s", "mix"]);
const allowedCategories = new Set(["solo", "duo", "group", "general"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function startServer() {
  await initDb();
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "32kb" }));

  app.post("/api/registrations", (req, res) => {
    const body = req.body ?? {};
    const input = {
      fullName: clean(body.fullName),
      phone: clean(body.phone),
      email: clean(body.email),
      instagram: clean(body.instagram),
      dateOfBirth: clean(body.dateOfBirth),
      decade: clean(body.decade),
      category: clean(body.category),
      companionDetails: clean(body.companionDetails),
      rampLook: clean(body.rampLook),
    };
    if (!input.fullName || !input.phone || !input.dateOfBirth || !input.decade || !input.category) {
      return res.status(400).json({ error: "Please complete all required registration fields." });
    }
    if (!allowedDecades.has(input.decade) || !allowedCategories.has(input.category)) {
      return res.status(400).json({ error: "Please choose a valid decade and entry category." });
    }
    if (input.phone.replace(/\D/g, "").length < 10) {
      return res.status(400).json({ error: "Please enter a valid phone number." });
    }
    try {
      const registration = createRegistration(input) as { registration_code: string; payment_status: string };
      return res.status(201).json({
        registrationCode: registration.registration_code,
        paymentStatus: registration.payment_status,
        phoneVerification: "phase_2_pending",
        payment: "phase_2_pending",
        wallet: "phase_2_pending",
      });
    } catch (error) {
      console.error("registration_create_failed", error);
      return res.status(500).json({ error: "We couldn’t save that registration. Please try again." });
    }
  });

  app.get("/api/registrations/:registrationCode", (req, res) => {
    const registration = getRegistration(req.params.registrationCode);
    if (!registration) return res.status(404).json({ error: "Registration not found." });
    return res.json(registration);
  });

  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => res.sendFile(path.join(staticPath, "index.html")));

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
}

startServer().catch(console.error);
