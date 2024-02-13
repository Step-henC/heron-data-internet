# Heron Data

This is a refactor of this https://github.com/Step-henC/Heron_Data_Installer

Below is progress video with error handling and graphing data in tables and line graphs. The navbar gradient is supposed to be the color gradient of a typical grey heron [reference here](https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGrey_heron&psig=AOvVaw2ApKxBsoVZspzv-Et2hLWw&ust=1707937898590000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiCpdCCqYQDFQAAAAAdAAAAABAE) ... I am not offended if you did not pick up on that.

https://github.com/Step-henC/heron-data-internet/assets/98792412/d35548ba-69f3-4c56-8804-7cac660044e0


### What Is This

Heron Data parses mass spec CSV files and calculates and returns averages, saving researchers hours of time doing so by hand in excel. Not all groups will have data and groups with varying amount of members thar differ from the expected batch size must have group members added in (member1, member2)(member3) format.

TODO 
- Calculate Coefficient of Variance
- Linear equation in line graph
- Filter columns in data table
- R sqaured value in line graphs
- Export to CSV using papaparse api (used to parse csv)
- Export to PDF using React-PDF api (npm install @react-pdf/renderer --save)
- Create an info page showing users how to use it, with sample CSV

### How This Works
csv is uploaded to session storage, so it clears at session end, since most storage apis use local andsession storage

- ChartsPage: error handles for parsing csv uploaded by user
- MainTable performs calculations
- LineChart, GroupTable and Averages table map out data in chart

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



