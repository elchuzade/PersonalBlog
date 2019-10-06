const ConvertTitleToUrl = title => {
  let url = '';
  for (let i = 0; i < title.length; i++) {
    if (title[i] == ' ') {
      url += '_';
    } else {
      url += title[i];
    }
  }
  return url;
};

module.exports.ConvertTitleToUrl = ConvertTitleToUrl;
