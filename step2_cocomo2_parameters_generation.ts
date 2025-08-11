import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "SideToolsTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the side_tools
  const inputData = {
    input_data: {
      tool: "cocomo2_parameters",
      data: {
        level: "intermediate",
        features: ["Login", "Shopping cart", "Payment gateway", "AI recommendations"],
        tech_stacks: ["Python", "Django", "React"],
      }
    }
  };

  // Step 4: Call the side_tools
  try {
    const result = await client.callTool({
      name: "side_tools",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📊 Side Tools Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
