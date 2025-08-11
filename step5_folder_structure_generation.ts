import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "FolderStructureGenerationTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the folder_structure_generation tool
  const inputData = {
    input_data: {
      description: "Chatbot project for customer service",
      features: ["user authentication", "real-time messaging", "file sharing"],
      tech_stack: ["html", "css", "javascript"],
      preferences: {
        include_docs: true,
        include_tests: true,
        include_docker: true,
        include_ci_cd: false,
        custom_folders: ["assets", "utils"],
        framework_specific: false,
      },
    },
  };

  // Step 4: Call the folder_structure_generation tool
  try {
    const result = await client.callTool({
      name: "folder_structure_generation",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📂 Folder Structure Generation Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
