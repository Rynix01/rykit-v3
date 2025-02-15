import RyKit from "../index.js";

const rykit = new RyKit();

async function testStringOperations() {
  try {
    console.log("\n=== String Operations Tests ===");

    // Test word replacement
    console.log("\n1. Testing word replacement...");
    const text = "Hello world, hello JavaScript, hello Node.js";
    const replaced = rykit.replaceWord(text, "hello", "hi");
    console.log("Original text:", text);
    console.log("Replaced text:", replaced);

    // Test string joining
    console.log("\n2. Testing string joining...");
    const words = ["JavaScript", "is", "awesome"];
    const joined = rykit.stringUtils.joinStrings(words, " ");
    console.log("Array of words:", words);
    console.log("Joined string:", joined);

    // Test UUID generation
    console.log("\n3. Testing UUID generation...");
    const uuid = rykit.stringUtils.generateUUID();
    console.log("Generated UUID:", uuid);
    console.log("UUID length:", uuid.length);
    console.log(
      "UUID format valid:",
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        uuid
      )
    );

    // Test color conversions
    console.log("\n4. Testing color conversions...");
    const rgb = { r: 255, g: 128, b: 0 }; // Orange color
    const hex = rykit.stringUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
    console.log("RGB:", rgb);
    console.log("Hex:", hex);

    const rgbBack = rykit.stringUtils.hexToRgb(hex);
    console.log("Hex to RGB:", rgbBack);

    // Test case conversions
    console.log("\n5. Testing case conversions...");
    const sentence = "the quick brown fox jumps over the lazy dog";
    console.log("Original:", sentence);
    console.log("Title Case:", rykit.toTitleCase(sentence));
    console.log("Camel Case:", rykit.toCamelCase(sentence));

    // Test timestamp formatting
    console.log("\n6. Testing timestamp formatting...");
    const now = new Date();
    const timestamp = now.getTime();
    console.log("Timestamp:", timestamp);
    console.log("Formatted:", rykit.stringUtils.formatTimestamp(timestamp));

    // Test complex string operations
    console.log("\n7. Testing complex string operations...");

    // Multiple replacements
    const complexText = "The quick brown fox jumps over the lazy dog";
    const multiReplaced = rykit.replaceWord(
      rykit.replaceWord(complexText, "quick", "fast"),
      "lazy",
      "sleeping"
    );
    console.log("Original:", complexText);
    console.log("Multiple replacements:", multiReplaced);

    // Combine operations
    const words2 = complexText.split(" ");
    const shuffled = rykit.stringUtils.joinStrings(
      words2.sort(() => Math.random() - 0.5),
      "-"
    );
    console.log("Shuffled and joined:", shuffled);
  } catch (error) {
    console.error("String Test Error:", error.message);
  }
}

// Run string tests
testStringOperations();
