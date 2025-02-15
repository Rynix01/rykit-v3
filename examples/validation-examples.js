import RyKit from "rykit-v3";

const rykit = new RyKit();

async function testValidationOperations() {
  try {
    console.log("\n=== Validation Operations Tests ===");

    // Test email validation
    console.log("\n1. Testing email validation...");
    const emails = [
      "test@example.com",
      "invalid.email",
      "user@domain.co.uk",
      "@nodomain.com",
      "spaces in@email.com",
      "user+tag@domain.com",
    ];

    emails.forEach((email) => {
      console.log(`"${email}" is valid:`, rykit.isEmail(email));
    });

    // Test URL validation
    console.log("\n2. Testing URL validation...");
    const urls = [
      "https://example.com",
      "http://sub.domain.co.uk/path",
      "ftp://invalid",
      "not-a-url",
      "https://domain.com?param=value",
      "http://localhost:3000",
    ];

    urls.forEach((url) => {
      console.log(`"${url}" is valid:`, rykit.isURL(url));
    });

    // Test date validation
    console.log("\n3. Testing date validation...");
    const dates = [
      "2024-02-20",
      "20/02/2024",
      "2024/13/45",
      "invalid-date",
      new Date().toISOString(),
      "Feb 20, 2024",
    ];

    dates.forEach((date) => {
      console.log(`"${date}" is valid:`, rykit.isDate(date));
    });

    // Test custom pattern validation
    console.log("\n4. Testing custom pattern validation...");

    // Add custom patterns
    rykit.addValidationPattern("username", /^[a-zA-Z0-9_]{3,20}$/);

    rykit.addValidationPattern(
      "password",
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );

    const usernames = [
      "john_doe",
      "user123",
      "a",
      "user@name",
      "validUsername",
      "too_long_username_123456",
    ];

    const passwords = [
      "Simple123",
      "StrongPass123!",
      "weak",
      "NoSpecial123",
      "Short1!",
      "ValidP@ssw0rd",
    ];

    console.log("\nTesting usernames:");
    usernames.forEach((username) => {
      const isValid = rykit.validationUtils.testPattern("username", username);
      console.log(`"${username}" is valid:`, isValid);
    });

    console.log("\nTesting passwords:");
    passwords.forEach((password) => {
      const isValid = rykit.validationUtils.testPattern("password", password);
      console.log(`"${password}" is valid:`, isValid);
    });

    // Test schema validation
    console.log("\n5. Testing schema validation...");
    const userSchema = {
      name: { type: "string", required: true, minLength: 2 },
      age: { type: "number", min: 18, max: 120 },
      email: { type: "email", required: true },
      website: { type: "url" },
      interests: { type: "array", minLength: 1 },
      settings: {
        type: "object",
        properties: {
          notifications: { type: "boolean" },
          theme: { type: "string", enum: ["light", "dark"] },
        },
      },
    };

    const validUser = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      website: "https://johndoe.com",
      interests: ["coding", "reading"],
      settings: {
        notifications: true,
        theme: "dark",
      },
    };

    const invalidUser = {
      name: "J",
      age: 15,
      email: "invalid-email",
      website: "not-a-url",
      interests: [],
      settings: {
        notifications: true,
        theme: "invalid",
      },
    };

    console.log("\nValidating valid user:");
    const validResult = rykit.validate(validUser, userSchema);
    console.log("Validation result:", validResult);

    console.log("\nValidating invalid user:");
    const invalidResult = rykit.validate(invalidUser, userSchema);
    console.log("Validation result:", invalidResult);
  } catch (error) {
    console.error("Validation Test Error:", error.message);
  }
}

// Run validation tests
testValidationOperations();
