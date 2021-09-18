import vocabForm from '../addVocabForm';
import {
  getTechOne,
  getTechThree,
  getTechTwo,
  getVocab
} from '../data/vocabData';
import showVocab from '../vocab';
import signOut from './signOut';

const navEvents = (user) => {
  document.querySelector('#all-vocab').addEventListener('click', () => {
    getVocab(user).then(showVocab);
  });

  document.querySelector('#new-vocab').addEventListener('click', () => {
    vocabForm(user);
  });

  document.querySelector('#tech-1').addEventListener('click', () => {
    getTechOne(user).then(showVocab);
  });

  document.querySelector('#tech-2').addEventListener('click', () => {
    getTechTwo(user).then(showVocab);
  });

  document.querySelector('#tech-3').addEventListener('click', () => {
    getTechThree(user).then(showVocab);
  });

  document.querySelector('#logout-button')
    .addEventListener('click', signOut);
};
export default navEvents;
