<?php
// Data latih contoh (Anda harus menggantinya dengan data yang sesuai)
$trainingData = array(
    array("good", "positive"),
    array("bad", "negative"),
    array("excellent", "positive"),
    // Tambahkan data latih lainnya di sini
);

// Fungsi Euclidean Distance
function euclideanDistance($point1, $point2)
{
    $sum = 0;
    for ($i = 0; $i < count($point1); $i++) {
        $sum += pow(ord($point1[$i]) - ord($point2[$i]), 2);
    }
    return sqrt($sum);
}

// Fungsi KNN untuk klasifikasi
function classifyKNN($k, $trainingData, $newData)
{
    $distances = array();

    foreach ($trainingData as $data) {
        $distance = euclideanDistance($data[0], $newData);
        $distances[] = array($data, $distance);
    }

    usort($distances, function ($a, $b) {
        return $a[1] - $b[1];
    });

    $neighbors = array_slice($distances, 0, $k);

    $classVotes = array();

    foreach ($neighbors as $neighbor) {
        $class = $neighbor[0][1];
        if (!isset($classVotes[$class])) {
            $classVotes[$class] = 0;
        }
        $classVotes[$class]++;
    }

    arsort($classVotes);
    return key($classVotes);
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Klasifikasi Teks dengan KNN</title>
</head>

<body>
    <h1>Klasifikasi Teks dengan KNN</h1>

    <form method="post" action="">
        <label for="text">Masukkan teks:</label>
        <input type="text" name="text" id="text">
        <input type="submit" value="Klasifikasikan">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $inputText = $_POST["text"];
        $k = 3; // Jumlah tetangga terdekat yang akan digunakan
        $result = classifyKNN($k, $trainingData, $inputText);
        echo "Hasil klasifikasi untuk teks '$inputText': $result";
    }
    ?>

</body>

</html>