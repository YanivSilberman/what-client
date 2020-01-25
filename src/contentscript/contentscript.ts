// import axios from 'axios';
// import * as $ from 'jquery';
import './contentscript.scss';

// const isThisContentscript = true;

// function getTextForElement(el: string) {
//   let content = '';
//   const allSpans = document.getElementsByTagName(el);
  
//   for(var i = 0; i < allSpans.length; i ++) {
//     content = content + allSpans[i].textContent + '. ';
//   }

//   return content;
// }

// function setBack(from: string, to: string) {
//   console.log('runs');
//   const el = $(`a.what-selection:contains('${from}')`);
//   const replacement = el.html()
//     .replace(from, to);
//   el.html(replacement);
// }

// function replaceElement(from: string, to: string) {
//   const el = $(`:contains('${from}')`);
//   const setBack = `onClick="LogIt('big test')"`;
//   const replacement = el.html()
//     .replace(from, `<a class="what-selection" ${setBack}>${to}</a>`);
//   el.html(replacement);
// }

// if (isThisContentscript) {
//   // const content = document.body.textContent
//   //   .trim()
//   //   .replace(/(\r\n|\n|\r)/gm, "") // remove escape chars
//   //   // .match( /[^\.!\?]+[\.!\?]+/g ) // array of sentences;
//   //   // .filter(s => {
//   //   //   const count = countWords(s);
//   //   //   return count > 6 && count < 15;
//   //   // })

//   // replaceElement('discover', 'still works');
  
//   const content = [
//     'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
//   ].map(i => getTextForElement(i)).join(". ");

//   axios
//     .post(process.env.API_URL, {
//       text: content
//     })
//     .then(res => console.log({ res }))
//     .catch(err => console.log({ err }));
// }

// // const script = document.createElement('script').text = 
// //   'function LogIt(msg) { console.log(msg);}';
// // document.body.appendChild(script as any);
