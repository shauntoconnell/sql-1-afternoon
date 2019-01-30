SELECT first_name, last_name, birth_date FROM employee
ORDER BY birth_date DESC
LIMIT 1;

-- SELECT first_name, last_name, birth_date FROM employee
-- WHERE birth_date = (SELECT MAX(birth_date) FROM employee);