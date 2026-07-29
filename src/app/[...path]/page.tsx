"use client";

import HomePage from "../page";

// The portal shell resolves the current pathname. This catch-all makes every
// IA path directly addressable while preserving the existing client UI state.
export default function MiliAiRoutePage() {
  return <HomePage />;
}
