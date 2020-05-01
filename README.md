# Heroku-Comp-523
Repository for Heroku to access the Comp 523 admin tool
Access the database on the backend directly:
Visit https://cloud.mongodb.com/
If you have not already done so, create a Mongo account. It can easily be linked to your Gmail account.
Select UNC Comp 523 as your organization in the top left corner of the screen.
This is assuming you are a member of the organization. Owners of this organization (initial developers, current professors) can send you an invitation.
Select the project COMP-523-Admin-Tools-Database.
Select the collection you want to modify/view the data for.
View/modify the data.

Deploy the source code to Heroku:
Login to Heroku. Create an account if you don’t have one.
Select comp-523-admin-tools.
You can do this once this project has been shared with you via an email from Heroku.
Click the deploy tab.
Select GitHub as the Deployment method. Make sure you connect your github account.
Connect the github repo (Heroku will walk you through this if needed).
Click manual deploy at the bottom of the page and choose the branch of the repo you want to deploy.
Heroku will let you know the build process and when it is finished deploying. 
This process produces the built react files and hosts it and the server at https://comp-523-admin-tools.herokuapp.com/

Editing the source code:
Clone the repo.
Everything in the repo except for the client folder belongs to the backend. Run npm install in the directory you cloned the repo to.
The react app lives inside the client folder. Change directory into the client folder and run npm install.
Edit code as you wish.
To test local changes, run `nodemon server` in the repo directory. In a separate terminal, cd into client and run `npm run start`.
Once you are satisfied with the results, push to master, then deploy to Heroku to make the local changes appear in the production version.
