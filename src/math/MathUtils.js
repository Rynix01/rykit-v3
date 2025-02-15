class MathUtils {
  // Faktöriyel hesaplama
  factorial(n) {
    if (n < 0) throw new Error("Negative numbers are not allowed");
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  // Permütasyon hesaplama
  permutation(n, r) {
    if (n < r) throw new Error("n must be greater than or equal to r");
    return this.factorial(n) / this.factorial(n - r);
  }

  // Kombinasyon hesaplama
  combination(n, r) {
    if (n < r) throw new Error("n must be greater than or equal to r");
    return this.permutation(n, r) / this.factorial(r);
  }

  // Trigonometrik fonksiyonlar (derece cinsinden)
  sin(degrees) {
    return Math.sin((degrees * Math.PI) / 180);
  }

  cos(degrees) {
    return Math.cos((degrees * Math.PI) / 180);
  }

  tan(degrees) {
    return Math.tan((degrees * Math.PI) / 180);
  }

  // Random sayı üretme
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Statistical functions
  mean(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }

  median(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];
  }

  standardDeviation(numbers) {
    const avg = this.mean(numbers);
    const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
    return Math.sqrt(this.mean(squareDiffs));
  }
}

export default MathUtils;
