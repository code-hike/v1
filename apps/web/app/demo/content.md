## The mother of all codeblocks

```js foo.js -anc
// !collapse(1:4)
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  // !mark(1:2)
  dolor = sit - amet(dolor)
  // !callout[/sit/] lorem ipsum dolor sit
  return sit ? consectetur(ipsum) : []
}

// !collapse(1:4) collapsed
function ipsum(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  // !mark(1:2)
  dolor = sit - amet(dolor)
  return sit ? consectetur(ipsum) : []
}
```

```js
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  // !mark(1:2)
  dolor = sit - amet(dolor)
  // !callout[/sit/] lorem ipsum dolor sit
  return sit ? consectetur(ipsum) : []
}

function ipsum(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  // !mark(1:2)
  dolor = sit - amet(dolor)
  return sit ? consectetur(ipsum) : []
}
```
