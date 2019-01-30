-- SELECT first_name, last_name, birth_date FROM employee
-- ORDER BY birth_date ASC
-- LIMIT 1;

SELECT first_name, last_name, birth_date FROM employee
WHERE birth_date = (SELECT MIN(birth_date) FROM employee)