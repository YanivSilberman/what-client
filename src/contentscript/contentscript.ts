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
      <span class="what-selection">
        ${to}
        <span>${from}</span>
      </span>
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
  const isNew = $.isEmptyObject(user);

  if (!isNew && user.active === false) return;
  const isSentence = user && user.dif === 4;
  const suffix = isSentence ? 'sentence' : 'word';

  const params = {
    text: content,
    freq: user.freq ? user.freq * 0.01 : 0.5,
    noun: isNew ? true : user.noun,
    verb: isNew ? true : user.verb,
    adverb: isNew ? true : user.adverb,
    adjective: isNew ? true : user.adjective,
    ...(!isSentence ? { dif: user.dif ? difficulties[user.dif - 1] : 'easy' } : {}),
  };

  axios
    .post(process.env.API_URL + suffix, params)
    .then(({ data }) => {
      const trimmedData = suffix === 'word' ? data :
        data.map(i => [ trimmer(i[0]), trimmer(i[1]) ]);

      const obj = trimmedData.reduce((acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      }, {});

      $('body :not(script) :not(style)').contents().filter(function() {
        return this.nodeType === 3;
      }).replaceWith(function() {
        const rp = suffix === 'sentence' ? obj[this.nodeValue] :
          (() => {
            const f = trimmedData.find(i => this.nodeValue.indexOf(i[0]) > -1);
            return f ? f[1] : false;
          })()
        
        if (rp) {

          const html = `
            <span class="what-selection">
              ${rp}
              <span>${this.nodeValue}</span>
            </span>
          `;
          const rep = suffix === 'sentence' ? this.nodeValue :
            trimmedData.find(i => i[1] === rp)[0];
          const re = new RegExp(rep);

          return this.nodeValue.replace(re, html);
        } else {
          return this.nodeValue;
        }
      })

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
