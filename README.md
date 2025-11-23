# MLBB Draft Assistant

**MLBB Draft Assistant** is a web application that helps _Mobile Legends: Bang Bang_ players make smarter draft decisions.  
It analyzes hero relationships (counters, countered by, synergy, anti-synergy) and calculates a score to identify the best and worst picks for your situation.

---

## Features

-   Real-time draft suggestions based on selected lane and team composition
-   Dynamic scoring system considering hero relationships
-   Fast hero search and selection modal
-   Responsive design for desktop and mobile
-   Data extracted automatically from official MLBB sources

---

## How It Works

Each hero is connected to others through four relationship types:

| Relationship | Effect                      | Score |
| ------------ | --------------------------- | ----- |
| Counters     | Strong against another hero | +1    |
| Countered by | Weak against another hero   | −1    |
| Synergy      | Works well with allies      | +0.1  |
| Anti-synergy | Conflicts with allies       | −0.1  |

The algorithm sums these values to determine a hero’s overall suitability within the draft.

---

## Data Source and Disclaimer

All data is based on publicly available information from the  
[official Mobile Legends website](https://www.mobilelegends.com/).

The dataset only includes the top 5–10 visible relationships per hero, so the results are approximate and should be used as a general guideline rather than an absolute reference.

**Last data update:** November 2025

---

## Developer

Created by **Vincenzo Farro**, a web developer and Mobile Legends player from Italy.  
Future improvements will include patch-based updates, win rate analysis, and enhanced synergy logic.

-   GitHub: [github.com/vin-03](https://github.com/vin-03)
-   Website: [vincenzofarro.com](https://vincenzofarro.com)
-   LinkedIn: [linkedin.com/in/vincenzo-farro](https://www.linkedin.com/in/vincenzo-farro)

---

## License

This project is released under the **MIT License**.
