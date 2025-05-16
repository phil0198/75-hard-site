// Wheel rendering and spinning script

const oldBooks = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
  'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

const newBooks = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

function spinWheel(type) {
  const books = type === 'old' ? oldBooks : newBooks;
  const canvas = document.getElementById(type + 'Wheel');
  const ctx = canvas.getContext('2d');
  const resultDiv = document.getElementById(type + 'Result');

  const numSegments = books.length;
  const angleStep = (2 * Math.PI) / numSegments;
  const radius = canvas.width / 2;

  // Random angle spin (simulate spin)
  let angle = Math.random() * 2 * Math.PI + 6 * 2 * Math.PI;

  // Draw animation
  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const currentAngle = angle - (elapsed / 1000) * 6;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * angleStep + currentAngle;
      const endAngle = startAngle + angleStep;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 70%, 70%)`;
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + angleStep / 2);
      ctx.fillStyle = '#111';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(books[i], radius - 10, 4);
      ctx.restore();
    }

    if (elapsed < 3000) {
      requestAnimationFrame(animate);
    } else {
      // Final selection
      const finalIndex = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI)) / angleStep);
      const chapter = Math.floor(Math.random() * 40) + 1;
      resultDiv.innerHTML = `<strong>${type === 'old' ? 'Old' : 'New'} Testament:</strong> ${books[finalIndex]} ${chapter}`;
    }
  }

  requestAnimationFrame(animate);
}
