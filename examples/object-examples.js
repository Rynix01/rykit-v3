import RyKit from "rykit-v3";

const rykit = new RyKit();

async function testObjectOperations() {
  try {
    console.log("\n=== Object Operations Tests ===");

    // Test key deletion
    console.log("\n1. Testing key deletion...");
    const user = {
      name: "John",
      age: 30,
      email: "john@example.com",
      password: "secret123",
    };
    const userWithoutPassword = rykit.objectUtils.deleteKey(user, "password");
    console.log("Original object:", user);
    console.log("Object without password:", userWithoutPassword);

    // Test key addition
    console.log("\n2. Testing key addition...");
    const baseConfig = {
      host: "localhost",
      port: 3000,
    };
    const configWithSSL = rykit.objectUtils.addKey(baseConfig, "ssl", true);
    console.log("Original config:", baseConfig);
    console.log("Config with SSL:", configWithSSL);

    // Test shallow copy
    console.log("\n3. Testing shallow copy...");
    const original = {
      name: "Original",
      settings: { theme: "dark" },
    };
    const shallowCopy = rykit.objectUtils.shallowCopy(original);
    console.log("Original:", original);
    console.log("Shallow copy:", shallowCopy);
    console.log(
      "Are references same for nested object?",
      original.settings === shallowCopy.settings
    );

    // Test deep copy
    console.log("\n4. Testing deep copy...");
    const complexObj = {
      user: {
        name: "John",
        address: {
          city: "New York",
          country: "USA",
        },
      },
      preferences: ["dark", "compact"],
    };
    const deepCopy = rykit.objectUtils.deepCopy(complexObj);
    console.log("Original:", complexObj);
    console.log("Deep copy:", deepCopy);
    console.log(
      "Are references same for nested object?",
      complexObj.user.address === deepCopy.user.address
    );

    // Test deep equality
    console.log("\n5. Testing deep equality...");
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    const obj3 = { a: 1, b: { c: 3 } };
    console.log("Object 1:", obj1);
    console.log("Object 2:", obj2);
    console.log("Object 3:", obj3);
    console.log("obj1 equals obj2?", rykit.objectUtils.deepEqual(obj1, obj2));
    console.log("obj1 equals obj3?", rykit.objectUtils.deepEqual(obj1, obj3));

    // Test query params extraction
    console.log("\n6. Testing query params extraction...");
    const urls = [
      "https://example.com/path?name=John&age=30",
      "https://api.example.com/users?id=123&format=json",
      "https://example.com/search?q=test&page=1&limit=10",
    ];
    urls.forEach((url) => {
      console.log("\nURL:", url);
      console.log("Params:", rykit.objectUtils.getQueryParams(url));
    });

    // Test object merging
    console.log("\n7. Testing object merging...");
    const defaultConfig = {
      theme: "light",
      language: "en",
      notifications: {
        email: true,
        push: false,
      },
    };

    const userConfig = {
      theme: "dark",
      notifications: {
        push: true,
      },
    };

    const mergedConfig = rykit.mergeObjects(defaultConfig, userConfig);
    console.log("Default config:", defaultConfig);
    console.log("User config:", userConfig);
    console.log("Merged config:", mergedConfig);

    // Test object flattening
    console.log("\n8. Testing object flattening...");
    const nestedObject = {
      name: "Test",
      info: {
        age: 25,
        address: {
          city: "New York",
          country: "USA",
        },
      },
      hobbies: ["reading", "gaming"],
    };

    const flattenedObject = rykit.flattenObject(nestedObject);
    console.log("Nested object:", nestedObject);
    console.log("Flattened object:", flattenedObject);
  } catch (error) {
    console.error("Object Test Error:", error.message);
  }
}

// Run object tests
testObjectOperations();
