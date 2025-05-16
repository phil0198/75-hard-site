<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prayer Generator</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #f9fafb;
      color: #1f2937;
      padding: 2rem;
      text-align: center;
    }
    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    nav a {
      text-decoration: none;
      padding: 0.5rem 1rem;
      background-color: #1e293b;
      color: white;
      border-radius: 6px;
      font-weight: 500;
    }
    nav a:hover {
      background-color: #334155;
    }
    .emotion-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    .emotion-card {
      background: #fff;
      border: 2px solid #e5e7eb;
      padding: 1rem;
      border-radius: 10px;
      cursor: pointer;
    }
    .emotion-card.selected {
      border-color: #3b82f6;
      background: #e0f2fe;
    }
    textarea {
      width: 100%;
      max-width: 600px;
      margin: 1rem auto;
      display: block;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    button {
      background: #0f172a;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
      margin-top: 1rem;
    }
    button:hover {
      background: #1e293b;
    }
    .prayer-box {
      background: #f1f5f9;
      padding: 2rem;
      margin-top: 2rem;
      border-radius: 12px;
      font-style: italic;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="journal.html">Journal</a>
    <a href="prayer-generator.html">Prayer Generator</a>
    <a href="past-entries.html">Past Entries</a>
  </nav>

  <h1>Prayer Generator</h1>
  <p>Select how you're feeling and describe your situation.</p>

  <div class="emotion-grid" id="emotionGrid">
    ["Anxious", "Grateful", "Lonely", "Confused", "Joyful", "Angry", "Sad", "Hopeful", "Guilty", "Worried", "Lost", "Peaceful"].map((e, i) =>
      `<div class="emotion-card" onclick="toggleEmotion(this, '${e}')">${e}</div>`
    ).join('')
  </div>

  <textarea id="situation" placeholder="Tell God what you're going through..."></textarea>

  <button onclick="generatePrayer()">Generate Prayer</button>

  <div id="prayerResult" class="prayer-box"></div>

  <script>
    const selectedEmotions = new Set();

    function toggleEmotion(card, emotion) {
      if (selectedEmotions.has(emotion)) {
        selectedEmotions.delete(emotion);
        card.classList.remove('selected');
      } else {
        selectedEmotions.add(emotion);
        card.classList.add('selected');
      }
    }

    async function generatePrayer() {
      const situation = document.getElementById("situation").value;
      const emotions = Array.from(selectedEmotions);
      const res = await fetch('https://75-hard-site.vercel.app/api/generatePrayer', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotions, situation })
      });
      const data = await res.json();
      document.getElementById("prayerResult").textContent = data.prayer || "Sorry, something went wrong generating your prayer.";
    }
  </script>
</body>
</html>
