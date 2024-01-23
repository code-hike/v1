const parseCSV = require("./csv")

// https://opencollective.com/codehike/transactions?type=CREDIT
const data = parseCSV("./codehike-transactions.csv")

const replace = {
  "severin-ibarluzea": "seveibar",
  fbopensource: "facebook"
}
const ignore = ["github-sponsors", "guest-fbd7c737"]

const transactions = data
  .filter(d => !ignore.includes(d["oppositeAccountSlug"]))
  .map(d => ({
    date: d["date"],
    name: replace[d["oppositeAccountSlug"]] || d["oppositeAccountSlug"],
    amount: parseInt(d["amount"])
  }))

const totals = {}
transactions.forEach(t => {
  totals[t.name] = (totals[t.name] || 0) + t.amount
})

module.exports = totals
