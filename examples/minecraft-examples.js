import RyKit from "../index.js";

const rykit = new RyKit();

async function testMinecraftOperations() {
  try {
    console.log("\n=== Minecraft Server Tests ===");

    // Test Java server
    console.log("\n1. Testing Java server (Netherite)...");
    const javaServer = "mc.netherite.gg";

    // Get basic status
    console.log("\nGetting server status...");
    const javaStatus = await rykit.getServerStatus(javaServer, "java");
    console.log("Server Status:", {
      online: javaStatus.online,
      players: javaStatus.players,
      version: javaStatus.version,
      motd: javaStatus.motd,
      ping: javaStatus.ping,
    });

    // Get server icon
    console.log("\nGetting server icon...");
    const javaIcon = await rykit.getServerIcon(javaServer);
    const javaIconBase64 = rykit.minecraftUtils.arrayBufferToBase64(javaIcon);
    console.log(
      "Server Icon (base64):",
      javaIconBase64.substring(0, 50) + "..."
    );

    // Get complete info
    console.log("\nGetting complete server info...");
    const serverInfo = await rykit.getServerInfo(javaServer, "java");
    console.log("Complete Info:", {
      status: serverInfo.status,
      hasIcon: !!serverInfo.icon,
      hasBanner: !!serverInfo.banner,
      type: serverInfo.type,
      timestamp: serverInfo.timestamp,
    });

    // Test Bedrock server
    console.log("\n2. Testing Bedrock server (CraftersMC)...");
    const bedrockServer = "play.craftersmc.net";
    const bedrockInfo = await rykit.getServerInfo(bedrockServer, "bedrock");
    console.log("Bedrock Server Info:", {
      status: bedrockInfo.status,
      hasIcon: !!bedrockInfo.icon,
      hasBanner: !!bedrockInfo.banner,
      type: bedrockInfo.type,
    });
  } catch (error) {
    console.error("Minecraft Test Error:", error.message);
  }
}

// Run Minecraft tests
testMinecraftOperations();
