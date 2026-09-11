// Inspect the REAL Dify workflow response shape (read-only diagnostic).
// Calls Dify directly so the raw outputs can be seen before normalization.
import { readFileSync } from "node:fs";

const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const cfg = {};
for (const line of env.split(/\r?\n/)) {
  const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
  if (m) cfg[m[1]] = m[2];
}

const payload = {
  inputs: {
    age: 28,
    gender: "male",
    city: "杭州",
    stage_id: "li-adolescent",
    stage_name: "离 · 青少年",
    scenario_id: "general",
    scenario_name: "综合生活",
    completed_tasks_json: JSON.stringify(["general-t1", "general-t2"]),
    wealth_tags_json: JSON.stringify(["budget"]),
    health_tags_json: JSON.stringify(["annual-checkup-pending"]),
    travel_tags_json: "[]",
    food_tags_json: "[]",
    housing_tags_json: "[]",
    progress_completed: 2,
    progress_total: 5,
  },
  response_mode: "blocking",
  user: "lelan-guardian-web-demo",
};

const res = await fetch(`${cfg.DIFY_API_BASE_URL}/workflows/run`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${cfg.DIFY_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

console.log("HTTP", res.status);
const body = await res.json();

console.log("\n=== top-level keys ===");
console.log(Object.keys(body));
console.log("\n=== data keys ===");
console.log(body.data ? Object.keys(body.data) : "(no data)");

const outputs = body.data?.outputs || {};
console.log("\n=== outputs: key -> typeof ===");
for (const [k, v] of Object.entries(outputs)) {
  console.log(`  ${k} : ${Array.isArray(v) ? "array" : typeof v}`);
}

console.log("\n=== outputs (truncated) ===");
const pretty = JSON.stringify(outputs, null, 2);
console.log(pretty.length > 4000 ? pretty.slice(0, 4000) + "\n…(truncated)" : pretty);

// Focus on the attention items structure.
console.log("\n=== attention2_items detail ===");
const items = outputs.attention2_items;
if (Array.isArray(items)) {
  console.log("length:", items.length);
  console.log("item[0]:", JSON.stringify(items[0], null, 2));
} else if (typeof items === "string") {
  console.log("typeof string, first 800 chars:");
  console.log(items.slice(0, 800));
} else {
  console.log("type:", typeof items);
}

console.log("\n=== dimension_notes2 detail ===");
console.log(JSON.stringify(outputs.dimension_notes2, null, 2));
