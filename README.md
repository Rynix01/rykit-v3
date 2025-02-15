<div align="center">
  <h1>RyKit v3</h1>
  <p>A powerful Node.js utility library for Minecraft server status, color manipulation, encryption, file operations, and more.</p>
</div>

## 📦 Installation

```bash
npm install rykit-v3
```

```bash
yarn add rykit-v3
```

```bash
pnpm add rykit-v3
```

```bash
bun add rykit-v3
```

## 🚀 Features

### 🎮 Minecraft Server Utils

- Server status checking (Java & Bedrock)
- Server icon and banner retrieval
- MOTD parsing and formatting
- Player count and version info

### 🎨 Color Utils

- RGB/HSL/HEX conversions
- Brightness calculation
- Random color generation
- Color blending
- Complementary colors

### 🔐 Encryption Utils

- AES encryption/decryption
- RSA operations
- Hash functions (MD5, SHA1, SHA256, SHA512)
- JWT handling
- Password hashing

### 📁 File Utils

- File reading/writing
- Directory management
- MIME type detection
- Base64 operations
- Compression

### 📊 Array Utils

- Unique array creation
- Array intersection/difference
- Grouping and chunking
- Shuffling and sorting
- Element manipulation

### 🔢 Math Utils

- Statistical calculations
- Factorial computation
- Permutation/Combination
- Random number generation
- Trigonometric functions

### 📅 Date Utils

- Date formatting
- Relative time
- Timezone handling
- Locale support
- Date calculations

### ✅ Validation Utils

- Schema validation
- Email/URL validation
- Pattern matching
- Type checking
- Custom rules

### 🔧 Object Utils

- Deep copy object
- Merge objects
- Flatten object
- Pick properties
- Omit properties
- Check if object has path
- Get value at path
- Set value at path
- Compare objects

### 🔄 Performance Operations

- Basic timer
- Memory usage
- CPU usage
- Performance metrics
- Execution time measurement
- Async iteration with performance monitoring
- Benchmark
- Memory monitoring

### 🔄 State Management

- State creation and updates
- State subscription
- Computed values
- State persistence
- Complex state handling
- State history
- State snapshots
- State validation

### 🔄 String Operations

- Word replacement
- String joining
- UUID generation
- Case conversions
- String truncation
- String padding
- String template
- String search and highlight
- String similarity
- String formatting
- String validation
- String encryption

## 💡 Usage Examples

### Minecraft Server Status

```javascript
import RyKit from "rykit-v3";
const rykit = new RyKit();

// Check Java server status
const status = await rykit.getServerStatus("mc.hypixel.net", "java");
console.log(status);
// Output: {
//   online: true,
//   players: { online: 12345, max: 20000 },
//   version: '1.8.x-1.19',
//   motd: '§aHypixel Network §7[1.8-1.19]'
// }

// Get server icon (returns base64)
const icon = await rykit.getServerIcon("mc.hypixel.net");
console.log(icon); // "data:image/png;base64,..."

// Get server banner (returns base64)
const banner = await rykit.getServerBanner("mc.hypixel.net");
console.log(banner); // "data:image/png;base64,..."

// Get complete server info
const info = await rykit.getServerInfo("mc.hypixel.net", "java");
console.log(info);
// Output: {
//   status: {
//     online: true,
//     players: { online: 12345, max: 20000 },
//     version: '1.8.x-1.19',
//     motd: '§aHypixel Network §7[1.8-1.19]'
//   },
//   icon: "data:image/png;base64,...",
//   banner: "data:image/png;base64,...",
//   type: "java",
//   timestamp: "2024-02-20T12:34:56.789Z"
// }

// Check Bedrock server
const bedrockStatus = await rykit.getServerStatus(
  "play.hypixel.net",
  "bedrock"
);
console.log(bedrockStatus);
// Output: {
//   online: true,
//   players: { online: 789, max: 1000 },
//   version: '1.20.0',
//   motd: 'Hypixel Bedrock Server'
// }
```

### Color Operations

