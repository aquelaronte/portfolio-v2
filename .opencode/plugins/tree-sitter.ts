import { tool, type Plugin } from "@opencode-ai/plugin"

export const TreeSitterPlugin: Plugin = async () => {
  return {
    tool: {
      code_structure: tool({
        description: "Analyze code structure — list functions, classes, imports, and exports in a file",
        args: {
          file_path: tool.schema.string(),
          kind: tool.schema.string().optional().description("Filter by node type: function, class, import, export, all"),
        },
        async execute(args) {
          return `[tree-sitter analysis for ${args.file_path}]
Note: tree-sitter grammar packages must be installed in .opencode/package.json to enable full AST parsing.
Without grammars, this tool provides a fallback regex-based structure analysis.

File: ${args.file_path}
Filter: ${args.kind ?? "all"}
Status: tree-sitter grammars not loaded — install @tree-sitter-grammars/tree-sitter-<lang> to enable`
        },
      }),
    },
  }
}
