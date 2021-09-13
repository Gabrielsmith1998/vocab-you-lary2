import navBar from '../components/navBar';
import { getVocab } from '../data/vocabData';
import domBuilder from '../domBuilder';
import navEvents from '../helpers/navEvents';
import domEvents from '../helpers/vocabEvents';
import showVocab from '../vocab';

const startApp = (user) => {
  console.warn(user);
  domBuilder();
  domEvents(user.uid);
  navBar();
  navEvents(user.uid);
  getVocab(user.uid).then(showVocab);
};
export default startApp;
