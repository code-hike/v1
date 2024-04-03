```js
// !Collapse(1:4)
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? consectetur(ipsum) : []
}

// !Collapse(1:4) collapsed
function bar(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? consectetur(ipsum) : []
}
```
