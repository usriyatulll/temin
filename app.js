const fs = require("fs");

// Baca file CSV secara sinkron
const csvContent = fs.readFileSync("nama_file.csv", "utf-8"); // Ganti 'nama_file.csv' dengan nama file CSV Anda

// Pisahkan baris-baris dalam file CSV
const lines = csvContent.split("\n");

const mergedReviews = [];

// Loop melalui baris-baris dalam file CSV
for (let i = 1; i < lines.length; i++) {
  // Mulai dari indeks 1 untuk menghindari baris header
  const columns = lines[i].split(",");

  // Ambil nilai dari kolom "PositiveReview" dan "NegativeReview"
  const positiveReview = columns[1];
  const negativeReview = columns[2];

  // Buat kolom "Label" sesuai dengan asal ulasan
  const positiveEntry = {
    Text: positiveReview,
    Label: "positive",
  };
  const negativeEntry = {
    Text: negativeReview,
    Label: "negative",
  };

  // Tambahkan entri positif dan negatif ke dalam array yang digabungkan
  mergedReviews.push(positiveEntry, negativeEntry);
}

// Lakukan apa pun yang Anda inginkan dengan data yang telah digabungkan
console.log("Merged Reviews:", mergedReviews);

// Function to preprocess text (you can customize this further)
function preprocessText(text) {
  return text.toLowerCase().split(" ");
}

// Function to calculate the Euclidean distance between two text vectors
function euclideanDistance(text1, text2) {
  const vec1 = preprocessText(text1);
  const vec2 = preprocessText(text2);

  const uniqueWords = [...new Set([...vec1, ...vec2])];

  let sum = 0;
  for (const word of uniqueWords) {
    const count1 = vec1.filter((w) => w === word).length;
    const count2 = vec2.filter((w) => w === word).length;
    sum += Math.pow(count1 - count2, 2);
  }

  return Math.sqrt(sum);
}

// KNN function for text classification
function knnTextClassifier(newText, k) {
  // Calculate distances to all data points
  const distances = dataset.map((data) => ({
    text: data.text,
    label: data.label,
    distance: euclideanDistance(newText, data.text),
  }));

  // Sort distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Take the k-nearest neighbors
  const neighbors = distances.slice(0, k);

  // Count the occurrences of each label among the neighbors
  const labelCounts = {};
  for (const neighbor of neighbors) {
    if (labelCounts[neighbor.label]) {
      labelCounts[neighbor.label]++;
    } else {
      labelCounts[neighbor.label] = 1;
    }
  }

  // Find the label with the most occurrences
  let maxCount = 0;
  let predictedLabel = null;
  for (const label in labelCounts) {
    if (labelCounts[label] > maxCount) {
      maxCount = labelCounts[label];
      predictedLabel = label;
    }
  }

  return predictedLabel;
}

// Test the KNN classifier
const newText = "This is a test review bagus bgt";
const k = 3;
const predictedClass = knnTextClassifier(newText, k);
console.log(`Predicted class: ${predictedClass}`);
