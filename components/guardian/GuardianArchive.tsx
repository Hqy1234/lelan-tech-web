/**
 * LELAN TECHNOLOGY · Guardian Archive Client Island
 *
 * Phase 2 — Manages selected stage state for:
 *   GuardianLifecycle (Y-axis)
 *   GuardianTaskFlow (X-axis)
 *
 * Single small client island — all other Guardian components are server components.
 */
"use client";

import { useState, useCallback } from "react";
import { guardianStages, DEFAULT_STAGE_ID } from "@/content/guardian";
import { GuardianLifecycle } from "./GuardianLifecycle";
import { GuardianTaskFlow } from "./GuardianTaskFlow";

export function GuardianArchive() {
  const [selectedId, setSelectedId] = useState(DEFAULT_STAGE_ID);
  const activeStage =
    guardianStages.find((s) => s.id === selectedId) ?? guardianStages[0];

  const handleStageChange = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Y-axis: lifecycle stage rail */}
      <GuardianLifecycle
        selectedId={selectedId}
        onStageChange={handleStageChange}
      />

      {/* X-axis: task flow for selected stage */}
      <GuardianTaskFlow stage={activeStage} />
    </div>
  );
}
