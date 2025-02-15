import RyKit from "../index.js";

const rykit = new RyKit();

async function testArrayOperations() {
  try {
    console.log("\n=== Array Operations Tests ===");

    // Test unique array
    console.log("\n1. Testing unique array...");
    const duplicateArray = [1, 2, 2, 3, 3, 4, 5, 5];
    const uniqueArray = rykit.uniqueArray(duplicateArray);
    console.log("Original array:", duplicateArray);
    console.log("Unique array:", uniqueArray);

    // Test array intersection
    console.log("\n2. Testing array intersection...");
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [4, 5, 6, 7, 8];
    const intersect = rykit.intersection(arr1, arr2);
    console.log("Array 1:", arr1);
    console.log("Array 2:", arr2);
    console.log("Intersection:", intersect);

    // Test array difference
    console.log("\n3. Testing array difference...");
    const diff = rykit.difference(arr1, arr2);
    console.log("Array 1:", arr1);
    console.log("Array 2:", arr2);
    console.log("Difference (elements in arr1 but not in arr2):", diff);

    // Test array grouping
    console.log("\n4. Testing array grouping...");
    const users = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
    ];
    const groupedByAge = rykit.groupBy(users, "age");
    console.log("Original array:", users);
    console.log("Grouped by age:", groupedByAge);

    // Test random element selection
    console.log("\n5. Testing random element selection...");
    const elements = ["Apple", "Banana", "Orange", "Grape", "Mango"];
    const randomElement = rykit.arrayUtils.getRandomArrayElement(elements);
    console.log("Array:", elements);
    console.log("Random element:", randomElement);

    // Test array shuffling
    console.log("\n6. Testing array shuffling...");
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = rykit.arrayUtils.shuffle(originalArray);
    console.log("Original array:", originalArray);
    console.log("Shuffled array:", shuffledArray);

    // Test array chunking
    console.log("\n7. Testing array chunking...");
    const longArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chunks = rykit.arrayUtils.chunk(longArray, 3);
    console.log("Original array:", longArray);
    console.log("Chunked array (size 3):", chunks);

    // Test array filtering
    console.log("\n8. Testing array filtering...");
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const evenNumbers = rykit.arrayUtils.filterArray(
      numbers,
      (num) => num % 2 === 0
    );
    console.log("Original array:", numbers);
    console.log("Even numbers:", evenNumbers);

    // Test array sorting
    console.log("\n9. Testing array sorting...");
    const unsortedArray = [5, 2, 8, 1, 9];
    const ascendingSort = rykit.arrayUtils.sortArray(unsortedArray, true);
    const descendingSort = rykit.arrayUtils.sortArray(unsortedArray, false);
    console.log("Original array:", unsortedArray);
    console.log("Ascending sort:", ascendingSort);
    console.log("Descending sort:", descendingSort);

    // Test find and replace
    console.log("\n10. Testing find and replace...");
    const fruits = ["apple", "banana", "apple", "grape"];
    const replacedFruits = rykit.arrayUtils.findAndReplace(
      fruits,
      "apple",
      "orange"
    );
    console.log("Original array:", fruits);
    console.log("Replaced array:", replacedFruits);
  } catch (error) {
    console.error("Array Test Error:", error.message);
  }
}

// Run array tests
testArrayOperations();
