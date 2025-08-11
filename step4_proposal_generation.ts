import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "DocumentGenerationTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the document_generation tool
  const inputData = {
    input_data: {
      module: "onboarding",
      doc_type: "proposal",
      input_data: {
        project_description: "SmartEdu LMS",
        tech_stack: ["Python", "Django", "React"],
        complexity_level: "Intermediate",
        features: [
          "User authentication and role management",
          "Interactive course modules with quizzes",
          "Progress tracking and analytics",
          "Live video conferencing integration",
          "Admin dashboard for content management",
        ],
        cocomo_results: {
          results: {
            function_points: {
              sloc: 18000,
            },
            reuse: {
              esloc: 14500,
            },
            revl: {
              sloc_after_revl: 16000,
            },
            effort_schedule: {
              person_months: 24.5,
              development_time_months: 5.5,
              avg_team_size: 4.45,
            },
          },
        },
      },
    },
  };

  // Step 4: Call the document_generation tool
  try {
    const result = await client.callTool({
      name: "document_generation",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📄 Document Generation Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
