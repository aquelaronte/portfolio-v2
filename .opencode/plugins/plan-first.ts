import type { Plugin } from "@opencode-ai/plugin"

const PLAN_FIRST_INSTRUCTION = `[PLAN-FIRST WORKFLOW]
Before making ANY changes to the codebase:
1. Analyze the request and produce a detailed implementation plan
2. List every file that needs to change and the specific change
3. Wait for user approval before executing
4. Only after approval, proceed with changes`

export const PlanFirstPlugin: Plugin = async () => {
  return {
    "tui.prompt.append": async (_input, output) => {
      output.prompt = `${PLAN_FIRST_INSTRUCTION}\n\n${output.prompt}`
    },
  }
}
