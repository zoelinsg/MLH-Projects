// script.js
// Simple prompt example generator for beginners
// - Let user pick task, audience, output format
// - Generate a friendly example prompt when button clicked
//
// Beginner notes:
// - This file uses a small IIFE (Immediately Invoked Function Expression)
//   to avoid adding variables to the global scope.
// - To change example topics, edit the `sampleTopics` array below.
// - The script moves keyboard focus to the generated area so screen readers
//   announce new content (see accessibility comments in index.html).

// Wait until DOM is ready (script is loaded with `defer` in HTML)
(function () {
  // Grab DOM elements
  const taskSelect = document.getElementById('task-select');
  const audienceSelect = document.getElementById('audience-select');
  const formatSelect = document.getElementById('format-select');
  const generateBtn = document.getElementById('generate-btn');
  const generatedArea = document.getElementById('generated-area');

  // Small list of sample topics to make generated prompts concrete
  const sampleTopics = [
    'how photosynthesis works',
    'benefits of remote work',
    'basics of machine learning',
    'writing clear commit messages',
    'tips for improving study habits'
  ];

  // Map output format to a short instruction to include in the prompt
  const formatInstructions = {
    bullet: 'in 4 bullet points',
    paragraph: 'in a short paragraph (3–4 sentences)',
    steps: 'as a clear step-by-step list',
    code: 'with a short code example (if relevant)'
  };

  // Utility: pick a random topic to keep examples varied
  function pickTopic() {
    const idx = Math.floor(Math.random() * sampleTopics.length);
    return sampleTopics[idx];
  }

  // Build a friendly prompt using the selected values
  function buildPrompt(task, audience, format) {
    const topic = pickTopic();
    const fmt = formatInstructions[format] || '';

    // Use the 3-part formula: Task + Audience + Output
    switch (task) {
      case 'summarize':
        return `Summarize ${topic} for ${audience} ${fmt}.`;
      case 'explain':
        return `Explain ${topic} to ${audience} ${fmt}.`;
      case 'rewrite':
        return `Rewrite the following text for ${audience} ${fmt}: "[paste text here]"`;
      case 'generate':
        return `Generate 5 simple ideas about ${topic} aimed at ${audience} ${fmt}.`;
      default:
        return `Describe ${topic} for ${audience} ${fmt}.`;
    }
  }

  // Update the page with the generated prompt (beginner-friendly)
  function showGenerated(promptText) {
    // Clear previous content and add a nice <pre> so spacing is preserved
    generatedArea.innerHTML = '';
    const pre = document.createElement('pre');
    pre.textContent = promptText;
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.margin = '0';

    // Add a small helper line explaining how to use it
    const help = document.createElement('p');
    help.className = 'muted';
    help.style.marginTop = '0.6rem';
    help.textContent = 'Tip: copy this prompt into your AI tool and replace placeholders as needed.';

    generatedArea.appendChild(pre);
    generatedArea.appendChild(help);

    // Accessibility: move keyboard focus to the generated area so screen readers
    // announce the new content. generatedArea has tabindex="-1" so it can receive focus.
    try {
      generatedArea.focus();
    } catch (e) {
      // ignore focus errors in older browsers
    }
  }

  // Event handler for the generate button
  function onGenerateClick() {
    const task = taskSelect.value;
    const audience = audienceSelect.value;
    const format = formatSelect.value;

    const prompt = buildPrompt(task, audience, format);
    showGenerated(prompt);
  }

  // Wire up the button click
  generateBtn.addEventListener('click', onGenerateClick);

  // Optional: allow pressing Enter when focused on selects (for accessibility)
  [taskSelect, audienceSelect, formatSelect].forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        onGenerateClick();
      }
    });
  });

})();
