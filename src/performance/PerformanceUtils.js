import fs from "fs/promises";
import path from "path";

class PerformanceUtils {
  constructor(options = {}) {
    this.measurements = new Map();
    this.marks = new Map();

    // Performance logging options
    this.logDir = options.logDir || "./logs/performance";
    this.logEnabled = options.logEnabled ?? false;
    this.logRetention = options.logRetention || 7; // days

    // CPU usage options
    this.cpuSampleSize = options.cpuSampleSize || 100;
    this.cpuSampleInterval = options.cpuSampleInterval || 10;

    // Memory leak detection options
    this.memoryThresholds = {
      warning: options.memoryWarningThreshold || 50 * 1024 * 1024, // 50MB
      critical: options.memoryCriticalThreshold || 200 * 1024 * 1024, // 200MB
      growth: options.memoryGrowthThreshold || 10, // 10% growth
    };

    // Initialize logging
    this.initializeLogging();
  }

  // Time measurement
  startTimer(label) {
    this.marks.set(label, process.hrtime.bigint());
  }

  endTimer(label) {
    const startTime = this.marks.get(label);
    if (!startTime) {
      throw new Error(`No timer found for label: ${label}`);
    }

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1e6; // Convert to milliseconds

    if (!this.measurements.has(label)) {
      this.measurements.set(label, []);
    }
    this.measurements.get(label).push(duration);
    this.marks.delete(label);

    return duration;
  }

  // Memory usage
  getMemoryUsage() {
    const usage = process.memoryUsage();
    return {
      heapTotal: this.formatBytes(usage.heapTotal),
      heapUsed: this.formatBytes(usage.heapUsed),
      rss: this.formatBytes(usage.rss),
      external: this.formatBytes(usage.external),
      arrayBuffers: this.formatBytes(usage.arrayBuffers || 0),
    };
  }

  // CPU usage
  async getCPUUsage(duration = 100) {
    const samples = [];
    const startTime = process.hrtime.bigint();

    // Collect multiple samples
    for (let i = 0; i < this.cpuSampleSize; i++) {
      const startUsage = process.cpuUsage();

      // Intensive workload
      const workload = () => {
        let result = 0;
        for (let i = 0; i < 100000; i++) {
          result += Math.sqrt(i) * Math.sin(i);
        }
        return result;
      };

      workload();

      const endUsage = process.cpuUsage(startUsage);
      samples.push({
        user: endUsage.user,
        system: endUsage.system,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, this.cpuSampleInterval)
      );
    }

    const endTime = process.hrtime.bigint();
    const elapsedMs = Number(endTime - startTime) / 1e6;

    // Calculate averages and percentages
    const avgUser =
      samples.reduce((sum, s) => sum + s.user, 0) / samples.length;
    const avgSystem =
      samples.reduce((sum, s) => sum + s.system, 0) / samples.length;

    const userPercent = (avgUser / 1000 / elapsedMs) * 100;
    const systemPercent = (avgSystem / 1000 / elapsedMs) * 100;

    const result = {
      user: userPercent.toFixed(2) + "%",
      system: systemPercent.toFixed(2) + "%",
      total: (userPercent + systemPercent).toFixed(2) + "%",
      elapsedTime: elapsedMs.toFixed(2) + "ms",
      samples: samples.length,
    };

    // Log CPU usage
    await this.logPerformanceData("cpu-usage", result);

    return result;
  }

