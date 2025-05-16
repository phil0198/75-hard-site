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
  const canvasId = type === "old" ? "oldWheel" : "newWheel";
  const randomIndex = Math.floor(Math.random() * books.length);
  const chosenBook = books[randomIndex];
  const chosenChapter = Math.ceil(Math.random() * 30);
  const displayText = `${chosenBook} ${chosenChapter}`;

  // Display result under the wheel
  const resultElement = document.getElementById(`${type}Result`);
  resultElement.textContent = displayText;

  // Save to localStorage so it can be accessed on journal page
  localStorage.setItem(`${type}TestamentReading`, displayText);
}

// Initialize wheels and load saved results if available
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
