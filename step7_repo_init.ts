import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "GitHubToolInitRepoTester",
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
      function: "init_repo",
      data: {
        token: "ghp_abc123", // ⚠️ Replace with process.env.GITHUB_TOKEN in production
        repo_name: "my-new-repo-52",
        private: true,
        description: "Test repo",
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
    console.log("📦 GitHub Init Repo Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
