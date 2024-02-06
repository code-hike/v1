const fs = require("fs")

const ocTotals = require("./oc-sponsors.js")
const ghTotals = require("./gh-sponsors.js")
const others = {
  // from paypal
  matthiaszepper: 94.3 + 108.71 + 47,
}

const totals = { ...ocTotals, ...ghTotals, ...others }

const sorted = []
for (let name in totals) {
  sorted.push({ name, amount: Math.round(totals[name]) })
}
sorted.sort((a, b) => b.amount - a.amount)

console.table(sorted)

fs.writeFileSync("./sponsors.json", JSON.stringify(sorted, null, 2))
