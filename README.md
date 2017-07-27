# Climb Group Project

####  _July 27th, 2017_

#### By _**Tyler Allen, Daniela Trulls, Lena Kuchko, Jun Fritz**_

## Description
Our group week project is a daily meal planner that assists users with setting, planning, and achieving their lifestyle goals.  This app focuses on collecting, storing, and reporting a user's information to present them with healthy meal options and their daily progress.  It allows a user to stay accountable with planned vs actual meal reporting.

## Specifications
 |Behavior| Input (User Action/Selection)| Output (Program Action)|
 |---|---|---|
 | User can create a profile | "Create Profile" page input | Display individual "User Profile" page |
 | User can add up to 5 ingredients they have on hand | "Chicken, Eggs" | Display "Chicken & Rice" "Eggs Benedict" "Chicken Fried Rice"|
 | User can select or update a meal option | User clicks on update button and has option to refresh options of recipes | Display new random set of recipes for the user to choose from |
 | User can input ingredients from actual meals they ate that day | "1 whole chicken, 2 cups of rice, 5 slices of ham, 2 beans, 2 scoops of gravy" | Bar graph displays total calories from planned daily meals vs total calories from actual daily meals |

## Setup/Installation Requirements

#### _**Replicating/Editing this Project**_

* Click the "download or clone" button in this repository and copy the link.
* In your computers terminal enter "git clone" & paste the copied link.
* Once successfully cloned, enter "npm install" in terminal.
* You'll need to create an "api-keys.ts" file in the "app" folder in order to use the application.
* Once you have the file, sign up at Edamam's API site in order to get a free api key and an API ID.
* Once you have access to both api credentials, add them using the form below to your "api-keys.ts" file.

          export const recipeKey = "{{API KEY GOES HERE}}";
          export const recipeId = "{{API ID GOES HERE}}";
          export const nutritionKey = "{{API ID GOES HERE}}";
          export const nutritionId = "{{API ID GOES HERE}}";
          export const weatherKey = "{{API ID GOES HERE}}";

* Make sure to add this new file to the .gitignore file in order to keep your api keys private.
* Angular CLI makes separating front end and back end easy so access all functionality and backend in the desired ".ts" files, or any "service.ts" files to alter the app.
* For front end, "index.html", "styles.css" on the top level of the directory and any files ending in ".html" or ".css" in the app folder can be used to change the user interface.
* When you're ready to test, open a new terminal tab and run "ng serve".  The additional tab allows you to perform commands in one tab while the server continues to run on the other.

## Known bugs

  * No Known Bugs

## Support and contact details

 Contact jun.fritz@gmail.com with any comments, concerns, or questions.

## Technologies Used

 _HTML, CSS, TypeScript, Angular 2, Angular CLI_

### License

 MIT

 Copyright (c) 2017 **_Tyler Allen, Daniela Trulls, Lena Kuchko, Jun Fritz_**
