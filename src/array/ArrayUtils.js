class ArrayUtils {
  // Benzersiz array oluşturma
  uniqueArray(array) {
    return [...new Set(array)];
  }

  // Random eleman seçme
  getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Array karıştırma
  shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Array parçalama
  chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  // Array filtreleme
  filterArray(array, callback) {
    return array.filter(callback);
  }

  // Array sıralama
  sortArray(array, ascending = true) {
    return [...array].sort((a, b) => (ascending ? a - b : b - a));
  }

  // Array'de bulma ve değiştirme
  findAndReplace(array, findValue, replaceValue) {
    return array.map((item) => (item === findValue ? replaceValue : item));
  }

  // Array intersection
  intersection(arr1, arr2) {
    return arr1.filter((item) => arr2.includes(item));
  }

  // Array difference
  difference(arr1, arr2) {
    return arr1.filter((item) => !arr2.includes(item));
  }

  // Array grouping
  groupBy(array, key) {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  }
}

export default ArrayUtils;
