<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project we will be practicing inserting and querying data using SQL. We'll make use of a handy online tool called Chinook that we'll use to write SQL online. <a href="http://jxs.me/chinook-web/">Click me</a>

On the left are the Tables with their fields, the right is where we will be writing our queries, and the bottom is where we will see our results.  

Any new tables or records that we add into the database will be removed after you refresh the page.

Use [www.sqlteaching.com](http://www.sqlteaching.com/) or [sqlbolt.com](http://sqlbolt.com/) as resources for the missing keywords you'll need.

## Table - People

### Instructions
1. Create a table called Person that records a person's ID, Name, Nickname, Age, Height ( in cm ), City, FavoriteColor. 
    * ID should be an auto-incrementing id/primary key - Use type: SERIAL PRIMARY KEY
2. Add these 5 people into the Person database. 
    * Remember to not include the ID because it should auto-increment.
    1. Name: Andrew, Nickname: WPM, Age: 25, Height: 175, City: Irving, Favoritecolor: Aquamarine
    2. Name: Sean, Nickname: Captain Bad Programmer, Age: 24, Height: 183, City: LA, Favoritecolor: Orange
    3. Name: Austin, Nickname: Saint Austin of DevMountain, Age: 23, Height: 168, City: Orange County, Favoritecolor: Blue
    4. Name: Josh, Nickname: TripleS, Age: 30, Height: 182, City: Lemoore, Favoritecolor: Green
    5. Name: Hunter, Nickname: EDM Hunter, Age: 18, Height: 185, City: San Diego, Favoritecolor: Purple
3. List all the people in the Person table by Height from tallest to shortest.
4. List all the people in the Person table by Height from shortest to tallest.
5. List all the people in the Person table by Age from oldest to youngest.
6. List all the people in the Person table older than age 20.
7. List all the people in the Person table that are exactly 18.
8. List all the people in the Person table that are less than 20 and older than 27.
9. List all the people in the Person table that are not 18 (Use not equals).
10. List all the people in the Person table where their favorite color is not Orange.
11. List all the people in the Person table where their favorite color is not Orange and is not Blue.
12. List all the people in the Person table where their favorite color is Purple or Green.
13. List all the people in the Person table where their favorite color is Purple, Green or Blue (use IN).
14. List all the people in the Person table where their city is Irving or LA (use IN).
15. **Bonus** List all the people in the Person table where their nicknames are cool. 
    Explanation 
        WPM: Andrew took a typing test in front of the class and a student made an emoji about it which has Andrew's face with code as his background. 
        Captain Bad Programmer: One of Sean's classmate created an emoji with Sean's face wearing an eyepatch and called it Captain Bad Programmer. 
        Saint Austin of DevMountain: Austin's lifestyle reflects his religious beliefs and one of Austin's classmate created an emoji and called it Saint Austin of DevMountain.
        TripleS: Josh's lifestyle can be summarized with three words: Stargazing, Sockets, & Subway. 
        EDM Hunter: Hunter's lifestyle can be explained with a tie dye t-shirt he wore which has Bob Ross' face on it and the phrase Positive Vibes. One of his mentors created an emjoji with Hunter's face wearing sunglasses and called it EDM Hunter.
    

### Solution

<details>

<summary> <code> SQL Solutions </code> </summary>

<details>

<summary> <code> #1 </code> </summary>

```sql
CREATE TABLE PERSON (
    id SERIAL PRIMARY KEY 
    , name TEXT
    , nickname TEXT
    , age INTEGER
    , height INTEGER
    , city TEXT
    , favoritecolor TEXT
);
```

</details>

<details>

<summary> <code> #2 </code> </summary>

```sql
INSERT INTO person 
(name, nickname, age, height, city, favoritecolor)
VALUES 
('Andrew', 'WPM', 25, 175, 'Irving', 'Aquamarine')
, ('Sean', 'Captain Bad Programmer', 24, 183, 'LA', 'Orange')
, ('Austin', 'Saint Austin of DevMountain', 23, 168, 'Orange County', 'Blue')
, ('Josh', 'TripleS', 30, 182, 'Lemoore', 'Green')
, ('Hunter', 'EDM Hunter', 18, 185, 'San Diego', 'Purple');
```

</details>

<details>

<summary> <code> #3 </code> </summary>

```sql
SELECT * FROM Person ORDER BY height DESC;
```

</details>

<details>

<summary> <code> #4 </code> </summary>

```sql
SELECT * FROM Person ORDER BY height ASC;
```

</details>

<details>

<summary> <code> #5 </code> </summary>

```sql
SELECT * FROM Person ORDER BY age DESC;
```

</details>

<details>

<summary> <code> #6 </code> </summary>

```sql
SELECT * FROM Person WHERE age > 20;
```

</details>

<details>

<summary> <code> #7 </code> </summary>

```sql
SELECT * FROM Person WHERE age = 18;
```

</details>

<details>

<summary> <code> #8 </code> </summary>

```sql
SELECT * FROM Person WHERE age < 20 OR age > 27;
```

</details>

<details>

<summary> <code> #9 </code> </summary>

```sql
SELECT * FROM Person WHERE Age != 18;
```

</details>

<details>

<summary> <code> #10 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(favoritecolor) != LOWER('orange');
```

</details>

<details>

<summary> <code> #11 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(favoritecolor) != LOWER('orange') AND LOWER(favoritecolor) != LOWER('blue');
```

</details>

<details>

<summary> <code> #12 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(favoritecolor) = LOWER('purple') OR LOWER(favoritecolor) = LOWER('green');
```

</details>

<details>

<summary> <code> #13 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(favoritecolor) IN ( LOWER('purple'), LOWER('green'), LOWER('blue'));
```

</details>

<details>

<summary> <code> #14 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(city) IN ( LOWER('Irving'), LOWER('LA'));
```

</details>

<details>

<summary> <code> #15 </code> </summary>

```sql
SELECT * FROM Person WHERE LOWER(nickname) != LOWER('Captain Bad Programmer');
```

</details>

</details>

## Table - Orders

### Instructions

1. Create a table called Orders that records: id, personid, productname, productprice, quantity.
2. Add these 5 orders to the Orders table.
   1. personid: 1, productname: Flaming Hot Cheetos, productprice: 1.29, quantity: 50
   2. personid: 1, productname Pizza, productprice: 5.00, quantity 3
   3. personid: 2, productname: Ramen, productprice: 0.29, quantity: 30 
   4. personid: 3, productname: Blender, productprice: 65.25, quantity: 1
   5. personid: 4, productname: Rubber Duck, productprice: 0.30, quantity: 22
3. Select all the records from the Orders table.
4. Calculate the total number of products ordered.
5. Calculate the total price of all products ordered.
6. Calculate the total price of all orders made by the person with the id of 1.

### Solution

<details>

<summary> <code> SQL Solutions </code> </summary>

<details>

<summary> <code> #1 </code> </summary>

```sql
CREATE TABLE Orders ( 
    id SERIAL PRIMARY KEY
    , personid INTEGER
    , productname TEXT
    , productprice FLOAT
    , quantity INTEGER 
);
```

</details>

<details>

<summary> <code> #2 </code> </summary>

```sql
INSERT INTO orders 
(personid, productname, productprice, quantity)
VALUES
(1, 'Flaming Hot Cheetos', 1.29, 50)
, (1, 'Pizza', 5.00, 3)
, (2, 'Ramen', 0.29, 30)
, (3, 'Blender', 65.25, 1)
, (4, 'Rubber Duck', .30, 22);
```

</details>

<details>

<summary> <code> #3 </code> </summary>

```sql
SELECT * FROM Orders;
```

</details>

<details>

<summary> <code> #4 </code> </summary>

```sql
SELECT SUM(quantity) FROM Orders;
```

</details>

<details>

<summary> <code> #5 </code> </summary>

```sql
SELECT SUM(productprice * quantity) FROM Orders;
```

</details>

<details>

<summary> <code> #6 </code> </summary>

```sql
SELECT SUM(productprice * quantity) FROM Orders WHERE personid = 1;
```

</details>

</details>

**For the next three tables (Artist, Employee, & Invoice), you will be using the Chinook database provided. Copy the chinook.sql file and run it into your database. You will only need to run this file once entirely.**

**Make sure to use double quotes for all table names and column names. Double quotes are what allows capital letters to use inserted/used in postgreSQL. All table names and column names start with a capital letter and is using camelCase.** 


## Table - Artist

### Instructions

1. Add 3 new artists to the Artist table with their "ArtistId" being 276, 277, 278. The "ArtistId" column accepts integers. ( It's already created )
2. Select 10 artists in reverse alphabetical order.
3. Select 5 artists in alphabetical order.
4. Select all artists where their "Name" starts with the word "Black".
5. Select all artists where their "Name" contains the word "Black".

### Solution 

<details>

<summary> <code> SQL Solutions </code> </summary>

<details>

<summary> <code> #1 </code> </summary>

```sql
INSERT INTO "Artist" 
( "ArtistId", "Name" ) 
VALUES 
(276,'Artist Name' ) 
, (277,'Artist Name' )
, (278,'Artist Name' );
```

</details>

<details>

<summary> <code> #2 </code> </summary>

```sql
SELECT * FROM "Artist" ORDER BY "Name" Desc LIMIT 10;
```

</details>

<details>

<summary> <code> #3 </code> </summary>

```sql
SELECT * FROM "Artist" ORDER BY "Name" ASC LIMIT 5;
```

</details>

<details>

<summary> <code> #4 </code> </summary>

```sql
SELECT * FROM "Artist" WHERE "Name" LIKE 'Black%';
```

</details>

<details>

<summary> <code> #5 </code> </summary>

```sql
SELECT * FROM "Artist" WHERE "Name" LIKE '%Black%';
```

</details>

</details>

## Table - Employee

### Instructions

1. List all Employee first and last names only that live in Calgary.
2. Find the first and last name and birthdate for the youngest employee.
3. Find the first and last name and birthdate for the oldest employee.
4. Find everyone that reports to Nancy Edwards (Use the ReportsTo column).
   * You will need to query the employee table to find the "EmployeeId" for Nancy Edwards
5. Count how many people live in Lethbridge.

### Solution

<details>

<summary> <code> SQL Solutions </code> </summary>

<details>

<summary> <code> #1 </code> </summary>

```sql
SELECT "FirstName", "LastName" FROM "Employee" WHERE "City" = 'Calgary';
```

</details>

<details>

<summary> <code> #2 </code> </summary>

```sql
SELECT "FirstName", "LastName", "BirthDate" FROM "Employee" WHERE "BirthDate" = (SELECT max("BirthDate") FROM "Employee");
```

</details>

<details>

<summary> <code> #3 </code> </summary>

```sql
SELECT "FirstName", "LastName", "BirthDate" FROM "Employee" WHERE "BirthDate" = (SELECT min("BirthDate") FROM "Employee");
```

</details>

<details>

<summary> <code> #4 </code> </summary>

```sql
SELECT * FROM "Employee" WHERE "ReportsTo" = (SELECT "EmployeeId" FROM "Employee" WHERE "FirstName" = 'Nancy' AND "LastName" = 'Edwards');
```

</details>

<details>

<summary> <code> #5 </code> </summary>

```sql
SELECT COUNT(*) FROM "Employee" WHERE "City" = 'Lethbridge';
```

</details>

</details>

## Table - Invoice 

### Instructions

1. Count how many orders were made from the USA.
2. Find the largest order total amount.
3. Find the smallest order total amount.
4. Find all orders bigger than $5.
5. Count how many orders were smaller than $5.
6. Count how many orders were in CA, TX, or AZ (use IN).
7. Get the average total of the orders.
8. Get the total sum of the orders.

### Solution

<details>

<summary> <code> SQL Solutions </code> </summary>

<details>

<summary> <code> #1 </code> </summary>

```sql
SELECT Count(*) FROM "Invoice" WHERE "BillingCountry" = 'USA';
```

</details>

<details>

<summary> <code> #2 </code> </summary>

```sql
SELECT Max("Total") FROM "Invoice";
```

</details>

<details>

<summary> <code> #3 </code> </summary>

```sql
SELECT Min("Total") FROM "Invoice";
```

</details>

<details>

<summary> <code> #4 </code> </summary>

```sql
SELECT * FROM "Invoice" WHERE "Total" > 5;
```

</details>

<details>

<summary> <code> #5 </code> </summary>

```sql
SELECT COUNT(*) FROM "Invoice" WHERE "Total" < 5;
```

</details>

<details>

<summary> <code> #6 </code> </summary>

```sql
SELECT Count(*) FROM "Invoice" WHERE "BillingState" in ('CA', 'TX', 'AZ');
```

</details>

<details>

<summary> <code> #7 </code> </summary>

```sql
SELECT AVG("Total") FROM "Invoice";
```

</details>

<details>

<summary> <code> #8 </code> </summary>

```sql
SELECT SUM("Total") FROM "Invoice";
```

</details>

</details>

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
