// plinko.js

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

function pickRandomReading(testament) {
  const books = testament === 'old' ? oldTestamentBooks : newTestamentBooks;
  const book = books[Math.floor(Math.random() * books.length)];
  const maxChapter = bibleChapters[book];
  const chapter = Math.ceil(Math.random() * maxChapter);
  return `${book} ${chapter}`;
}

function createPlinkoBoard(canvasId, type) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const rows = 7;
  const cols = 7;
  const radius = 5;

  ctx.clearRect(0, 0, width, height);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col + 1) * (width / (cols + 1));
      const y = (row + 1) * (height / (rows + 2));
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ccc";
      ctx.fill();
    }
  }
}

function dropBall(type) {
  const canvasId = type === 'old' ? 'oldCanvas' : 'newCanvas';
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const ballRadius = 7;

  let x = width / 2;
  let y = 0;
  let vx = 0;
  let vy = 2;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    createPlinkoBoard(canvasId, type);

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();

    y += vy;
    x += (Math.random() - 0.5) * 4;

    if (y + ballRadius < height - 20) {
      requestAnimationFrame(animate);
    } else {
      const result = pickRandomReading(type);
      document.getElementById(`${type}Result`).textContent = result;
      localStorage.setItem(`${type}TestamentReading`, result);
    }
  }

  animate();
}

window.onload = () => {
  createPlinkoBoard("oldCanvas", "old");
  createPlinkoBoard("newCanvas", "new");

  const oldSaved = localStorage.getItem("oldTestamentReading");
  const newSaved = localStorage.getItem("newTestamentReading");
  if (oldSaved) document.getElementById("oldResult").textContent = oldSaved;
  if (newSaved) document.getElementById("newResult").textContent = newSaved;
};
