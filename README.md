# IT23664562 ITPM Semester 1: Playwright Testing Project  
BSc (Hons) in Information Technology – Year 3 
Assignment 1 – Singlish to Sinhala Conversion Testing

Project Overview
This project contains automated tests for evaluating the **accuracy, stability, and usability** of the Singlish-to-Sinhala conversion system available at 

[SwiftTranslator](https://www.swifttranslator.com/).  

The tests cover:  
- Positive functional scenarios  
- Negative functional scenarios  
- UI-related behavior tests (real-time output updates)  


All tests are implemented using **Playwright**, and test data is organized in an Excel file (Appendix 2) for reference and mapping expected outputs.


## Project Structure
.
├── tests/
│ ├── PositiveSinglishToSinhala.spec.js
│ ├── NegativeSinglishToSinhala.spec.js
│ └── UI-behavior.spec.js
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md


- `tests/` – Contains all Playwright test scripts.  
- `PositiveSinglishToSinhala.spec.js` – Tests scenarios where the system should correctly convert input.  
- `NegativeSinglishToSinhala.spec.js` – Tests scenarios where the system fails or behaves incorrectly.  
- `UI-behavior.spec.js` – Tests UI-related functionality, e.g., real-time output updating.  
- `playwright.config.js` – Configuration for Playwright tests.  


## Prerequisites
- Node.js: v22.19.0 (or latest stable version)  
- NPM: comes with Node.js  
- Internet connection to download Playwright browsers  



## Installation Instructions

1. **Clone the repository**  
```bash
git clone https://github.com/Kavishka231/IT23664562_Playwright-project.git
cd IT23664562_Playwright-project

2.for install dependencies

npm install

3.Install Playwright browsers

npx playwright install

4.Running the test

= run all tests=
npx playwright test

=Run a specific test file=
npx playwright test tests/PositiveSinglishToSinhala.spec.js



