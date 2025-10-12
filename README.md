# For Devs:

# Repository Branches:
1. main - stable branch, used for final demo
2. dev - our developer branch. This will be the branch we will use to update after each successful code edit and testing of certain parts. 
3. dev_need_fix - This branch will be used to upload partial changes but still broken, so that other devs can take a look at the code if you need help.

# Notes:
- Always work on the dev branch unless you are fixing a broken code in dev_need_fix.

# Contributing Code:
1. Make sure to pull the latest changes from the dev branch before starting your work.
    git pull
2. Create a new branch from remote dev for your changes.
    git checkout -b <branch-name> origin/dev
    ex. git checkout -b mysql origin/dev
    - This will create a new branch called mysql from the latest dev branch and switch to it.
3. Point your new branch to a new remote branch of same name
    git push --set-upstream origin <branch-name>
    ex. git push --set-upstream origin mysql
    - this will point your local new branch to remote mysql branch
3. Make changes and then stage
    git add <file-name>
4. Test and commit your changes with a descriptive message
    git commit -m "Descriptive message about what you changed"
    - Make a habit of committing frequently with descriptive messages.
5. Push your changes to the remote branch
    git push

Once all team members confirmed that it is working, we will merge the changes from your remote branch to the remote dev branch.

6. Create a pull request (PR) from your remote branch to the remote dev branch on GitHub.
    ex. from mysql to dev
    - Open a pull request from mysql -> dev > create pull request. 
    - If all is good and working and confirmed with team, will merge pull request > confirm merge

This will update dev branch

Now make sure to pull the latest changes from dev branch to your local dev branch
    git checkout dev
    git pull

Once we get everything working and stable on dev branch, we will merge dev to main for final demo.


# Helpful Git Commands
git status # check the status of your working directory
git branch -r # list remote branches
git branch -a # list all branches (local and remote)
git checkout <branch-name> # switch to a branch
git checkout -b <new-branch-name> origin/<existing-remote-branch> # create and switch to a new branch from an existing remote branch
git push --set-upstream origin <branch-name> # point your local branch to a remote branch
---

# General Docker Commands:
## to build and start all services in detached mode
docker compose up -d --build 
## to start all services in detached mode without rebuilding
docker compose up -d 

You'll have to wait at least 15 seconds for mysql and mongo to initialize before connecting to them.

## to check the status of all services
docker compose ps 
## to view real-time logs of a specific service
docker compose logs -f <service-name> 
## to stop all services without removing volumes
docker compose down 
## to stop all services and remove volumes
docker compose down -v 
## to restart a specific service
docker compose restart <service-name> 


MySQL test commands:

## To stop mysql container and remove the volume and all data
docker compose rm -sf -v mysql 
### -sf will stop and remove the container, -v will remove the volume and all data

## To stop mysql container without removing the volume and data
docker compose stop mysql
## then remove it manually
docker compose rm -sf mysql

# To start mysql container:

## to start the mysql container in detached mode and build if necessary
docker compose up -d mysql --build 
## to start the mysql container without rebuilding the image
docker compose up -d mysql 

## Note about User: appuser should have enough privileges to create or modify databases and tables.

## Test inserting a student from host:
docker exec -it mysql-db mysql -uappuser -papppass -D grade_tracker -e "INSERT INTO students (name, email, grade) VALUES ('Test Student', 'Test@example.com', 93.7);"
## Verifying the insertion:
docker exec -it mysql-db mysql -uappuser -papppass -D grade_tracker -e "SELECT * FROM students;"

### Once we start to connect this to the backend, we will need to update the connection string in .env file
---
# MongoDB test commands:

## To stop mongodb container and remove the volume and all data
docker compose rm -sf -v mongo 
## -v will remove the volume and all data

## to stop mongo container without removing the volume and data
docker compose stop mongo 
## to remove the stopped mongo container
docker compose rm -sf mongo 

## to run queries, use test_query.js file in mongo folder
## Modify the file as needed to test different queries. Currently it has a sample insert and find query.

# run the queries from test_query.js file:

# if using Linux / Mac
docker exec -i mongo-db mongosh < test_query.js
# if using Windows Terminal/PowerShell
Get-Content .\mongodb\test_query.js | docker exec -i mongo-db mongosh 


