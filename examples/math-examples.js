import RyKit from "../index.js";

const rykit = new RyKit();

async function testMathOperations() {
  try {
    console.log("\n=== Math Operations Tests ===");

    // Test factorial calculation
    console.log("\n1. Testing factorial calculation...");
    const numbers = [0, 1, 5, 10];
    numbers.forEach((n) => {
      const factorial = rykit.factorial(n);
      console.log(`Factorial of ${n}: ${factorial}`);
    });

    // Test permutation
    console.log("\n2. Testing permutation...");
    const permutationTests = [
      { n: 5, r: 3 },
      { n: 10, r: 2 },
      { n: 7, r: 4 },
    ];
    permutationTests.forEach(({ n, r }) => {
      const perm = rykit.mathUtils.permutation(n, r);
      console.log(`Permutation P(${n},${r}): ${perm}`);
    });

    // Test combination
    console.log("\n3. Testing combination...");
    const combinationTests = [
      { n: 5, r: 3 },
      { n: 10, r: 2 },
      { n: 7, r: 4 },
    ];
    combinationTests.forEach(({ n, r }) => {
      const comb = rykit.mathUtils.combination(n, r);
      console.log(`Combination C(${n},${r}): ${comb}`);
    });

    // Test statistical functions
    console.log("\n4. Testing statistical functions...");
    const dataset = [2, 4, 4, 4, 5, 5, 7, 9];
    console.log("Dataset:", dataset);
    console.log("Mean:", rykit.mean(dataset));
    console.log("Median:", rykit.median(dataset));
    console.log("Standard Deviation:", rykit.standardDeviation(dataset));

    // Test trigonometric functions
    console.log("\n5. Testing trigonometric functions...");
    const angles = [0, 30, 45, 60, 90];
    angles.forEach((angle) => {
      console.log(`\nAngle: ${angle} degrees`);
      console.log(`sin(${angle}°): ${rykit.mathUtils.sin(angle)}`);
      console.log(`cos(${angle}°): ${rykit.mathUtils.cos(angle)}`);
      console.log(`tan(${angle}°): ${rykit.mathUtils.tan(angle)}`);
    });

    // Test random number generation
    console.log("\n6. Testing random number generation...");
    const ranges = [
      { min: 1, max: 10 },
      { min: -5, max: 5 },
      { min: 100, max: 200 },
    ];
    ranges.forEach(({ min, max }) => {
      const randomNum = rykit.mathUtils.getRandomNumber(min, max);
      console.log(`Random number between ${min} and ${max}: ${randomNum}`);
    });

    // Test complex calculations
    console.log("\n7. Testing complex calculations...");

    // Factorial chain
    const n = 5;
    const factResult = rykit.factorial(n);
    console.log(`Factorial chain for ${n}: ${factResult}`);

    // Statistical analysis
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log("\nStatistical Analysis:");
    console.log("Data:", testData);
    console.log("Mean:", rykit.mean(testData));
    console.log("Median:", rykit.median(testData));
    console.log("Standard Deviation:", rykit.standardDeviation(testData));

    // Combinations and probability
    const total = rykit.mathUtils.combination(52, 5); // Poker hand combinations
    console.log("\nPoker Probability:");
    console.log("Total possible 5-card hands:", total);
    console.log(
      "Probability of getting a specific hand:",
      (1 / total).toExponential(5)
    );
  } catch (error) {
    console.error("Math Test Error:", error.message);
  }
}

// Run math tests
testMathOperations();
