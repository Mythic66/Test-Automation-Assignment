# Test-Automation-Assignment

Download and install : 
 Node JS
 Playwright test for VScode

Setup : 

 1. Clone the repo
 2. Open the project
 3. Open Terminal
 4. Run the command " npm install "
 5. You should be good to go

Running the tests : 

 Open a terminal and you should be able to run these commands : 

  - npx playwright test ( it will run with the most workers possible for your machine all in paralel)
  - npx playwright test --project='Chromium - Airbnb visitor tests' --workers=1 --retries=2 ( this will run only my project in a serial matter and with retries configured)
  - npx playwright test --ui ( it will open the ui mode and you can see step by step what the tests do)