```javascript
// RGB to HSL conversion
const hsl = rykit.rgbToHsl(255, 128, 0);
console.log(hsl); // { h: 30, s: 100, l: 50 }

// HSL to RGB conversion
const rgb = rykit.hslToRgb(30, 100, 50);
console.log(rgb); // { r: 255, g: 128, b: 0 }

// Get color brightness
const brightness = rykit.getBrightness(255, 128, 0);
console.log(brightness); // 0.65

// Check if color is light
const isLight = rykit.isLight(255, 128, 0);
console.log(isLight); // true

// Generate random color
const randomColor = rykit.getRandomColor();
console.log(randomColor); // { r: 123, g: 45, b: 67 }

// Get complementary color
const complementary = rykit.getComplementaryColor(255, 128, 0);
console.log(complementary); // { r: 0, g: 127, b: 255 }

// Blend two colors
const color1 = { r: 255, g: 0, b: 0 }; // Red
const color2 = { r: 0, g: 0, b: 255 }; // Blue
const blended = rykit.blendColors(color1, color2, 0.5);
console.log(blended); // { r: 127, g: 0, b: 127 } // Purple
```

### File Operations

```javascript
// Basic file operations
await rykit.writeFile("test.txt", "Hello World");
const content = await rykit.readFile("test.txt");
console.log(content); // 'Hello World'

// JSON operations
await rykit.writeJSON("config.json", { name: "test" }, true);
const json = await rykit.readJSON("config.json");
console.log(json); // { name: "test" }

// Directory operations
await rykit.createDirectory("uploads");
const files = await rykit.readDirectory("uploads");
console.log(files); // ['file1.txt', 'file2.jpg', ...]

// File info and checks
const exists = await rykit.fileExists("test.txt");
console.log(exists); // true

const isFile = await rykit.isFile("test.txt");
console.log(isFile); // true

const isDir = await rykit.isDirectory("uploads");
console.log(isDir); // true

const fileInfo = await rykit.getFileInfo("test.txt");
console.log(fileInfo); // { size: 1234, created: Date, modified: Date, ... }

// Base64 operations
const base64 = await rykit.fileToBase64("image.jpg");
console.log(base64); // "data:image/jpeg;base64,..."

await rykit.base64ToFile(base64, "copy.jpg");

// File type detection
const mimeType = rykit.getMimeType("image.jpg");
console.log(mimeType); // "image/jpeg"

const fileType = await rykit.detectFileType("document.pdf");
console.log(fileType); // { ext: "pdf", mime: "application/pdf" }

// File size formatting
const size = rykit.formatFileSize(1234567);
console.log(size); // "1.23 MB"

// File compression
await rykit.compressFile("large.txt", "large.txt.gz");
await rykit.decompressFile("large.txt.gz", "large_restored.txt");

// File upload/download
await rykit.downloadFile("https://example.com/file.pdf", "local.pdf");
await rykit.uploadFile("local.pdf", "https://api.example.com/upload");
```

### Array Operations

```javascript
// Create unique array
const unique = rykit.uniqueArray([1, 2, 2, 3, 3, 4]);
console.log(unique); // [1, 2, 3, 4]

// Group array
const grouped = rykit.groupBy(
  [
    { name: "John", age: 20 },
    { name: "Jane", age: 20 },
    { name: "Bob", age: 30 },
  ],
  "age"
);
console.log(grouped);
// Output: {
//   "20": [
//     { name: "John", age: 20 },
//     { name: "Jane", age: 20 }
//   ],
//   "30": [
//     { name: "Bob", age: 30 }
//   ]
// }

// Array intersection
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
const intersect = rykit.intersection(arr1, arr2);
console.log(intersect); // [4, 5]

// Array difference
const diff = rykit.difference(arr1, arr2);
console.log(diff); // [1, 2, 3]

// Get random element
const elements = ["Apple", "Banana", "Orange", "Grape"];
const random = rykit.arrayUtils.getRandomArrayElement(elements);
console.log(random); // Random element from array

// Shuffle array
const numbers = [1, 2, 3, 4, 5];
const shuffled = rykit.arrayUtils.shuffle(numbers);
console.log(shuffled); // [3, 1, 5, 2, 4] (random order)

// Chunk array
const longArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = rykit.arrayUtils.chunk(longArray, 3);
console.log(chunks);
// Output: [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [10]
// ]

// Filter array
const evenNumbers = rykit.arrayUtils.filterArray(
  numbers,
  (num) => num % 2 === 0
);
console.log(evenNumbers); // [2, 4]

// Find and replace
const fruits = ["apple", "banana", "apple", "grape"];
const replaced = rykit.arrayUtils.findAndReplace(fruits, "apple", "orange");
console.log(replaced); // ["orange", "banana", "orange", "grape"]
```

### Math Operations

