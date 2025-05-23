<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Plinko Bible Selector</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #f0f4f8;
      padding: 2rem;
      text-align: center;
    }
    canvas {
      border: 2px solid #1e293b;
      background: white;
      display: block;
      margin: 0 auto;
    }
    button {
      margin-top: 1rem;
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      background-color: #1e40af;
      color: white;
      cursor: pointer;
    }
    #results {
      margin-top: 1.5rem;
      font-size: 1.1rem;
    }
    #results span {
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>Plinko Bible Picker</h1>
  <canvas id="plinkoCanvas" width="400" height="500"></canvas>

  <div>
    <button onclick="dropBall('old')">Drop Old Testament Ball</button>
    <button onclick="dropBall('new')">Drop New Testament Ball</button>
    <button onclick="resetSelections()">Reset Books</button>
    <div id="results">
      <p>Old Testament: <span id="oldResult">None</span></p>
      <p>New Testament: <span id="newResult">None</span></p>
    </div>
    <button onclick="goToJournal()">Go to Journal</button>
  </div>

  <script>
    const canvas = document.getElementById('plinkoCanvas');
    const ctx = canvas.getContext('2d');

    const bibleStructure = {
      old: {
        'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
        'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
        '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
        'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150,
        'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8,
        'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12,
        'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7,
        'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4
      },
      new: {
        'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
        'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13,
        'Galatians': 6, 'Ephesians': 6, 'Philippians': 4, 'Colossians': 4,
        '1 Thessalonians': 5, '2 Thessalonians': 3,
        '1 Timothy': 6, '2 Timothy': 4,
        'Titus': 3, 'Philemon': 1,
        'Hebrews': 13, 'James': 5,
        '1 Peter': 5, '2 Peter': 3,
        '1 John': 5, '2 John': 1, '3 John': 1,
        'Jude': 1, 'Revelation': 22
      }
    };

    function drawBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col <= row; col++) {
          const x = 50 + col * 40 + (row % 2) * 20;
          const y = 50 + row * 50;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#1e293b";
          ctx.fill();
        }
      }
    }

    function pickRandomReading(type) {
      const books = Object.keys(bibleStructure[type]);
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const maxChapter = bibleStructure[type][randomBook];
      const chapter = Math.floor(Math.random() * maxChapter) + 1;
      return `${randomBook} ${chapter}`;
    }

    function dropBall(type) {
      drawBoard();
      const radius = 8;
      let x = canvas.width / 2;
      let y = radius;
      const color = type === 'old' ? '#1e40af' : '#22c55e';

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        y += 5 + Math.random() * 2;
        x += (Math.random() - 0.5) * 8;

        if (y < canvas.height - 30) {
          requestAnimationFrame(animate);
        } else {
          const result = pickRandomReading(type);
          if (type === 'old') {
            sessionStorage.setItem('oldTestamentResult', result);
            document.getElementById('oldResult').textContent = result;
          } else {
            sessionStorage.setItem('newTestamentResult', result);
            document.getElementById('newResult').textContent = result;
          }
        }
      }

      animate();
    }

    function resetSelections() {
      sessionStorage.removeItem('oldTestamentResult');
      sessionStorage.removeItem('newTestamentResult');
      document.getElementById('oldResult').textContent = 'None';
      document.getElementById('newResult').textContent = 'None';
      drawBoard();
    }

    function goToJournal() {
      window.location.href = 'journal.html';
    }

    drawBoard();
  </script>
</body>
</html>
