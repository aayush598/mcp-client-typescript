import { MCPClient } from "mcp-client";

async function main() {
  // Step 1: Create the MCP client
  const client = new MCPClient({
    name: "ProjectEstimator", // You can give your client any name
    version: "1.0.0",
  });

  // Step 2: Connect to the MCP server
  await client.connect({
    sseUrl: "https://krivisiomcp.onrender.com/sse",
  });

  console.log("✅ Connected to MCP server.");

  // Step 3: Define input data for the project_estimation tool
  const inputData = {input_data:{
    model_name: "cocomo2",
    data: {
      function_points: {
        fp_items: [
          { fp_type: "EI", det: 8, ftr_or_ret: 1 },
          { fp_type: "EO", det: 10, ftr_or_ret: 2 },
          { fp_type: "ILF", det: 18, ftr_or_ret: 3 },
        ],
        language: "Java",
      },
      reuse: {
        asloc: 3500,
        dm: 20,
        cm: 10,
        im: 10,
        su_rating: "L",
        aa_rating: "2",
        unfm_rating: "CF",
        at: 15,
      },
      revl: {
        new_sloc: 8500,
        adapted_esloc: 2500,
        revl_percent: 25,
      },
      effort_schedule: {
        sloc_ksloc: 7.5,
        sced_rating: "L",
      },
    },
  }};

  // Step 4: Call the project_estimation tool
  try {
    const result = await client.callTool({
      name: "project_estimation",
      arguments: inputData,
    });

    // Step 5: Display the result
    console.log("📊 Estimation Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error while calling tool:", error);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
});