```javascript
// Factorial calculation
const factorial = rykit.factorial(5);
console.log(factorial); // 120

// Statistical operations
const numbers = [1, 2, 3, 4, 5];
console.log(rykit.mean(numbers)); // 3
console.log(rykit.median(numbers)); // 3
console.log(rykit.standardDeviation(numbers)); // ~1.41

// Permutation
const perm = rykit.mathUtils.permutation(5, 3);
console.log(perm); // 60 (5P3)

// Combination
const comb = rykit.mathUtils.combination(5, 3);
console.log(comb); // 10 (5C3)

// Trigonometric functions (angles in degrees)
console.log(rykit.mathUtils.sin(45)); // ~0.707
console.log(rykit.mathUtils.cos(45)); // ~0.707
console.log(rykit.mathUtils.tan(45)); // ~1

// Random number generation
const random = rykit.mathUtils.getRandomNumber(1, 100);
console.log(random); // Random number between 1 and 100

// Complex calculations
const dataset = [2, 4, 4, 4, 5, 5, 7, 9];
console.log({
  mean: rykit.mean(dataset), // 5
  median: rykit.median(dataset), // 4.5
  stdDev: rykit.standardDeviation(dataset), // ~2.07
  variance: rykit.mathUtils.variance(dataset), // ~4.29
  mode: rykit.mathUtils.mode(dataset), // 4
  range: rykit.mathUtils.range(dataset), // 7
  sum: rykit.mathUtils.sum(dataset), // 40
  product: rykit.mathUtils.product(dataset), // 100800
});

// Probability calculations
const diceRoll = rykit.mathUtils.probability.diceRoll(6);
console.log(diceRoll); // Random number 1-6

const coinFlip = rykit.mathUtils.probability.coinFlip();
console.log(coinFlip); // 'heads' or 'tails'

const randomCard = rykit.mathUtils.probability.drawCard();
console.log(randomCard); // { suit: 'hearts', value: 'ace' }
```

### Date Operations

```javascript
// Format date
const date = new Date();
const formatted = rykit.formatDate(date, "YYYY-MM-DD HH:mm:ss");
console.log(formatted); // '2024-02-20 15:30:45'

// Format with different patterns
console.log(rykit.formatDate(date, "DD/MM/YYYY")); // '20/02/2024'
console.log(rykit.formatDate(date, "MMMM Do, YYYY")); // 'February 20th, 2024'
console.log(rykit.formatDate(date, "dddd [at] HH:mm")); // 'Tuesday at 15:30'

// Format time only
const timeFormatted = rykit.formatTime(date, "HH:mm:ss");
console.log(timeFormatted); // '15:30:45'

// Relative time
const pastDate = new Date("2024-01-01");
console.log(rykit.formatRelative(pastDate)); // '1 month ago'

const futureDate = new Date("2024-12-31");
console.log(rykit.formatRelative(futureDate)); // 'in 10 months'

// Set locale
rykit.setLocale("tr");
console.log(rykit.formatDate(date, "MMMM Do, YYYY")); // 'Şubat 20., 2024'

// Set timezone
rykit.setTimeZone("Europe/Istanbul");
console.log(rykit.formatDate(date, "YYYY-MM-DD HH:mm:ss z")); // '2024-02-20 18:30:45 GMT+3'

// Date calculations
const tomorrow = rykit.dateUtils.addDays(date, 1);
console.log(rykit.formatDate(tomorrow, "YYYY-MM-DD")); // '2024-02-21'

const nextWeek = rykit.dateUtils.addWeeks(date, 1);
console.log(rykit.formatDate(nextWeek, "YYYY-MM-DD")); // '2024-02-27'

const lastMonth = rykit.dateUtils.subMonths(date, 1);
console.log(rykit.formatDate(lastMonth, "YYYY-MM-DD")); // '2024-01-20'

// Date comparisons
const date1 = new Date("2024-02-20");
const date2 = new Date("2024-02-21");

console.log(rykit.dateUtils.isBefore(date1, date2)); // true
console.log(rykit.dateUtils.isAfter(date1, date2)); // false
console.log(rykit.dateUtils.isSameDay(date1, date2)); // false

// Get start/end of period
console.log(rykit.dateUtils.startOfDay(date)); // '2024-02-20 00:00:00'
console.log(rykit.dateUtils.endOfDay(date)); // '2024-02-20 23:59:59'
console.log(rykit.dateUtils.startOfWeek(date)); // '2024-02-19 00:00:00'
console.log(rykit.dateUtils.startOfMonth(date)); // '2024-02-01 00:00:00'
```

