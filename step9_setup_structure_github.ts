import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "GitHubToolSetupFolderStructureTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the github_tool
  const inputData = {
    input_data: {
      function: "setup_folder_structure",
      data: {
        github_token: "GITHUB_TOKEN", // ⚠️ Replace with process.env.GITHUB_TOKEN in production
        repo_name: "https://github.com/aayush598/my-52",
        structure: {
          name: "chatbot-project",
          type: "folder",
          children: [
            { name: "assets", type: "folder", children: [] },
            { name: "utils", type: "folder", children: [] },
            {
              name: "src",
              type: "folder",
              children: [
                { name: "index2.html", type: "file" },
                { name: "styles.css", type: "file" },
                { name: "app.js", type: "file" },
              ],
            },
            {
              name: "docs",
              type: "folder",
              children: [{ name: "README.md", type: "file" }],
            },
            {
              name: "__tests__",
              type: "folder",
              children: [{ name: "app.test.js", type: "file" }],
            },
            { name: ".dockerignore", type: "file" },
            { name: ".gitignore", type: "file" },
            { name: ".eslintrc.json", type: "file" },
            { name: ".prettierrc.json", type: "file" },
            { name: ".dockerignore", type: "file" },
            { name: "Dockerfile", type: "file" },
          ],
        },
      },
    },
  };

  // Step 4: Call the github_tool
  try {
    const result = await client.callTool({
      name: "github_tool",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📂 GitHub Tool Setup Folder Structure Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
