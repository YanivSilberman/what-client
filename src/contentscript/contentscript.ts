import './contentscript.scss';

import axios from 'axios';
import * as JQuery from 'jquery';

const $ = <any>JQuery;

// parse all text nodes for element
function getTextForElement(el: string) {
  let content = '';
  const allSpans = document.getElementsByTagName(el);
  
  for(var i = 0; i < allSpans.length; i ++) {
    content = content + allSpans[i].textContent + '. ';
  }

  return content;
}

// replace text node with our link
function replaceElement(from: string, to: string) {
  const el = $(`:contains('${from}')`);
  const replacement = el.html()
    .replace(from, `
      <a class="what-selection">
        ${to}
        <span>${from}</span>
      </a>
    `);
  el.html(replacement);
}


const difficulties = [
  'easy',
  'intermediate',
  'hard'
];

const content = [
  'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
].map(i => getTextForElement(i)).join(". ");

// remove periods from end
const trimmer = str => str.substring(0, str.length - 1);

chrome.storage.local.get(['user'], function({ user }) {
  if (user && user.active === false) return;
  const isSentence = user && user.dif === 4;
  const suffix = isSentence ? 'sentence' : 'word';

  axios
    .post(process.env.API_URL + suffix, {
      text: content,
      freq: user.freq || 0.5,
      noun: user.noun || true,
      verb: user.verb || true,
      adverb: user.adverb || true,
      adjective: user.adjective || true,
      ...(!isSentence ? { dif: user.dif || 'easy' } : {}),
    })
    .then(({ data }) => {
      const trimmedData = data.map(i => [ trimmer(i[0]), trimmer(i[1]) ]);

      for (let i of trimmedData) {
        try {
          replaceElement(i[0], i[1]);
        } catch (err) {
          console.log('err', err);
        }
      }

      // handle translated text hover 
      var el = document.getElementsByClassName("what-selection");

      for (let i in el){
        try {
          el[i].addEventListener("mouseover", handleHover);
          el[i].addEventListener("mouseout", handleUnhover);
        } catch (err) {
          console.log('hover event error', err)
        }
      }
    })
    .catch(err => console.log({ err }));  
});

// inject single word popover into corner
var div = document.createElement( 'div' );
document.body.appendChild( div );
div.id = 'what-single-word';

// jquery helpers
const injectPopover = (inner: string) => $('#' + div.id)
  .text(inner);

const showPopover = (event) => {
  const el = $('#' + div.id);
  
  const left = event.clientX;
  const top = window.scrollY + event.clientY + 15;

  return el
  .css('display', 'block')
  .css('position', 'absolute')
  .css('left', left)
  .css('top', top);
}

const hidePopover = () => $('#' + div.id)
  .css('display', 'none')
  .text('');


// Handle hover
function handleHover(event) {
  const translation = $(event.target).find('span').text();
  injectPopover(translation);
  showPopover(event);
}

function handleUnhover() {
  hidePopover();
}

// Handle selection
function handleSelected(event) {
  const doc = document as any;
  let selection = doc.getSelection ?
    doc.getSelection() : doc.selection.createRange();

  if (selection) {
    try {
      const text = selection.toString();
      const isFrench = selection.anchorNode.parentNode.className === "what-selection";
  
      if (text) {
        axios
          .post(process.env.API_URL + 'word_lookup', {
            text,
            lang: isFrench ? 'fr' : 'en'
          })
          .then(({ data }) => {
            hidePopover();
            injectPopover(data);
            showPopover(event);
          })
          .catch(err => console.log({ err }));
      } else {
        hidePopover();
      }
    } catch (err) {
      console.log('selected error', err);
    }
  }
};

document.onmouseup = handleSelected;
document.onkeyup = handleSelected;
