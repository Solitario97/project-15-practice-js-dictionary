// TODO: получить данные по АПИ
// TODO: вставить слово в контейнер
// TODO: добавить функционал для воспроизведения звука
// TODO: вставить в контейнер с результатами


let state = {
  word: '',
  meanings: [],
  phonetics: []
};

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector('.results-word');
const soundButton = document.querySelector('.results-sound');
const resultsWrapper = document.querySelector('.results');
const resultsList = document.querySelector('.results-list');


const renderItem = (item) => {
  const itemDefinition = item.definition[0];
    return `<div class="results-item">
              <div class="results-item__part">${item.partOfSpeech}</div>
                <div class="results-item__definitions">
                  <div class="results-item__definition">
                    <p>${itemDefinition.definition}</p>
                    <div class="results-item__example">${itemDefinition.example}</div>
                  </div>
                </div>
              </div>`;
};

const showResults = () => {
  resultsWrapper.style.display = 'block';
  resultsList.innerHTML = '';

  state.meanings.forEach((item) => (resultsList.innerHTML += renderItem(item)));
};

const insertWord = () => {
  containerWord.innerText = state.word;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!state.word.trim()) return;

  try {
    const response = await fetch(`${url}${state.word}`);
    const data = await response.json();

    if(response.ok && data.length){
      const item = data[0];

      state = {
        ...state,
        meanings: item.meanings,
        phonetics: item.phonetics,
      };
      insertWord();
      showResults();
    }
  } catch (err) {
    console.log(err);
  }
};

const handleKeyup = (e) => {
  const value = e.target.value;
  state.word = value;
};

const handleSound = () =>{
  if(state.phonetics.length) {
    const sound = state.phonetics[1];

    if(sound.audio) {
      new Audio(sound.audio).play();
    }
  }
};
// events

input.addEventListener('keyup', handleKeyup);
form.addEventListener('submit', handleSubmit);
soundButton.addEventListener('click', handleSound);
