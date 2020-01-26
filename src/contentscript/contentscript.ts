import './contentscript.scss';

import axios from 'axios';
import * as JQuery from 'jquery';

const $ = <any>JQuery;

const isThisContentscript = true;

function getTextForElement(el: string) {
  let content = '';
  const allSpans = document.getElementsByTagName(el);
  
  for(var i = 0; i < allSpans.length; i ++) {
    content = content + allSpans[i].textContent + '. ';
  }

  return content;
}

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

const trimmer = str => str.substring(0, str.length - 1)

if (isThisContentscript) {
  
  const content = [
    'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ].map(i => getTextForElement(i)).join(". ");

  axios
    .post(process.env.API_URL, {
      text: content
    })
    .then(({ data }) => data.map(i => {
      try {
        replaceElement(trimmer(i[0]), trimmer(i[1]));
      } catch (err) {
        console.log('err', err);
      }
    })
    .catch(err => console.log({ err }));
}