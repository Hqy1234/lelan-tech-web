// Live Dify test through the real adapter, with explicit UTF-8 (avoids the
// PowerShell console mangling CJK when building the request body).
const ADAPTER = "http://127.0.0.1:8787";

const personaA = {
  identity: { age: 28, gender: "male", city: "杭州" },
  stage: { id: "li-adolescent", name: "离 · 青少年" },
  scenario: { id: "general", name: "综合生活" },
  completedTaskIds: ["general-t1", "general-t2"],
  dimensionTags: {
    wealth: ["budget"],
    health: ["annual-checkup-pending"],
    travel: [],
    food: [],
    housing: [],
  },
  progressCompleted: 2,
  progressTotal: 5,
};

const personaB = {
  identity: { age: 36, gender: "female", city: "杭州" },
  stage: { id: "dui-young-adult", name: "兑 · 青年期" },
  scenario: { id: "startup", name: "创业" },
  completedTaskIds: ["startup-t1", "startup-t2", "startup-t3", "startup-t4"],
  dimensionTags: {
    wealth: ["business-account", "tax-attention"],
    health: ["sleep-attention"],
    travel: [],
    food: ["irregular-meals"],
    housing: [],
  },
  progressCompleted: 4,
  progressTotal: 8,
};

async function run(label, payload) {
  const t0 = Date.now();
  const res = await fetch(`${ADAPTER}/guardian/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const ms = Date.now() - t0;
  let body;
  try {
    body = await res.json();
  } catch {
    body = "(non-JSON)";
  }
  console.log(`\n=== ${label} ===`);
  console.log(`HTTP ${res.status}  (${ms}ms)`);
  console.log(JSON.stringify(body, null, 2));
  return { status: res.status, body };
}

(async () => {
  const a = await run("Persona A (28M · 离 · 青少年 · general)", personaA);
  const b = await run("Persona B (36F · 兑 · 青年期 · startup)", personaB);

  // Leakage guard on real responses.
  const blob = JSON.stringify([a.body, b.body]);
  console.log("\n=== leakage checks ===");
  console.log("contains API key      :", /app-[A-Za-z0-9]{10,}/.test(blob));
  console.log("contains Bearer       :", /Bearer/i.test(blob));
  console.log("contains Dify field    :", /summary2|attention2_items|dimension_notes2|disclaimer2/.test(blob));
  console.log("contains risk language :", /risk_score|高风险|低风险|\d+%/.test(blob));
})();
