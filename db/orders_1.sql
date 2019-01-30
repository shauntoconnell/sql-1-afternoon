CREATE TABLE Orders (
	id SERIAL PRIMARY KEY
	, personid INTEGER
	, productname TEXT
	, productprice FLOAT
	, quantity INTEGER
)