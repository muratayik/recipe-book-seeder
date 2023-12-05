# Recipe Book Seeder :seedling:

This application is created to seed meal data to recipe book database.

## Steps

1. Create a postgresql database in local or remote.  
   For local installation https://www.postgresql.org/download/  
   For cloud https://aws.amazon.com/rds/postgresql/
   <br/>

2. Fill .env file in root level with database information.  
   DB_HOST=db_location (localhost for local installation)  
   DB_PORT=db_port (by default 5432)  
   DB_USERNAME=db_username  
   DB_PASSWORD=db_password  
   DB_DATABASE=database_name
   <br/>
3. Create tables.
   All DDL information can be found in the file "ddl_scripts.txt" in root of project.  
   Directly running the ddl must create all needed tables. A GUI like [pgAdmin](https://www.pgadmin.org/) can be used to run ddl script.
   <br/>

4. Run `npm install` to get dependencies.
   <br/>

5. Run project via `npm run start`
   <br/>

6. After installation is completed, data must be present in the tables below;  
   a. category  
   b. meal  
   c. ingredient  
   d. instruction

### Notes

1. All the data inside json files are taken from [Meal DB](https://www.themealdb.com/api.php). Original content can be found in original website.

2. ddl_scripts.txt contains 'favorite' and 'account' tables. These tables are not related to seeder. But recipe-book-backend is using these tables.
