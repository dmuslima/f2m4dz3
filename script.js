function loadVoices() {
  const voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById('voiceSelect');

  voiceSelect.innerHTML = ''; // Очищаем список перед загрузкой новых голосов

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Загружаем список голосов при изменении
speechSynthesis.onvoiceschanged = loadVoices;

// === Функция для озвучивания текста ===
function speakText() {
  const text = document.getElementById('textInput').value;
  if (!text) {
    alert('Введите текст для озвучивания!');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  // Настройка голоса
  const selectedVoiceIndex = document.getElementById('voiceSelect').value;
  utterance.voice = voices[selectedVoiceIndex];

  // Настройка скорости и громкости
  utterance.rate = parseFloat(document.getElementById('rate').value);
  utterance.volume = parseFloat(document.getElementById('volume').value);

  // Подсветка текста во время озвучивания
  utterance.onboundary = (event) => {
    const index = event.charIndex;
    const textInput = document.getElementById('textInput');
    textInput.setSelectionRange(index, index + 1);
  };

  // Запуск озвучивания
  speechSynthesis.speak(utterance);
}

// === Остановить озвучивание ===
function stopSpeech() {
  speechSynthesis.cancel();
}

// === Пауза озвучивания ===
function pauseSpeech() {
  speechSynthesis.pause();
}
// === Возобновить озвучивание ===
function resumeSpeech() {
  speechSynthesis.resume();
}

// === Отображение значений скорости и громкости ===
document.getElementById('rate').addEventListener('input', (e) => {
  document.getElementById('rateValue').textContent = e.target.value;
});

document.getElementById('volume').addEventListener('input', (e) => {
  document.getElementById('volumeValue').textContent = e.target.value;
});

// === Автоматическая загрузка голосов ===
loadVoices();
