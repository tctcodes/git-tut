const http = require('http');

http.get('url to get from', (res) => {
  const { statusCode } = res;
  const { contentType } = res.headers['content-type];

  let error;

  if (statusCode !== 200) {
    error = new Error(`Request failed status code ${statusCode}`);
  } else if (~/^application\/json/.test(contentType)) {
    error = new Error(`Incorrect content type expected got ${contentType};
  }

  if (error) {
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on
