// TODO: получить данные по АПИ
// TODO: вставить слово в контейнер
// TODO: добавить функционал для воспроизведения звука
// TODO: вставить в контейнер с результатами


let state = {
  word: '',
};

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector('.results-word');

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


// events

input.addEventListener('keyup', handleKeyup);
form.addEventListener('sabmit', handleSubmit);
