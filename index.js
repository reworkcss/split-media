module.exports = function (sheet) {
  // can be a stylesheet or a rework instance
  sheet = sheet.obj || sheet
  var sheets = {
    '': sheet
  }
  var rules = sheet.stylesheet.rules
  var rule, query
  for (var i = 0; i < rules.length; i++) {
    rule = rules[i]
    query = rule.media
    if (!query)
      continue

    rules.splice(i--, 1)
    if (sheets[query])
      sheets[query].stylesheet.rules =
        sheets[query].stylesheet.rules.concat(rule.rules)
    else
      sheets[query] = {
        type: 'stylesheet',
        stylesheet: {
          rules: rule.rules
        }
      }
  }
  return sheets
}