# Heron Data

Website: https://herondata.app

New Feature! Area Under Curve: https://heron-auc.streamlit.app
  github: [https://github.com/Step-henC/heron-streamlit.com](https://github.com/Step-henC/heron-streamlit)

This is a refactor of this https://github.com/Step-henC/Heron_Data_Installer


### What Is This

Heron Data parses mass spec CSV files and calculates and returns averages, saving researchers hours of time doing so by hand in excel. Not all groups will have data and groups with varying amount of members thar differ from the expected batch size must have group members added in (member1, member2)(member3) format.

TODO 
- Create an info page showing users how to use it, with sample CSV

### How This Works
csv is uploaded to session storage, so it clears at session end, since most storage apis use local andsession storage

- ChartsPage: error handles for parsing csv uploaded by user
- MainTable performs calculations
- LineChart, GroupTable and Averages table map out data in chart

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Future Considerations

- PDF api does not allow page breaks (using react-to-pdf). Since it takes a screenshot and pdf-izes that. Will look into react-pdf api in later iterations of app


### Running locally

-Please make sure node is installed and navigate to root directory in the cli.

- Open terminal or cli in root directory and run "npm ci" then "npm start"