### Object Operations

```javascript
// Deep copy object
const original = {
  user: {
    name: "John",
    settings: { theme: "dark", notifications: true },
  },
};
const copy = rykit.deepCopy(original);
console.log(copy);
// Output: { user: { name: "John", settings: { theme: "dark", notifications: true } } }

// Merge objects
const obj1 = { a: 1, b: { x: 2 } };
const obj2 = { b: { y: 3 }, c: 4 };
const merged = rykit.mergeObjects(obj1, obj2);
console.log(merged);
// Output: { a: 1, b: { x: 2, y: 3 }, c: 4 }

// Flatten object
const nested = {
  user: {
    name: "John",
    address: {
      city: "New York",
      country: "USA",
    },
  },
};
const flattened = rykit.objectUtils.flattenObject(nested);
console.log(flattened);
// Output: {
//   "user.name": "John",
//   "user.address.city": "New York",
//   "user.address.country": "USA"
// }

// Pick properties
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
};
const picked = rykit.objectUtils.pick(user, ["name", "email"]);
console.log(picked); // { name: "John", email: "john@example.com" }

// Omit properties
const safe = rykit.objectUtils.omit(user, ["password"]);
console.log(safe); // { id: 1, name: "John", email: "john@example.com" }

// Check if object has path
const hasPath = rykit.objectUtils.hasPath(nested, "user.address.city");
console.log(hasPath); // true

// Get value at path
const value = rykit.objectUtils.getPath(nested, "user.address.city");
console.log(value); // "New York"

// Set value at path
rykit.objectUtils.setPath(nested, "user.address.zipCode", "10001");
console.log(nested.user.address.zipCode); // "10001"

// Compare objects
const obj3 = { a: 1, b: { x: 2 } };
const obj4 = { a: 1, b: { x: 2 } };
const isEqual = rykit.objectUtils.isEqual(obj3, obj4);
console.log(isEqual); // true
```

### Performance Operations

```javascript
// Basic timer
rykit.startTimer("operation");
await someOperation();
const duration = rykit.endTimer("operation");
console.log("Operation took:", duration, "ms");

// Memory usage
const memoryUsage = rykit.getMemoryUsage();
console.log("Memory usage:", memoryUsage);
// Output: {
//   heapUsed: "50 MB",
//   heapTotal: "100 MB",
//   external: "10 MB",
//   rss: "200 MB"
// }

// CPU usage
const cpuUsage = await rykit.getCPUUsage(100); // Sample for 100ms
console.log("CPU usage:", cpuUsage); // e.g., 45.2 (percentage)

// Performance metrics
for (let i = 0; i < 5; i++) {
  rykit.startTimer("repeated-operation");
  await someOperation();
  rykit.endTimer("repeated-operation");
}

const metrics = rykit.getMetrics("repeated-operation");
console.log("Operation metrics:", metrics);
// Output: {
//   min: 10,
//   max: 15,
//   mean: 12.5,
//   median: 12,
//   samples: 5,
//   total: 62.5
// }

// Execution time measurement
const executionTime = rykit.measureExecutionTime(() => {
  // Some synchronous operation
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
});
console.log("Execution time:", executionTime, "ms");

// Async iteration with performance monitoring
const items = [1, 2, 3, 4, 5];
await rykit.asyncForEach(items, async (item) => {
  await someAsyncOperation(item);
});

// Benchmark
const benchmarkResults = await rykit.performanceUtils.benchmark(
  async () => {
    await someOperation();
  },
  {
    iterations: 100,
    warmup: 5,
    label: "operation-benchmark",
  }
);
console.log("Benchmark results:", benchmarkResults);
// Output: {
//   mean: 12.5,
//   median: 12,
//   min: 10,
//   max: 15,
//   iterations: 100,
//   totalTime: 1250,
//   ops: 80 // operations per second
// }

// Memory monitoring
const monitorId = rykit.performanceUtils.startMemoryMonitoring({
  interval: 1000, // Check every second
  maxSamples: 60, // Keep last 60 samples
  threshold: 100 * 1024 * 1024, // 100MB warning threshold
  onWarning: (data) => console.log("Memory warning:", data),
  onCritical: (data) => console.log("Memory critical:", data),
  onLeak: (data) => console.log("Possible memory leak detected:", data),
});

// Stop monitoring after some time
setTimeout(() => {
  rykit.performanceUtils.stopMemoryMonitoring(monitorId);
}, 60000);
```

