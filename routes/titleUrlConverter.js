const convertTitleToUrl = title => {
  let url = '';
  for (let i = 0; i < title.length; i++) {
    if (title[i] == ' ') {
      url += '_';
    } else {
      url += title[i];
    }
  }
  for (let i = url.length; i >= 0; i--) {
    if (url[i] === '!' || url[i] === '?' || url[i] === '.') {
      console.log(url[i]);
      url = url.slice(0, i);
    }
  }
  return url;
};

module.exports.convertTitleToUrl = convertTitleToUrl;
