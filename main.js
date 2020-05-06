

const check = bytes => {
  try {
    localStorage.clear();
    localStorage.setItem('a', '0'.repeat(bytes));
    localStorage.clear();
    return true;
  } catch(e) {
    localStorage.clear();
    return false;
  }
};

const checkLog = bytes => {
  const res = check(bytes)
  log(`testing bytes: ${bytes} -> ${res}`);
  return res;
};

const log = str => {
  const textarea = document.querySelector('.log');
  textarea.innerHTML += `${str}\n`;
  textarea.scrollTop = textarea.scrollHeight;
};

const testLocalStorage = callback => {
  let bytes = 1;
  while (1) {
    if (checkLog(bytes)) {
      bytes *= 2;
    } else {
      break;
    }
  }
  
  let [lower, upper] = [bytes / 2, bytes];
  while (1 < upper - lower) {
    const mid = Math.floor((lower + upper) / 2);
    if (checkLog(mid)) {
      lower = mid;
    } else {
      upper = mid;
    }
  }

  document.querySelector('.lower').innerHTML = `check(${lower})`;
  document.querySelector('.upper').innerHTML = `check(${upper})`;
  document.querySelector('.lower').addEventListener('click', () => checkLog(lower));
  document.querySelector('.upper').addEventListener('click', () => checkLog(upper));
};

document.querySelector('.test').addEventListener('click', () => {
  testLocalStorage(result => {

  });
});
