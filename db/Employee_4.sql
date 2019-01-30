SELECT * FROM employee
WHERE reports_to = (
	SELECT employee_id FROM employee
	WHERE first_name = 'Nancy'
	AND last_name = 'Edwards'
);
