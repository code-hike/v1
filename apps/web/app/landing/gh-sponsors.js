const parseCSV = require("./csv")

const data = parseCSV("./code-hike-sponsorships-all-time.csv")

const replace = {
  speakeasybot: "speakeasy-api",
  ndimares: "speakeasy-api",
  hamelsmu: "outerbounds"
}

const ignore = ["outerbounds"]

const transactions = data
  .filter(d => !ignore.includes(d["Sponsor Handle"]))
  .map(d => ({
    date: d["Transaction Date"],
    name: replace[d["Sponsor Handle"]] || d["Sponsor Handle"],
    amount:
      parseInt(
        d["Processed Amount"].slice(1).replace(",", "").replace(".", "")
      ) / 100
  }))

const totals = {}
transactions.forEach(t => {
  totals[t.name] = (totals[t.name] || 0) + t.amount
})

module.exports = totals