### State Operations

```javascript
// Create basic state
const counterState = rykit.createState({
  count: 0,
  lastUpdated: null,
});

console.log(counterState.getState());
// Output: { count: 0, lastUpdated: null }

// Update state
counterState.setState((prev) => ({
  ...prev,
  count: prev.count + 1,
  lastUpdated: new Date().toISOString(),
}));

// Subscribe to changes
const unsubscribe = counterState.subscribe((state) => {
  console.log("State changed:", state);
});

// Complex state with computed values
const todoState = rykit.createState({
  todos: [],
  filter: "all",
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
  },
});

// Add todo with automatic stats update
const addTodo = (text) => {
  todoState.setState((prev) => ({
    ...prev,
    todos: [
      ...prev.todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ],
    stats: {
      ...prev.stats,
      total: prev.stats.total + 1,
      pending: prev.stats.pending + 1,
    },
  }));
};

// Toggle todo completion
const toggleTodo = (id) => {
  todoState.setState((prev) => {
    const newTodos = prev.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const completed = newTodos.filter((todo) => todo.completed).length;

    return {
      ...prev,
      todos: newTodos,
      stats: {
        ...prev.stats,
        completed,
        pending: prev.stats.total - completed,
      },
    };
  });
};

// Persistent state
const settingsState = rykit.createState(
  {
    theme: "light",
    language: "en",
    notifications: true,
  },
  {
    persist: true,
    key: "app-settings",
  }
);

// State with validation
const userState = rykit.createState(
  {
    name: "",
    email: "",
    age: 0,
  },
  {
    validate: {
      name: (value) => value.length >= 2,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      age: (value) => value >= 18,
    },
  }
);

// Update with validation
userState.setState(
  {
    name: "John",
    email: "john@example.com",
    age: 25,
  },
  (errors) => {
    if (errors) {
      console.log("Validation errors:", errors);
    }
  }
);

// State history
const documentState = rykit.createState(
  {
    content: "",
    version: 1,
  },
  {
    history: true,
    maxHistory: 10,
  }
);

// Update with history
documentState.setState((prev) => ({
  content: prev.content + "New content\n",
  version: prev.version + 1,
}));

// Undo last change
documentState.undo();

// Create state snapshot
const snapshot = documentState.createSnapshot();

// Restore from snapshot
documentState.restoreSnapshot(snapshot);
```

### String Operations

```javascript
// Word replacement
const text = "Hello world, hello JavaScript, hello Node.js";
const replaced = rykit.replaceWord(text, "hello", "hi");
console.log(replaced); // "Hello world, hi JavaScript, hi Node.js"

// String joining
const words = ["JavaScript", "is", "awesome"];
const joined = rykit.stringUtils.joinStrings(words, " ");
console.log(joined); // "JavaScript is awesome"

// UUID generation
const uuid = rykit.stringUtils.generateUUID();
console.log(uuid); // "123e4567-e89b-12d3-a456-426614174000"
console.log(uuid.length); // 36

// Case conversions
const sentence = "the quick brown fox jumps over the lazy dog";
console.log(rykit.toTitleCase(sentence));
// Output: "The Quick Brown Fox Jumps Over The Lazy Dog"

console.log(rykit.toCamelCase(sentence));
// Output: "theQuickBrownFoxJumpsOverTheLazyDog"

console.log(rykit.stringUtils.toPascalCase(sentence));
// Output: "TheQuickBrownFoxJumpsOverTheLazyDog"

console.log(rykit.stringUtils.toKebabCase(sentence));
// Output: "the-quick-brown-fox-jumps-over-the-lazy-dog"

console.log(rykit.stringUtils.toSnakeCase(sentence));
// Output: "the_quick_brown_fox_jumps_over_the_lazy_dog"

// String truncation
const longText = "This is a very long text that needs to be truncated";
console.log(rykit.stringUtils.truncate(longText, 20));
// Output: "This is a very lon..."

// String padding
console.log(rykit.stringUtils.padLeft("123", 5, "0")); // "00123"
console.log(rykit.stringUtils.padRight("123", 5, "0")); // "12300"

// String template
const template = "Hello {{name}}, you are {{age}} years old";
const data = { name: "John", age: 25 };
console.log(rykit.stringUtils.template(template, data));
// Output: "Hello John, you are 25 years old"

// String search and highlight
const searchText = "quick brown fox";
const searchTerm = "brown";
const highlighted = rykit.stringUtils.highlight(searchText, searchTerm);
console.log(highlighted); // "quick <mark>brown</mark> fox"

// String similarity
const str1 = "hello world";
const str2 = "hello word";
console.log(rykit.stringUtils.similarity(str1, str2)); // 0.9

// String formatting
const number = 1234567.89;
console.log(rykit.stringUtils.formatNumber(number)); // "1,234,567.89"
console.log(rykit.stringUtils.formatCurrency(number, "USD")); // "$1,234,567.89"

// String validation
console.log(rykit.stringUtils.isEmail("test@example.com")); // true
console.log(rykit.stringUtils.isURL("https://example.com")); // true
console.log(rykit.stringUtils.isIPAddress("192.168.1.1")); // true

// String encryption
const encrypted = rykit.stringUtils.encrypt("secret text", "password");
console.log(encrypted); // "U2FsdGVkX1..."
const decrypted = rykit.stringUtils.decrypt(encrypted, "password");
console.log(decrypted); // "secret text"
```

