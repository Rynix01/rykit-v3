import { promises as fs } from "fs";
import path from "path";
import { Buffer } from "buffer";
import { lookup } from "mime-types";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import zlib from "zlib";

class FileUtils {
  constructor() {
    this.encoding = "utf-8";
    this.maxFileSize = 50 * 1024 * 1024; // 50MB varsayılan limit
  }

  // File reading operations
  async readFile(filePath) {
    try {
      return await fs.readFile(filePath, this.encoding);
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  async readJSON(filePath) {
    try {
      const content = await this.readFile(filePath);
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse JSON file: ${error.message}`);
    }
  }

  // File writing operations
  async writeFile(filePath, content) {
    try {
      await fs.writeFile(filePath, content, this.encoding);
      return true;
    } catch (error) {
      throw new Error(`Failed to write file: ${error.message}`);
    }
  }

  async writeJSON(filePath, data, pretty = true) {
    try {
      const content = pretty
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);
      return await this.writeFile(filePath, content);
    } catch (error) {
      throw new Error(`Failed to write JSON file: ${error.message}`);
    }
  }

  // File operations
  async copyFile(source, destination) {
    try {
      await fs.copyFile(source, destination);
      return true;
    } catch (error) {
      throw new Error(`Failed to copy file: ${error.message}`);
    }
  }

  async moveFile(source, destination) {
    try {
      await fs.rename(source, destination);
      return true;
    } catch (error) {
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }

  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  // Directory operations
  async createDirectory(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return true;
    } catch (error) {
      throw new Error(`Failed to create directory: ${error.message}`);
    }
  }

  async readDirectory(dirPath) {
    try {
      return await fs.readdir(dirPath);
    } catch (error) {
      throw new Error(`Failed to read directory: ${error.message}`);
    }
  }

  async deleteDirectory(dirPath) {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete directory: ${error.message}`);
    }
  }

  // Path operations
  async exists(path) {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async isFile(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return stats.isFile();
    } catch {
      return false;
    }
  }

  async isDirectory(dirPath) {
    try {
      const stats = await fs.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  // File info
  async getFileInfo(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
      };
    } catch (error) {
      throw new Error(`Failed to get file info: ${error.message}`);
    }
  }

  // Path utilities
  getExtension(filePath) {
    return path.extname(filePath);
  }

  getFileName(filePath) {
    return path.basename(filePath);
  }

  getDirectory(filePath) {
    return path.dirname(filePath);
  }

  joinPaths(...paths) {
    return path.join(...paths);
  }

  // Base64 operations
  async fileToBase64(filePath) {
    try {
      const buffer = await fs.readFile(filePath);
      return buffer.toString("base64");
    } catch (error) {
      throw new Error(`Failed to convert file to base64: ${error.message}`);
    }
  }

  async base64ToFile(base64String, filePath) {
    try {
      const buffer = Buffer.from(base64String, "base64");
      await fs.writeFile(filePath, buffer);
      return true;
    } catch (error) {
      throw new Error(`Failed to save base64 to file: ${error.message}`);
    }
  }

  // File type detection
  getMimeType(filePath) {
    return lookup(filePath) || "application/octet-stream";
  }

  async detectFileType(filePath) {
    try {
      const buffer = await fs.readFile(filePath, { length: 4100 });
      return {
        mimeType: this.getMimeType(filePath),
        extension: path.extname(filePath),
        size: buffer.length,
        encoding: this.detectEncoding(buffer),
      };
    } catch (error) {
      throw new Error(`Failed to detect file type: ${error.message}`);
    }
  }

  detectEncoding(buffer) {
    // Basic encoding detection
    const utf8Pattern = /^[\x09\x0A\x0D\x20-\x7E]*$/;
    const sample = buffer.toString().slice(0, 1000);
    return utf8Pattern.test(sample) ? "utf8" : "binary";
  }

  // File size optimization
  async compressFile(sourcePath, destinationPath) {
    try {
      const gzip = zlib.createGzip();
      const source = createReadStream(sourcePath);
      const destination = createWriteStream(destinationPath);

      await pipeline(source, gzip, destination);
      return true;
    } catch (error) {
      throw new Error(`Failed to compress file: ${error.message}`);
    }
  }

  async decompressFile(sourcePath, destinationPath) {
    try {
      const gunzip = zlib.createGunzip();
      const source = createReadStream(sourcePath);
      const destination = createWriteStream(destinationPath);

      await pipeline(source, gunzip, destination);
      return true;
    } catch (error) {
      throw new Error(`Failed to decompress file: ${error.message}`);
    }
  }

  // File upload/download helpers
  async uploadFile(sourcePath, destinationPath, options = {}) {
    try {
      const stats = await fs.stat(sourcePath);

      // Check file size
      if (stats.size > (options.maxSize || this.maxFileSize)) {
        throw new Error("File size exceeds limit");
      }

      // Check file type if specified
      if (options.allowedTypes) {
        const mimeType = this.getMimeType(sourcePath);
        if (!options.allowedTypes.includes(mimeType)) {
          throw new Error("File type not allowed");
        }
      }

      // Create destination directory if it doesn't exist
      await fs.mkdir(path.dirname(destinationPath), { recursive: true });

      // Copy file with progress tracking
      const source = createReadStream(sourcePath);
      const destination = createWriteStream(destinationPath);

      let bytesTransferred = 0;
      source.on("data", (chunk) => {
        bytesTransferred += chunk.length;
        if (options.onProgress) {
          const progress = (bytesTransferred / stats.size) * 100;
          options.onProgress(progress);
        }
      });

      await pipeline(source, destination);
      return {
        size: stats.size,
        mimeType: this.getMimeType(sourcePath),
        path: destinationPath,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async downloadFile(url, destinationPath, options = {}) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      const contentType = response.headers.get("content-type");

      // Check file size if content-length is available
      if (
        contentLength &&
        parseInt(contentLength) > (options.maxSize || this.maxFileSize)
      ) {
        throw new Error("File size exceeds limit");
      }

      // Check content type if specified - daha esnek kontrol
      if (options.allowedTypes) {
        const isAllowed = options.allowedTypes.some(
          (type) =>
            contentType?.includes(type) ||
            type === "*/*" ||
            type === contentType
        );
        if (!isAllowed) {
          throw new Error(
            `File type ${contentType} not allowed. Allowed types: ${options.allowedTypes.join(
              ", "
            )}`
          );
        }
      }

      // Create destination directory if it doesn't exist
      await fs.mkdir(path.dirname(destinationPath), { recursive: true });

      const destination = createWriteStream(destinationPath);
      const body = response.body;

      if (body.pipe) {
        await pipeline(body, destination);
      } else {
        const buffer = await response.arrayBuffer();
        await fs.writeFile(destinationPath, Buffer.from(buffer));
      }

      return {
        size: contentLength,
        mimeType: contentType,
        path: destinationPath,
      };
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  // File size formatting helper
  formatFileSize(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}

export default FileUtils;
