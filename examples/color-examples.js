import RyKit from "../index.js";

const rykit = new RyKit();

async function testColorOperations() {
  try {
    console.log("\n=== Color Operations Tests ===");

    // Test RGB to HSL conversion
    console.log("\n1. Testing RGB to HSL conversion...");
    const rgb = { r: 255, g: 128, b: 0 }; // Orange color
    const hsl = rykit.rgbToHsl(rgb.r, rgb.g, rgb.b);
    console.log("RGB:", rgb);
    console.log("HSL:", hsl);

    // Test HSL to RGB conversion
    console.log("\n2. Testing HSL to RGB conversion...");
    const rgbBack = rykit.hslToRgb(hsl.h, hsl.s, hsl.l);
    console.log("HSL:", hsl);
    console.log("RGB:", rgbBack);

    // Test brightness calculation
    console.log("\n3. Testing brightness calculation...");
    const brightness = rykit.getBrightness(rgb.r, rgb.g, rgb.b);
    console.log("Color brightness:", brightness);
    console.log("Is light color?", rykit.isLight(rgb.r, rgb.g, rgb.b));

    // Test random color generation
    console.log("\n4. Testing random color generation...");
    const randomColor = rykit.getRandomColor();
    console.log("Random color:", randomColor);
    console.log(
      "Random color brightness:",
      rykit.getBrightness(randomColor.r, randomColor.g, randomColor.b)
    );

    // Test complementary color
    console.log("\n5. Testing complementary color...");
    const color = { r: 255, g: 100, b: 0 }; // Orange-red
    const complement = rykit.getComplementaryColor(color.r, color.g, color.b);
    console.log("Original color:", color);
    console.log("Complementary color:", complement);

    // Test color blending
    console.log("\n6. Testing color blending...");
    const color1 = { r: 255, g: 0, b: 0 }; // Red
    const color2 = { r: 0, g: 0, b: 255 }; // Blue
    const ratios = [0.25, 0.5, 0.75];

    ratios.forEach((ratio) => {
      const blended = rykit.blendColors(color1, color2, ratio);
      console.log(`\nBlend ratio ${ratio * 100}%:`);
      console.log("Color 1:", color1);
      console.log("Color 2:", color2);
      console.log("Blended:", blended);
    });
  } catch (error) {
    console.error("Color Test Error:", error.message);
  }
}

// Run color tests
testColorOperations();
