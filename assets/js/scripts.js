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
        phonetics: item.phonetics
      };
      insertWord();
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
