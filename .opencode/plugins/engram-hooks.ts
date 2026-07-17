import type { Plugin } from "@opencode-ai/plugin"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

function parseProjectName(directory: string): string | null {
  const agentsPath = join(directory, "AGENTS.md")
  if (!existsSync(agentsPath)) return null
  const content = readFileSync(agentsPath, "utf-8")
  const match = content.match(/engram_project:\s*["']?([^\s"']+)["']?/)
  return match?.[1] ?? null
}

let cachedProjectName: string | null = null

export const EngramHooksPlugin: Plugin = async ({ $, directory }) => {
  cachedProjectName ??= parseProjectName(directory)

  async function engramContext(): Promise<string> {
    if (!cachedProjectName) return ""
    try {
      const result = await $`engram context ${cachedProjectName}`
      return result.text()
    } catch {
      return ""
    }
  }

  async function engramSave(title: string, message: string): Promise<void> {
    if (!cachedProjectName) return
    try {
      await $`engram save ${title} ${message}`
    } catch {
      // silent
    }
  }

  return {
    "tui.prompt.append": async (_input, output) => {
      const ctx = await engramContext()
      if (ctx) {
        output.prompt = `[ENGRAM CONTEXT for project: ${cachedProjectName}]\n${ctx}\n\n${output.prompt}`
      }
    },

    "tool.execute.after": async (input) => {
      if (cachedProjectName && (input.tool === "edit" || input.tool === "write")) {
        const title = `Modified ${input.args.filePath ?? "unknown file"}`
        const summary = `Tool: ${input.tool}\nFile: ${input.args.filePath ?? "unknown"}\nAction: ${input.args.oldString ? "edit" : "write"}`
        await engramSave(title, summary)
      }
    },
  }
}
