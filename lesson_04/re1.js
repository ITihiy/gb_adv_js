original_string = document.getElementById('before').innerText;

const reg = new RegExp('\\B(\')(.+?)(\')[\\s.?:,!]', 'gm');

replaced_string = original_string.replace(reg, '"$2"');
document.getElementById('after').insertAdjacentText('afterbegin', replaced_string);
