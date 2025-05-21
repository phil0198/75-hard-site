const oldTestamentBooks = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
  "Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
  "Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations",
  "Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk",
  "Zephaniah","Haggai","Zechariah","Malachi"
];

const newTestamentBooks = [
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians",
  "Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians",
  "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James",
  "1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"
];

const bibleChapters = {
  "Genesis":50,"Exodus":40,"Leviticus":27,"Numbers":36,"Deuteronomy":34,
  "Joshua":24,"Judges":21,"Ruth":4,"1 Samuel":31,"2 Samuel":24,"1 Kings":22,"2 Kings":25,"1 Chronicles":29,"2 Chronicles":36,"Ezra":10,
  "Nehemiah":13,"Esther":10,"Job":42,"Psalms":150,"Proverbs":31,"Ecclesiastes":12,"Song of Solomon":8,"Isaiah":66,"Jeremiah":52,"Lamentations":5,
  "Ezekiel":48,"Daniel":12,"Hosea":14,"Joel":3,"Amos":9,"Obadiah":1,"Jonah":4,"Micah":7,"Nahum":3,"Habakkuk":3,"Zephaniah":3,"Haggai":2,
  "Zechariah":14,"Malachi":4,"Matthew":28,"Mark":16,"Luke":24,"John":21,"Acts":28,"Romans":16,"1 Corinthians":16,"2 Corinthians":13,
  "Galatians":6,"Ephesians":6,"Philippians":4,"Colossians":4,"1 Thessalonians":5,"2 Thessalonians":3,"1 Timothy":6,"2 Timothy":4,
  "Titus":3,"Philemon":1,"Hebrews":13,"James":5,"1 Peter":5,"2 Peter":3,"1 John":5,"2 John":1,"3 John":1,"Jude":1,"Revelation":22
};

const angles = { old: 0, new: 0 };
const spinning = { old: false, new: false };

function drawWheel(canvasId, books, rotation = 0) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2;
  const arc = 2 * Math.PI / books.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  books.forEach((book, i) => {
    const angle = i * arc + rotation;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(i / books.length) * 360}, 70%, 70%)`;
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(book, radius - 10, 4);
    ctx.restore();
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function startSpin(type) {
  if (spinning[type]) return;

  const books = type === "old" ? oldTestamentBooks : newTestamentBooks;
  spinning[type] = true;

  const arc = 2 * Math.PI / books.length;
  const stopAngle = 2 * Math.PI * 5 + Math.random() * 2 * Math.PI;
  const duration = 6530;
  const start = performance.now();
  const initial = angles[type];

  function animate(ts) {
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    angles[type] = initial + (stopAngle - initial) * easeOutCubic(progress);
    drawWheel(type + "Wheel", books, angles[type]);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning[type] = false;
      const final = angles[type] % (2 * Math.PI);
      const index = Math.floor((books.length - (final / arc)) % books.length);
      const book = books[index];
      const chapter = Math.ceil(Math.random() * bibleChapters[book]);
      const resultText = `${book} ${chapter}`;
      document.getElementById(type + "Result").textContent = resultText;
      localStorage.setItem(type + "TestamentReading", resultText);
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", () => {
  drawWheel("oldWheel", oldTestamentBooks);
  drawWheel("newWheel", newTestamentBooks);

  const oldSaved = localStorage.getItem("oldTestamentReading");
  const newSaved = localStorage.getItem("newTestamentReading");

  if (oldSaved) document.getElementById("oldResult").textContent = oldSaved;
  if (newSaved) document.getElementById("newResult").textContent = newSaved;

  // Load daily scripture
  const verses = [
    "Psalm 23:1 — The Lord is my shepherd; I shall not want.",
    "Philippians 4:13 — I can do all things through Christ who strengthens me.",
    "John 3:16 — For God so loved the world...",
    "Romans 8:28 — And we know that in all things God works for the good...",
    "Isaiah 40:31 — But those who hope in the Lord will renew their strength.",
    "Jeremiah 29:11 — For I know the plans I have for you...",
    "Proverbs 3:5 — Trust in the Lord with all your heart...",
    "Matthew 11:28 — Come to me, all who labor...",
    "Psalm 46:1 — God is our refuge and strength...",
    "James 1:2 — Consider it pure joy..."
  ];
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const verse = verses[dayOfYear % verses.length];
  const ref = verse.split(" — ")[0];
  document.getElementById("verseText").textContent = `Scripture of the Day: ${verse}`;
  document.getElementById("learnMoreLink").href = `https://www.biblegateway.com/quicksearch/?quicksearch=${encodeURIComponent(ref)}&version=ESV`;
});
