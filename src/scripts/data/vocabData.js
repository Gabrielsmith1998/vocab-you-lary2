import axios from 'axios';
import firebaseConfig from '../../api/apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

const getVocab = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/vocab.json?orderBy="uid"&equalTo="${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleVocab = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/vocab/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createVocab = (newVocabData) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/vocab.json`, newVocabData)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/vocab/${response.data.name}.json`, body)
        .then(() => {
          getVocab(newVocabData.uid).then((peopleArray) => resolve(peopleArray));
        });
    })
    .catch((error) => reject(error));
});

const updateVocab = (vocabObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/vocab/${vocabObj.firebaseKey}.json`, vocabObj)
    .then(() => getVocab(vocabObj.uid).then(resolve))
    .catch(reject);
});

const getTechOne = (user) => new Promise((resolve, reject) => {
  getVocab(user)
    .then((vocabArray) => {
      const techOneVocab = vocabArray.filter((vocab) => vocab.language === 'Tech 1');
      resolve(techOneVocab);
    }).catch(reject);
});

const getTechTwo = (user) => new Promise((resolve, reject) => {
  getVocab(user)
    .then((vocabArray) => {
      const techTwoVocab = vocabArray.filter((vocab) => vocab.language === 'Tech 2');
      resolve(techTwoVocab);
    }).catch(reject);
});

const getTechThree = (user) => new Promise((resolve, reject) => {
  getVocab(user)
    .then((vocabArray) => {
      const techThreeVocab = vocabArray.filter((vocab) => vocab.language === 'Tech 3');
      resolve(techThreeVocab);
    }).catch(reject);
});

const deleteVocab = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/vocab/${firebaseKey}.json`)
    .then(() => {
      getVocab(uid).then(resolve);
    })
    .catch(reject);
});

const vocabAbc = (uid) => new Promise((resolve, reject) => {
  getVocab(uid)
    .then((vocabArray) => {
      const abcVocab = vocabArray;
      resolve(abcVocab);
    }).catch(reject);
});

export {
  getVocab,
  createVocab,
  getSingleVocab,
  updateVocab,
  deleteVocab,
  getTechOne,
  getTechTwo,
  getTechThree,
  vocabAbc
};
