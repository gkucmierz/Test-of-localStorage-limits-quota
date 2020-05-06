
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
  formatLog(bytes, res);
  return res;
};

const formatLog = (bytes, res) => {
  log(`testing bytes: ${bytes} -> ${res}`);
};

const log = str => {
  const textarea = document.querySelector('.log');
  textarea.innerHTML += `${str}\n`;
  textarea.scrollTop = textarea.scrollHeight;
};

const asyncConsumeIterator = (iter, progressFn, doneFn = _ => _) => {
  const loop = () => {
    const {value, done} = iter.next();
    if (done) {
      doneFn();
    } else {
      progressFn(value);
      setTimeout(loop, 0);
    }
  };
  loop();
};

const testLocalStorage = function*() {
  let bytes = 1;
  while (1) {
    const res = check(bytes);
    yield {bytes, res};
    if (res) {
      bytes *= 2;
    } else {
      break;
    }
  }
  
  let [lower, upper] = [bytes / 2, bytes];
  while (1 < upper - lower) {
    const mid = Math.floor((lower + upper) / 2);
    const res = check(mid);
    yield {bytes: mid, res};
    if (res) {
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
  asyncConsumeIterator(
    testLocalStorage(),
    ({bytes, res}) => formatLog(bytes, res),
    () => log('done')
  );
});
