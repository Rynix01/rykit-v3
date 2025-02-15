import { createStore } from "./src/state/index.js";
import { DateUtils } from "./src/date/index.js";
import { ValidationUtils } from "./src/validation/index.js";
import { FileUtils } from "./src/file/index.js";
import { PerformanceUtils } from "./src/performance/index.js";
import { StringUtils } from "./src/string/index.js";
import { ArrayUtils } from "./src/array/index.js";
import { MathUtils } from "./src/math/index.js";
import { ObjectUtils } from "./src/object/index.js";
import { ColorUtils } from "./src/color/index.js";
import { MinecraftUtils } from "./src/minecraft/index.js";

class RyKit {
  constructor() {
    this.dateUtils = new DateUtils();
    this.validationUtils = new ValidationUtils();
    this.fileUtils = new FileUtils();
    this.performanceUtils = new PerformanceUtils();
    this.stringUtils = new StringUtils();
    this.arrayUtils = new ArrayUtils();
    this.mathUtils = new MathUtils();
    this.objectUtils = new ObjectUtils();
    this.colorUtils = new ColorUtils();
    this.minecraftUtils = new MinecraftUtils();
  }

  // State Management
  createState(initialState) {
    return createStore(initialState);
  }

  // Date Utilities
  formatDate(date, format) {
    return this.dateUtils.format(date, format);
  }

  formatTime(date, format) {
    return this.dateUtils.formatTime(date, format);
  }

  formatRelative(date) {
    return this.dateUtils.formatRelative(date);
  }

  setLocale(locale) {
    this.dateUtils.setLocale(locale);
  }

  setTimeZone(timeZone) {
    this.dateUtils.setTimeZone(timeZone);
  }

  // Validation methods
  validate(data, schema) {
    return this.validationUtils.validateSchema(data, schema);
  }

  isEmail(value) {
    return this.validationUtils.isEmail(value);
  }

  isURL(value) {
    return this.validationUtils.isURL(value);
  }

  isDate(value) {
    return this.validationUtils.isDate(value);
  }

  addValidationPattern(name, pattern) {
    this.validationUtils.addPattern(name, pattern);
  }

  // File operations
  async readFile(path) {
    return this.fileUtils.readFile(path);
  }

  async writeFile(path, content) {
    return this.fileUtils.writeFile(path, content);
  }

  async readJSON(path) {
    return this.fileUtils.readJSON(path);
  }

  async writeJSON(path, data, pretty = true) {
    return this.fileUtils.writeJSON(path, data, pretty);
  }

  async copyFile(source, destination) {
    return this.fileUtils.copyFile(source, destination);
  }

  async moveFile(source, destination) {
    return this.fileUtils.moveFile(source, destination);
  }

  async deleteFile(path) {
    return this.fileUtils.deleteFile(path);
  }

  // Directory operations
  async createDirectory(path) {
    return this.fileUtils.createDirectory(path);
  }

  async readDirectory(path) {
    return this.fileUtils.readDirectory(path);
  }

  async deleteDirectory(path) {
    return this.fileUtils.deleteDirectory(path);
  }

  // Path operations
  async fileExists(path) {
    return this.fileUtils.exists(path);
  }

  async isFile(path) {
    return this.fileUtils.isFile(path);
  }

  async isDirectory(path) {
    return this.fileUtils.isDirectory(path);
  }

  async getFileInfo(path) {
    return this.fileUtils.getFileInfo(path);
  }

  // Base64 operations
  async fileToBase64(path) {
    return this.fileUtils.fileToBase64(path);
  }

  async base64ToFile(base64String, path) {
    return this.fileUtils.base64ToFile(base64String, path);
  }

  // File type detection
  getMimeType(path) {
    return this.fileUtils.getMimeType(path);
  }

  async detectFileType(path) {
    return this.fileUtils.detectFileType(path);
  }

  // File size optimization
  async compressFile(source, destination) {
    return this.fileUtils.compressFile(source, destination);
  }

