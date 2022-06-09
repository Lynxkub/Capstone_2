Welcome to Foodly!

Website is deployed at https://kubek-foodly.surge.sh/

This recipe finding app was created with the use of TheMealDB 'https://www.themealdb.com'

This website pulls information from TheMealDb for a user to be able to disocver new recipes and meals. 

The user of this application is able to browse different recipes that are part of TheMealDB api and save them to a favorites page. 

The recipe cards for this app display ingredients and instructions on how to prepare the meal. (everything that a user would need in order to prepare the meal at home is listed on the recipe card. Including a video of how to prepare it.)

Users can also comment on recipes and talk to other users. (I wanted some sort of communications between users)

Integration and unit tests for the backend are listed in the following folders...
/backend/models
/backend/routes

Models and routes are tested independently to ensure that they are correctly working independently. 

You can run the backend tests by using the command 'jest <test_file_name>'

It is recommended to run one test file at a time in order for them to work. 

The backend can be started with 'nodemon server.js'

The frontend can be started with 'npm start'


This application was written in Node.js with an express framework.
    Postgres is utiliezed as the RDBMS
    React was used to create the frontend
