const oldBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua",
  "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
  "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah",
  "Haggai", "Zechariah", "Malachi"
];

const newBooks = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
  "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

function drawWheel(canvasId, books) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2;
  const slice = (2 * Math.PI) / books.length;

  for (let i = 0; i < books.length; i++) {
    const angle = i * slice;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angle, angle + slice);
    ctx.fillStyle = `hsl(${(i * 360) / books.length}, 70%, 70%)`;
    ctx.fill();
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + slice / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#111";
    ctx.font = "12px sans-serif";
    ctx.fillText(books[i], radius - 10, 4);
    ctx.restore();
  }
}

function spinWheel(type) {
  const books = type === "old" ? oldBooks : newBooks;
  const canvasId = type === "old" ? "oldWheel" : "newWheel";
  const ctx = document.getElementById(canvasId).getContext("2d");

  const winner = books[Math.floor(Math.random() * books.length)];
  const chapter = Math.floor(Math.random() * 50) + 1;
  alert(`${type === "old" ? "Old" : "New"} Testament: ${winner} ${chapter}`);
}

window.onload = () => {
  drawWheel("oldWheel", oldBooks);
  drawWheel("newWheel", newBooks);
};
