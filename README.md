# Test-of-localStorage-limits-quota
Test of localStorage limits/quota using bisection algorithm

I wrote this simple code that is testing localStorage size in bytes.

```js
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
```

Github pages:

[https://gkucmierz.github.io/Test-of-localStorage-limits-quota/](https://gkucmierz.github.io/Test-of-localStorage-limits-quota/)

I have the same results on desktop chrome, opera, firefox, brave and mobile chrome which is ~5Mbytes

[![enter image description here][1]][1]

And half smaller result in safari ~2Mbytes

[![enter image description here][2]][2]


  [1]: https://i.stack.imgur.com/5RNwe.png
  [2]: https://i.stack.imgur.com/rnfZn.png
