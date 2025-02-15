import RyKit from "rykit-v3";

const rykit = new RyKit();

async function testDateOperations() {
  try {
    console.log("\n=== Date Operations Tests ===");

    // Test date formatting
    console.log("\n1. Testing date formatting...");
    const now = new Date();
    console.log("Original date:", now);
    console.log("Formatted (default):", rykit.formatDate(now));
    console.log(
      "Formatted (custom):",
      rykit.formatDate(now, "YYYY-MM-DD HH:mm:ss")
    );
    console.log("Formatted (time only):", rykit.formatTime(now));
    console.log("Formatted (time custom):", rykit.formatTime(now, "HH:mm"));

    // Test relative time formatting
    console.log("\n2. Testing relative time formatting...");
    const pastDates = [
      new Date(Date.now() - 30000), // 30 seconds ago
      new Date(Date.now() - 2 * 60000), // 2 minutes ago
      new Date(Date.now() - 3 * 3600000), // 3 hours ago
      new Date(Date.now() - 2 * 86400000), // 2 days ago
      new Date(Date.now() - 30 * 86400000), // 30 days ago
    ];

    pastDates.forEach((date) => {
      console.log("Date:", date);
      console.log("Relative:", rykit.formatRelative(date));
    });

    // Test locale support
    console.log("\n3. Testing locale support...");
    const locales = ["en-US", "tr-TR", "de-DE", "fr-FR", "ja-JP"];
    const testDate = new Date(2024, 1, 14, 15, 30, 45);

    locales.forEach((locale) => {
      rykit.setLocale(locale);
      console.log(`\nLocale: ${locale}`);
      console.log("Formatted date:", rykit.formatDate(testDate));
      console.log("Formatted time:", rykit.formatTime(testDate));
      console.log("Relative time:", rykit.formatRelative(testDate));
    });

    // Test timezone support
    console.log("\n4. Testing timezone support...");
    const timezones = [
      "America/New_York",
      "Europe/London",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Europe/Istanbul",
    ];

    timezones.forEach((timezone) => {
      rykit.setTimeZone(timezone);
      console.log(`\nTimezone: ${timezone}`);
      console.log("Formatted date:", rykit.formatDate(now));
      console.log("Formatted time:", rykit.formatTime(now));
    });

    // Test complex date operations
    console.log("\n5. Testing complex date operations...");
    const dates = [
      new Date(2024, 0, 1), // New Year
      new Date(2024, 11, 25), // Christmas
      new Date(2024, 6, 15), // Mid-year
    ];

    // Reset to default locale and timezone
    rykit.setLocale("en-US");
    rykit.setTimeZone("UTC");

    dates.forEach((date) => {
      console.log("\nDate:", date);
      console.log("Standard format:", rykit.formatDate(date));
      console.log(
        "Custom format:",
        rykit.formatDate(date, "dddd, MMMM Do YYYY")
      );
      console.log("Relative format:", rykit.formatRelative(date));
    });
  } catch (error) {
    console.error("Date Test Error:", error.message);
  }
}

// Run date tests
testDateOperations();