  async decompressFile(source, destination) {
    return this.fileUtils.decompressFile(source, destination);
  }

  // File upload/download
  async uploadFile(source, destination, options) {
    return this.fileUtils.uploadFile(source, destination, options);
  }

  async downloadFile(url, destination, options) {
    return this.fileUtils.downloadFile(url, destination, options);
  }

  // Utility
  formatFileSize(bytes) {
    return this.fileUtils.formatFileSize(bytes);
  }

  // Performance methods
  startTimer(label) {
    return this.performanceUtils.startTimer(label);
  }

  endTimer(label) {
    return this.performanceUtils.endTimer(label);
  }

  getMemoryUsage() {
    return this.performanceUtils.getMemoryUsage();
  }

  async getCPUUsage(duration) {
    return this.performanceUtils.getCPUUsage(duration);
  }

  getMetrics(label) {
    return this.performanceUtils.getMetrics(label);
  }

  async monitor(callback, options) {
    return this.performanceUtils.monitor(callback, options);
  }

  async benchmark(fn, options) {
    return this.performanceUtils.benchmark(fn, options);
  }

  clearPerformanceData(label) {
    return this.performanceUtils.clearMeasurements(label);
  }

  // String methods
  replaceWord(text, oldWord, newWord) {
    return this.stringUtils.replaceWord(text, oldWord, newWord);
  }

  toTitleCase(str) {
    return this.stringUtils.toTitleCase(str);
  }

  toCamelCase(str) {
    return this.stringUtils.toCamelCase(str);
  }

  // Array methods
  uniqueArray(array) {
    return this.arrayUtils.uniqueArray(array);
  }

  intersection(arr1, arr2) {
    return this.arrayUtils.intersection(arr1, arr2);
  }

  difference(arr1, arr2) {
    return this.arrayUtils.difference(arr1, arr2);
  }

  groupBy(array, key) {
    return this.arrayUtils.groupBy(array, key);
  }

  // Math methods
  factorial(n) {
    return this.mathUtils.factorial(n);
  }

  mean(numbers) {
    return this.mathUtils.mean(numbers);
  }

  median(numbers) {
    return this.mathUtils.median(numbers);
  }

  standardDeviation(numbers) {
    return this.mathUtils.standardDeviation(numbers);
  }

  // Object methods
  deepCopy(object) {
    return this.objectUtils.deepCopy(object);
  }

  mergeObjects(...objects) {
    return this.objectUtils.mergeObjects(...objects);
  }

  flattenObject(obj, prefix) {
    return this.objectUtils.flattenObject(obj, prefix);
  }

  // Performance methods
  measureExecutionTime(callback) {
    return this.performanceUtils.measureExecutionTime(callback);
  }

  asyncForEach(array, callback) {
    return this.performanceUtils.asyncForEach(array, callback);
  }

  // Color methods
  rgbToHsl(r, g, b) {
    return this.colorUtils.rgbToHsl(r, g, b);
  }

  hslToRgb(h, s, l) {
    return this.colorUtils.hslToRgb(h, s, l);
  }

  getBrightness(r, g, b) {
    return this.colorUtils.getBrightness(r, g, b);
  }

  isLight(r, g, b) {
    return this.colorUtils.isLight(r, g, b);
  }

  getRandomColor() {
    return this.colorUtils.getRandomColor();
  }

  getComplementaryColor(r, g, b) {
    return this.colorUtils.getComplementaryColor(r, g, b);
  }

  blendColors(color1, color2, ratio) {
    return this.colorUtils.blendColors(color1, color2, ratio);
  }

  // Minecraft methods
  async getServerStatus(ip, type) {
    return this.minecraftUtils.getServerStatus(ip, type);
  }

  async getServerIcon(ip) {
    return this.minecraftUtils.getServerIcon(ip);
  }

  async getServerBanner(ip) {
    return this.minecraftUtils.getServerBanner(ip);
  }

  async getServerInfo(ip, type) {
    return this.minecraftUtils.getServerInfo(ip, type);
  }
}

export default RyKit;
