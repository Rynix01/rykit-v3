import RyKit from "rykit-v3";
import path from "path";

const rykit = new RyKit();

async function testFileOperations() {
  try {
    console.log("\n=== File Operations Tests ===");

    // Test directory operations
    console.log("\n1. Testing directory operations...");
    const testDir = "./test-files";
    await rykit.createDirectory(testDir);
    console.log("Directory created:", testDir);

    // Test file writing
    console.log("\n2. Testing file writing...");
    const textFile = path.join(testDir, "test.txt");
    const jsonFile = path.join(testDir, "test.json");

    await rykit.writeFile(textFile, "Hello, World!");
    console.log("Text file written:", textFile);

    const jsonData = {
      name: "Test Data",
      numbers: [1, 2, 3],
      nested: {
        key: "value",
      },
    };
    await rykit.writeJSON(jsonFile, jsonData, true);
    console.log("JSON file written:", jsonFile);

    // Test file reading
    console.log("\n3. Testing file reading...");
    const textContent = await rykit.readFile(textFile);
    console.log("Text file content:", textContent);

    const jsonContent = await rykit.readJSON(jsonFile);
    console.log("JSON file content:", jsonContent);

    // Test file operations
    console.log("\n4. Testing file operations...");
    const copyFile = path.join(testDir, "test-copy.txt");
    await rykit.copyFile(textFile, copyFile);
    console.log("File copied:", copyFile);

    const moveFile = path.join(testDir, "test-moved.txt");
    await rykit.moveFile(copyFile, moveFile);
    console.log("File moved:", moveFile);

    // Test file info
    console.log("\n5. Testing file info...");
    const fileInfo = await rykit.getFileInfo(textFile);
    console.log("File info:", {
      size: rykit.formatFileSize(fileInfo.size),
      created: new Date(fileInfo.birthtime).toLocaleString(),
      modified: new Date(fileInfo.mtime).toLocaleString(),
      isFile: fileInfo.isFile,
      isDirectory: fileInfo.isDirectory,
    });

    // Test directory reading
    console.log("\n6. Testing directory reading...");
    const dirContents = await rykit.readDirectory(testDir);
    console.log("Directory contents:", dirContents);

    // Test file type detection
    console.log("\n7. Testing file type detection...");
    const textMimeType = rykit.getMimeType(textFile);
    const jsonMimeType = rykit.getMimeType(jsonFile);
    console.log("Text file MIME type:", textMimeType);
    console.log("JSON file MIME type:", jsonMimeType);

    // Test Base64 operations
    console.log("\n8. Testing Base64 operations...");
    const base64File = path.join(testDir, "test-base64.txt");
    const originalText = "Hello, Base64!";
    await rykit.base64ToFile(
      Buffer.from(originalText).toString("base64"),
      base64File
    );
    console.log("Base64 file written:", base64File);

    const base64Content = await rykit.fileToBase64(base64File);
    console.log("Base64 content:", base64Content);
    console.log(
      "Decoded content:",
      Buffer.from(base64Content, "base64").toString()
    );

    // Test file compression
    console.log("\n9. Testing file compression...");
    const compressedFile = path.join(testDir, "test.txt.gz");
    await rykit.compressFile(textFile, compressedFile);
    console.log("File compressed:", compressedFile);

    const decompressedFile = path.join(testDir, "test-decompressed.txt");
    await rykit.decompressFile(compressedFile, decompressedFile);
    console.log("File decompressed:", decompressedFile);

    // Clean up
    console.log("\n10. Cleaning up...");
    const files = [
      textFile,
      jsonFile,
      moveFile,
      base64File,
      compressedFile,
      decompressedFile,
    ];

    for (const file of files) {
      await rykit.deleteFile(file);
      console.log("Deleted:", file);
    }

    await rykit.deleteDirectory(testDir);
    console.log("Deleted directory:", testDir);
  } catch (error) {
    console.error("File Test Error:", error.message);
  }
}

// Run file tests
testFileOperations();
