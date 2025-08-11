import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "MatchTalentTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the match_talent tool
  const inputData = {
    input_data: {
      specsheet: {
        project_description: "We need a frontend + backend team for an ecommerce platform using React and Node.",
        preferred_team_size: 4,
        minimum_manager_score: 4.2,
      },
      candidates: [
        {
          name: "Alice",
          domain: "frontend",
          skills: ["React", "TypeScript"],
          manager_score: 4.5,
          availability: true,
        },
        {
          name: "Bob",
          domain: "backend",
          skills: ["Node.js", "Express"],
          manager_score: 4.3,
          availability: true,
        },
      ],
    },
  };

  // Step 4: Call the match_talent tool
  try {
    const result = await client.callTool({
      name: "match_talent",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("🤝 Match Talent Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
