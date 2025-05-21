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

// This sets up the game canvas and physics (p5.js or Matter.js needed)
function setupPlinkoBoard(type) {
  const container = document.getElementById(`${type}-plinko`);
  container.innerHTML = `<canvas id="${type}-canvas"></canvas><div class="plinko-result" id="${type}-result">Drop the ball!</div>`;

  const canvas = document.getElementById(`${type}-canvas`);
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 400;

  const books = type === 'old' ? oldTestamentBooks : newTestamentBooks;
  const slots = books.length;
  const slotWidth = canvas.width / slots;

  // Draw bottom slots with labels
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < slots; i++) {
    ctx.fillStyle = `hsl(${(i / slots) * 360}, 80%, 70%)`;
    ctx.fillRect(i * slotWidth, canvas.height - 30, slotWidth - 2, 30);
    ctx.fillStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.fillText(books[i], i * slotWidth + 4, canvas.height - 10);
  }

  // Drop ball simulation (basic bounce)
  let ballX = canvas.width / 2;
  let ballY = 0;
  let velocity = 0;
  const gravity = 0.5;
  const ballRadius = 5;
  const interval = setInterval(() => {
    velocity += gravity;
    ballY += velocity;

    ctx.clearRect(0, 0, canvas.width, canvas.height - 40);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();

    if (ballY >= canvas.height - 35) {
      const chosenIndex = Math.floor(ballX / slotWidth);
      const book = books[chosenIndex];
      const chapter = Math.ceil(Math.random() *  (type === 'old' ? 50 : 28)); // Estimate
      document.getElementById(`${type}-result`).textContent = `${book} ${chapter}`;
      clearInterval(interval);
    }
  }, 30);
}

// Example triggers
// setupPlinkoBoard('old');
// setupPlinkoBoard('new');
