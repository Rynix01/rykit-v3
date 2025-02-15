import RyKit from "rykit-v3";

const rykit = new RyKit();

async function testPerformanceOperations() {
  try {
    console.log("\n=== Performance Operations Tests ===");

    // Test basic timer
    console.log("\n1. Testing basic timer...");
    rykit.startTimer("basic-operation");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate work
    const duration = rykit.endTimer("basic-operation");
    console.log("Operation duration:", duration, "ms");

    // Test memory usage
    console.log("\n2. Testing memory usage...");
    const memoryUsage = rykit.getMemoryUsage();
    console.log("Current memory usage:", memoryUsage);

    // Test CPU usage
    console.log("\n3. Testing CPU usage...");
    const cpuUsage = await rykit.getCPUUsage(100);
    console.log("CPU usage:", cpuUsage);

    // Test performance metrics
    console.log("\n4. Testing performance metrics...");
    for (let i = 0; i < 5; i++) {
      rykit.startTimer("repeated-operation");
      await new Promise((resolve) => setTimeout(resolve, 100 * Math.random()));
      rykit.endTimer("repeated-operation");
    }
    const metrics = rykit.getMetrics("repeated-operation");
    console.log("Operation metrics:", metrics);

    // Test execution time measurement
    console.log("\n5. Testing execution time measurement...");
    const executionTime = rykit.measureExecutionTime(() => {
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      return sum;
    });
    console.log("Execution time:", executionTime, "ms");

    // Test async iteration
    console.log("\n6. Testing async iteration...");
    const items = [1, 2, 3, 4, 5];
    console.log("Processing items with delay...");
    await rykit.asyncForEach(items, async (item) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("Processed item:", item);
    });

    // Test benchmarking
    console.log("\n7. Testing benchmarking...");
    const benchmarkResults = await rykit.performanceUtils.benchmark(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return Math.random();
      },
      {
        iterations: 10,
        warmup: 2,
        label: "random-operation",
      }
    );
    console.log("Benchmark results:", benchmarkResults);

    // Test performance monitoring
    console.log("\n8. Testing performance monitoring...");
    const monitorId = rykit.performanceUtils.startMemoryMonitoring({
      interval: 500,
      maxSamples: 5,
      onWarning: (data) => console.log("Memory warning:", data),
      onCritical: (data) => console.log("Memory critical:", data),
      onLeak: (data) => console.log("Possible memory leak:", data),
    });

    // Simulate memory usage
    const array = [];
    for (let i = 0; i < 1000000; i++) {
      array.push(new Array(10).fill("test"));
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    rykit.performanceUtils.stopMemoryMonitoring(monitorId);
    console.log("Memory monitoring stopped");

    // Test performance marks and measures
    console.log("\n9. Testing performance marks and measures...");
    rykit.performanceUtils.startMeasure("complex-operation");

    // Simulate complex work
    await new Promise((resolve) => setTimeout(resolve, 500));

    const measureResult = rykit.performanceUtils.endMeasure(
      "complex-operation",
      {
        detailed: true,
        threshold: 100,
      }
    );
    console.log("Measure result:", measureResult);
  } catch (error) {
    console.error("Performance Test Error:", error.message);
  }
}

// Run performance tests
testPerformanceOperations();
