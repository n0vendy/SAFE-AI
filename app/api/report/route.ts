import { sections } from "@/lib/survey";

const KNOWN_IDS = new Set(sections.flatMap((s) => s.questions.flatMap((q) => [q.id, `${q.id}_other`])));
const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ error: "Report is too large." }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid report." }, { status: 400 });
  }

  const answers = (body as { answers?: unknown })?.answers;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return Response.json({ error: "Invalid report." }, { status: 400 });
  }

  // Keep only fields the survey defines, so nothing extra (or identifying) slips through.
  const clean = Object.fromEntries(Object.entries(answers).filter(([key]) => KNOWN_IDS.has(key)));
  if (Object.keys(clean).length === 0) {
    return Response.json({ error: "Please answer at least one question before submitting." }, { status: 400 });
  }

  // Store with a coarse month only (no IP, no exact timestamp, no user agent).
  const report = { answers: clean, month: new Date().toISOString().slice(0, 7) };
  // TODO: persist `report` to a database (e.g. Vercel Postgres / Neon). Nothing is stored yet.
  void report;

  const receipt = `SAFE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  return Response.json({ ok: true, receipt });
}
