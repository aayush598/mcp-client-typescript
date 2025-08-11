import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "ProjectEstimationTester",
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  
  // Step 3: Define input data for the project_estimation tool
  const inputData = {
    input_data: {
      model_name: "cocomo2",
      data: {
        "function_points": {
          "fp_items": [
            {
              "fp_type": "EI",
              "det": 8,
              "ftr_or_ret": 3
            },
            {
              "fp_type": "EO",
              "det": 12,
              "ftr_or_ret": 4
            },
            {
              "fp_type": "EQ",
              "det": 7,
              "ftr_or_ret": 2
            },
            {
              "fp_type": "ILF",
              "det": 15,
              "ftr_or_ret": 5
            },
            {
              "fp_type": "EIF",
              "det": 6,
              "ftr_or_ret": 3
            }
          ],
          "language": "Java"
        },
        "reuse": {
          "asloc": 2000,
          "dm": 25,
          "cm": 15,
          "im": 10,
          "su_rating": "N",
          "aa_rating": "4",
          "unfm_rating": "MF",
          "at": 20
        },
        "revl": {
          "new_sloc": 12000,
          "adapted_esloc": 4000,
          "revl_percent": 30
        },
        "effort_schedule": {
          "sloc_ksloc": 12,
          "sced_rating": "N"
        }
      },
    },
  };

  // Step 4: Call the project_estimation tool
  try {
    const result = await client.callTool({
      name: "project_estimation",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📊 Project Estimation Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
