<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bible Reading Spinner</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #f0f4f8;
      text-align: center;
      padding: 2rem;
    }
    canvas {
      margin: 1rem 0;
    }
    .spin-btn {
      background-color: #3b82f6;
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 0.5rem;
    }
    .result {
      margin-top: 0.5rem;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <h1>📖 Spin for a Bible Chapter</h1>

  <div>
    <h2>Old Testament</h2>
    <canvas id="oldWheel" width="300" height="300"></canvas>
    <button class="spin-btn" onclick="spinWheel('old')">Spin Old Testament</button>
    <div id="oldResult" class="result"></div>
  </div>

  <div>
    <h2>New Testament</h2>
    <canvas id="newWheel" width="300" height="300"></canvas>
    <button class="spin-btn" onclick="spinWheel('new')">Spin New Testament</button>
    <div id="newResult" class="result"></div>
  </div>

  <script>
    const oldTestamentBooks = [
      "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
      "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
      "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
      "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
      "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
      "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
      "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
      "Zephaniah", "Haggai", "Zechariah", "Malachi"
    ];

    const newTestamentBooks = [
      "Matthew", "Mark", "Luke", "John", "Acts",
      "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
      "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
      "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
      "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
      "Jude", "Revelation"
    ];

    const bibleChapters = {
      "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
      "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
      "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10,
      "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalms": 150, "Proverbs": 31,
      "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66, "Jeremiah": 52, "Lamentations": 5,
      "Ezekiel": 48, "Daniel": 12, "Hosea": 14, "Joel": 3, "Amos": 9,
      "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3,
      "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4,
      "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28,
      "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6,
      "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6,
      "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5,
      "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1,
      "Jude": 1, "Revelation": 22
    };

    function drawWheel(canvasId, books) {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      const radius = canvas.width / 2;
      const center = radius;
      const arc = (2 * Math.PI) / books.length;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      books.forEach((book, i) => {
        const angle = i * arc;
        ctx.beginPath();
        ctx.fillStyle = `hsl(${(i / books.length) * 360}, 70%, 70%)`;
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, angle, angle + arc);
        ctx.fill();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(book, radius - 10, 4);
        ctx.restore();
      });
    }

    function spinWheel(type) {
      const books = type === "old" ? oldTestamentBooks : newTestamentBooks;
      const randomIndex = Math.floor(Math.random() * books.length);
      const chosenBook = books[randomIndex];
      const maxChapter = bibleChapters[chosenBook];
      const chosenChapter = Math.ceil(Math.random() * maxChapter);
      const displayText = `${chosenBook} ${chosenChapter}`;

      document.getElementById(`${type}Result`).textContent = displayText;
      localStorage.setItem(`${type}TestamentReading`, displayText);
    }

    window.onload = function () {
      drawWheel("oldWheel", oldTestamentBooks);
      drawWheel("newWheel", newTestamentBooks);

      const oldSaved = localStorage.getItem("oldTestamentReading");
      const newSaved = localStorage.getItem("newTestamentReading");

      if (oldSaved) {
        document.getElementById("oldResult").textContent = oldSaved;
      }
      if (newSaved) {
        document.getElementById("newResult").textContent = newSaved;
      }
    };
  </script>
</body>
</html>