  // Performance metrics
  getMetrics(label) {
    const measurements = this.measurements.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const sorted = [...measurements].sort((a, b) => a - b);
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      average: measurements.reduce((a, b) => a + b, 0) / measurements.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      samples: measurements.length,
    };
  }

  // Performance monitoring
  async monitor(callback, options = {}) {
    const { duration = 1000, interval = 100, label = "monitor" } = options;

    const startTime = Date.now();
    const measurements = [];

    while (Date.now() - startTime < duration) {
      const memoryBefore = process.memoryUsage();
      const cpuBefore = process.cpuUsage();

      await callback();

      const memoryAfter = process.memoryUsage();
      const cpuAfter = process.cpuUsage(cpuBefore);

      measurements.push({
        timestamp: Date.now(),
        memory: {
          heap: memoryAfter.heapUsed - memoryBefore.heapUsed,
          rss: memoryAfter.rss - memoryBefore.rss,
        },
        cpu: {
          user: cpuAfter.user / 1000,
          system: cpuAfter.system / 1000,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return {
      label,
      duration,
      samples: measurements.length,
      memory: {
        avgHeapUsage: this.formatBytes(
          measurements.reduce((sum, m) => sum + m.memory.heap, 0) /
            measurements.length
        ),
        avgRssUsage: this.formatBytes(
          measurements.reduce((sum, m) => sum + m.memory.rss, 0) /
            measurements.length
        ),
      },
      cpu: {
        avgUser:
          measurements.reduce((sum, m) => sum + m.cpu.user, 0) /
          measurements.length,
        avgSystem:
          measurements.reduce((sum, m) => sum + m.cpu.system, 0) /
          measurements.length,
      },
    };
  }

  // Benchmark function
  async benchmark(fn, options = {}) {
    const { iterations = 1000, warmup = 100, label = "benchmark" } = options;

    // Warmup phase
    for (let i = 0; i < warmup; i++) {
      await fn();
    }

    // Benchmark phase
    const measurements = [];
    for (let i = 0; i < iterations; i++) {
      this.startTimer(label);
      await fn();
      const duration = this.endTimer(label);
      measurements.push(duration);
    }

    const totalTime = measurements.reduce((a, b) => a + b, 0);
    const sorted = [...measurements].sort((a, b) => a - b);

    return {
      label,
      iterations,
      totalTime,
      avgTimePerIteration: totalTime / iterations,
      metrics: {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        average: totalTime / iterations,
        median: sorted[Math.floor(sorted.length / 2)],
        p95: sorted[Math.floor(sorted.length * 0.95)],
        samples: measurements.length,
      },
    };
  }

  // Utility functions
  formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  clearMeasurements(label) {
    if (label) {
      this.measurements.delete(label);
      this.marks.delete(label);
    } else {
      this.measurements.clear();
      this.marks.clear();
    }
  }

  // Debounce implementation
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle implementation
  throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // Lazy loading helpers
  async lazyLoad(importFn, options = {}) {
    const {
      timeout = 5000,
      retries = 3,
      onError,
      onSuccess,
      onTimeout,
    } = options;

    let attempt = 0;

    while (attempt < retries) {
      try {
        const loadPromise = importFn();
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Loading timeout")), timeout);
        });

        const result = await Promise.race([loadPromise, timeoutPromise]);
        onSuccess?.();
        return result;
      } catch (error) {
        attempt++;
        onError?.(error, attempt);

        if (error.message === "Loading timeout") {
          onTimeout?.(attempt);
        }

        if (attempt === retries) {
          throw new Error(
            `Failed to load after ${retries} attempts: ${error.message}`
          );
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 100)
        );
      }
    }
  }

  // Performance measurement decorators
  measureExecutionTime(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();

      console.log(
        `${propertyKey} execution time: ${(end - start).toFixed(2)}ms`
      );
      return result;
    };

    return descriptor;
  }

  // Resource timing helper
  getResourceTiming(resource) {
    const entries = performance.getEntriesByName(resource);
    if (entries.length === 0) {
      return null;
    }

    const timing = entries[0];
    return {
      dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
      tcpConnection: timing.connectEnd - timing.connectStart,
      requestTime: timing.responseEnd - timing.requestStart,
      totalTime: timing.duration,
      size: timing.transferSize,
      protocol: timing.nextHopProtocol,
    };
  }

  // Performance marks and measures
  startMeasure(name) {
    performance.mark(`${name}-start`);
  }

  endMeasure(name, options = {}) {
    const { detailed = false, threshold = 0 } = options;

    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measures = performance.getEntriesByName(name);
    const duration = measures[0].duration;

    if (duration > threshold) {
      console.warn(
        `Performance warning: ${name} took ${duration.toFixed(2)}ms`
      );
    }

    if (detailed) {
      return {
        name,
        duration,
        startTime: measures[0].startTime,
        detail: measures[0].detail,
      };
    }

    return duration;
  }

  // Enhanced memory monitoring
  startMemoryMonitoring(options = {}) {
    const {
      interval = 1000,
      maxSamples = 60,
      onWarning,
      onCritical,
      onLeak,
    } = options;

    const samples = [];
    let baselineUsage = process.memoryUsage().heapUsed;
    let previousUsage = baselineUsage;

    return setInterval(async () => {
      const { heapUsed, heapTotal, external, rss } = process.memoryUsage();
      const sample = {
        timestamp: Date.now(),
        heapUsed,
        heapTotal,
        external,
        rss,
      };

      samples.push(sample);
      if (samples.length > maxSamples) samples.shift();

      // Calculate growth rates
      const absoluteGrowth = heapUsed - previousUsage;
      const percentGrowth = ((heapUsed - baselineUsage) / baselineUsage) * 100;

      // Check thresholds
      if (heapUsed > this.memoryThresholds.critical) {
        onCritical?.({
          usage: this.formatBytes(heapUsed),
          threshold: this.formatBytes(this.memoryThresholds.critical),
          samples,
        });
      } else if (heapUsed > this.memoryThresholds.warning) {
        onWarning?.({
          usage: this.formatBytes(heapUsed),
          threshold: this.formatBytes(this.memoryThresholds.warning),
          samples,
        });
      }

      if (percentGrowth > this.memoryThresholds.growth) {
        onLeak?.({
          growth: this.formatBytes(absoluteGrowth),
          percentGrowth: percentGrowth.toFixed(2) + "%",
          currentUsage: this.formatBytes(heapUsed),
          samples,
        });
      }

      // Log memory usage
      await this.logPerformanceData("memory-usage", {
        ...sample,
        growth: absoluteGrowth,
        percentGrowth,
      });

      previousUsage = heapUsed;
    }, interval);
  }

  stopMemoryMonitoring(monitorId) {
    clearInterval(monitorId);
  }

  // Performance logging
  async initializeLogging() {
    if (!this.logEnabled) return;

    try {
      await fs.mkdir(this.logDir, { recursive: true });
      await this.cleanOldLogs();
    } catch (error) {
      console.error("Failed to initialize performance logging:", error);
    }
  }

  async logPerformanceData(type, data) {
    if (!this.logEnabled) return;

    const date = new Date();
    const fileName = `${type}-${date.toISOString().split("T")[0]}.json`;
    const filePath = path.join(this.logDir, fileName);

    try {
      let logs = [];
      try {
        const content = await fs.readFile(filePath, "utf-8");
        logs = JSON.parse(content);
      } catch {
        // File doesn't exist or is empty
      }

      logs.push({
        timestamp: date.toISOString(),
        ...data,
      });

      await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log performance data:", error);
    }
  }

  async cleanOldLogs() {
    try {
      const files = await fs.readdir(this.logDir);
      const now = Date.now();

      for (const file of files) {
        const filePath = path.join(this.logDir, file);
        const stats = await fs.stat(filePath);
        const age = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

        if (age > this.logRetention) {
          await fs.unlink(filePath);
        }
      }
    } catch (error) {
      console.error("Failed to clean old logs:", error);
    }
  }

  // Execution time measurement
  measureExecutionTime(callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    return end - start;
  }

  // Async iteration helper
  async asyncForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      await callback(array[i], i, array);
    }
  }
}

export default PerformanceUtils;
