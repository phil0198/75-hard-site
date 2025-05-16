const oldTestamentBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
  "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah",
  "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah",
  "Haggai", "Zechariah", "Malachi"
];

const newTestamentBooks = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus",
  "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
];

function spinWheel() {
  const old = oldTestamentBooks[Math.floor(Math.random() * oldTestamentBooks.length)];
  const newBook = newTestamentBooks[Math.floor(Math.random() * newTestamentBooks.length)];

  document.getElementById("old-testament").textContent = `Old Testament:\n${old}`;
  document.getElementById("new-testament").textContent = `New Testament:\n${newBook}`;

  const wheel = document.getElementById("wheel");
  wheel.classList.remove("spin");
  void wheel.offsetWidth; // reset animation
  wheel.classList.add("spin");
}
