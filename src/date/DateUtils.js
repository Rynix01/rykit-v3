class DateUtils {
  constructor() {
    this.locale = "en-US";
    this.timeZone = "Etc/UTC";
    this.availableTimeZones = this.getAvailableTimeZones();
  }

  setLocale(locale) {
    this.locale = locale;
  }

  setTimeZone(timeZone) {
    if (!this.isValidTimeZone(timeZone)) {
      throw new Error(
        `Invalid time zone: ${timeZone}. Available time zones: ${this.availableTimeZones.join(
          ", "
        )}`
      );
    }
    this.timeZone = timeZone;
  }

  // Relative date formatting (e.g., "2 hours ago", "3 days ago")
  formatRelative(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  }

  // Date comparison methods
  isToday(date) {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.isSameDay(date, yesterday);
  }

  isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.isSameDay(date, tomorrow);
  }

  isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Date formatting
  format(date, format = "full") {
    const options = this.getFormatOptions(format);
    return date.toLocaleDateString(this.locale, options);
  }

  formatTime(date, format = "full") {
    const options = this.getTimeFormatOptions(format);
    return date.toLocaleTimeString(this.locale, options);
  }

  // Date manipulation
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  // Date range calculation
  daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
  }

  // Helper methods
  getFormatOptions(format) {
    const options = {
      timeZone: this.timeZone,
    };

    switch (format) {
      case "full":
        return {
          ...options,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
      case "long":
        return {
          ...options,
          year: "numeric",
          month: "long",
          day: "numeric",
        };
      case "medium":
        return {
          ...options,
          year: "numeric",
          month: "short",
          day: "numeric",
        };
      case "short":
        return {
          ...options,
          year: "2-digit",
          month: "numeric",
          day: "numeric",
        };
      default:
        return options;
    }
  }

  getTimeFormatOptions(format) {
    const options = {
      timeZone: this.timeZone,
    };

    switch (format) {
      case "full":
        return {
          ...options,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
      case "medium":
        return {
          ...options,
          hour: "2-digit",
          minute: "2-digit",
        };
      case "short":
        return {
          ...options,
          hour: "numeric",
          minute: "2-digit",
        };
      default:
        return options;
    }
  }

  // Get all available time zones
  getAvailableTimeZones() {
    const timeZones = Intl.supportedValuesOf("timeZone");
    if (!timeZones.includes("Etc/UTC")) {
      timeZones.push("Etc/UTC");
    }
    return timeZones;
  }

  // Validate time zone
  isValidTimeZone(timeZone) {
    return this.availableTimeZones.includes(timeZone);
  }

  // Convert date to different time zone
  convertToTimeZone(date, timeZone) {
    if (!this.isValidTimeZone(timeZone)) {
      throw new Error(`Invalid time zone: ${timeZone}`);
    }

    return new Date(
      date.toLocaleString("en-US", {
        timeZone: timeZone,
      })
    );
  }

  // Get current time in specific time zone
  getCurrentTimeIn(timeZone) {
    if (!this.isValidTimeZone(timeZone)) {
      throw new Error(`Invalid time zone: ${timeZone}`);
    }

    const options = {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Date(new Date().toLocaleString("en-US", options));
  }

  // Get time zone offset
  getTimeZoneOffset(timeZone) {
    if (!this.isValidTimeZone(timeZone)) {
      throw new Error(`Invalid time zone: ${timeZone}`);
    }

    const timeZoneDate = new Date().toLocaleString("en-US", {
      timeZone,
      timeZoneName: "short",
    });

    return timeZoneDate.split(" ").pop();
  }
}

export default DateUtils;
