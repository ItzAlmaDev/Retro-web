import fs from "node:fs";
import path from "node:path";
import initSqlJs, { type Database as SqlDatabase } from "sql.js";

const dataDir = path.resolve(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.REGISTRATION_DB_PATH || path.join(dataDir, "retro-event.sqlite");
let database: SqlDatabase;

export type RegistrationInput = {
  fullName: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  decade: string;
  category: string;
  companionDetails?: string;
  rampLook?: string;
};

export async function initDb() {
  const SQL = await initSqlJs({ locateFile: (file) => path.resolve(process.cwd(), "node_modules/sql.js/dist", file) });
  database = fs.existsSync(dbPath) ? new SQL.Database(new Uint8Array(fs.readFileSync(dbPath))) : new SQL.Database();
  database.run(`CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    date_of_birth TEXT NOT NULL,
    phone_verified INTEGER NOT NULL DEFAULT 0,
    decade TEXT NOT NULL,
    category TEXT NOT NULL,
    companion_details TEXT,
    ramp_look TEXT,
    payment_status TEXT NOT NULL DEFAULT 'not_required',
    integration_status TEXT NOT NULL DEFAULT 'phase_2_pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  persist();
}

function persist() {
  fs.writeFileSync(dbPath, Buffer.from(database.export()));
}

function one(sql: string, params: unknown[] = []) {
  const result = database.exec(sql, params as (string | number | null)[]);
  if (!result.length || !result[0].values.length) return undefined;
  return Object.fromEntries(result[0].columns.map((column, index) => [column, result[0].values[0][index]]));
}

export function createRegistration(input: RegistrationInput) {
  const registrationCode = `RETRO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const paymentStatus = input.category === "general" ? "not_required" : "phase_2_pending";
  database.run(`INSERT INTO registrations (registration_code, full_name, phone, email, date_of_birth, phone_verified, decade, category, companion_details, ramp_look, payment_status) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)`, [registrationCode, input.fullName, input.phone, input.email || null, input.dateOfBirth, input.decade, input.category, input.companionDetails || null, input.rampLook || null, paymentStatus]);
  persist();
  return one("SELECT * FROM registrations WHERE registration_code = ?", [registrationCode]) as { registration_code: string; payment_status: string };
}

export function getRegistration(registrationCode: string) {
  return one("SELECT * FROM registrations WHERE registration_code = ?", [registrationCode]);
}
