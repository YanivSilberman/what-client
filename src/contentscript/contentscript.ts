import axios from 'axios';

const endpoint = process.env.API_URL;

const isThisContentscript = true;

if (isThisContentscript) {
  const content = document.body.textContent;
  axios
    .get(endpoint, {
      params: {
        content: JSON.stringify(content)
      }
    })
    .then(res => console.log({ res }))
    .catch(err => console.log({ err }));
}