### Validation Operations

```javascript
// Basic validation
const isValidEmail = rykit.isEmail("test@example.com");
console.log(isValidEmail); // true

const isValidURL = rykit.isURL("https://example.com");
console.log(isValidURL); // true

const isValidDate = rykit.isDate("2024-02-20");
console.log(isValidDate); // true

// Schema validation
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

const validationResult = rykit.validate(validUser, userSchema);
console.log("Validation result:", validationResult);
// Output: { valid: true, errors: null }

// Custom pattern validation
rykit.addValidationPattern("username", /^[a-zA-Z0-9_]{3,20}$/);

rykit.addValidationPattern(
  "password",
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
);

const isValidUsername = rykit.validationUtils.testPattern(
  "username",
  "john_doe"
);
console.log(isValidUsername); // true

const isValidPassword = rykit.validationUtils.testPattern(
  "password",
  "StrongPass123!"
);
console.log(isValidPassword); // true

// Complex validation
const formSchema = {
  username: {
    type: "string",
    required: true,
    pattern: "username",
    messages: {
      pattern: "Username must be 3-20 characters long and alphanumeric",
    },
  },
  password: {
    type: "string",
    required: true,
    pattern: "password",
    messages: {
      pattern: "Password must contain letters, numbers and special characters",
    },
  },
  confirmPassword: {
    type: "string",
    required: true,
    custom: (value, data) => value === data.password,
    messages: {
      custom: "Passwords must match",
    },
  },
  age: {
    type: "number",
    required: true,
    min: 18,
    messages: {
      min: "Must be at least 18 years old",
    },
  },
  email: {
    type: "email",
    required: true,
    messages: {
      type: "Invalid email address",
    },
  },
};

const formData = {
  username: "john_doe",
  password: "StrongPass123!",
  confirmPassword: "StrongPass123!",
  age: 25,
  email: "john@example.com",
};

const formValidation = rykit.validate(formData, formSchema);
console.log("Form validation:", formValidation);
// Output: { valid: true, errors: null }

// Array validation
const arraySchema = {
  type: "array",
  minLength: 1,
  maxLength: 5,
  items: {
    type: "object",
    properties: {
      id: { type: "number", required: true },
      name: { type: "string", required: true },
      active: { type: "boolean", default: true },
    },
  },
};

const arrayData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2", active: false },
];

const arrayValidation = rykit.validate(arrayData, arraySchema);
console.log("Array validation:", arrayValidation);
// Output: { valid: true, errors: null }
```

## 📚 Examples

For detailed documentation and more examples, check out our example files:

- [Array Examples](examples/array-examples.js)
- [Color Examples](examples/color-examples.js)
- [Date Examples](examples/date-examples.js)
- [File Examples](examples/file-examples.js)
- [Math Examples](examples/math-examples.js)
- [Minecraft Examples](examples/minecraft-examples.js)
- [Object Examples](examples/object-examples.js)
- [Performance Examples](examples/performance-examples.js)
- [State Examples](examples/state-examples.js)
- [String Examples](examples/string-examples.js)
- [Validation Examples](examples/validation-examples.js)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Murat BULUT (Rynix)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ❓ Support

If you have any questions or need help:

- Open an [issue](https://github.com/rynix/rykit-v3/issues)
- Contact me on Discord: `fresyproduction`

## 🌟 Show your support

Give a ⭐️ if this project helped you!
