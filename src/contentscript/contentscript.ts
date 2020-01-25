import axios from 'axios';
import './contentscript.scss';

const endpoint = process.env.API_URL;

const isThisContentscript = true;

function getTextForElement(el: string) {
  let content = '';
  const allSpans = document.getElementsByTagName(el);
  
  for(var i = 0; i < allSpans.length; i ++) {
    content = content + allSpans[i].textContent;
  }

  return content;
}

if (isThisContentscript) {
  // const content = document.body.textContent
  //   .trim()
  //   .replace(/(\r\n|\n|\r)/gm, "") // remove escape chars
  //   // .match( /[^\.!\?]+[\.!\?]+/g ) // array of sentences;
  //   // .filter(s => {
  //   //   const count = countWords(s);
  //   //   return count > 6 && count < 15;
  //   // })

  const content = [
    'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ].map(i => getTextForElement(i)).join(". ");

  axios
    .post(endpoint, {
      text: content
    })
    .then(res => console.log({ res }))
    .catch(err => console.log({ err }));
}
