```js
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  // !diff del
  dolor = ipsum - sit
  // !diff ins
  dolor = sit - amet(dolor)
  return sit ? consectetur(ipsum) : []
}
```
