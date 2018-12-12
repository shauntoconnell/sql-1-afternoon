const testInit = require('./helpers/init');

describe('Person Table Tests', () => {
    let db; 

    // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        });
    });

    describe('Person 1 Test', () => {
        it('should successfully create a table PERSON', async () => {
          await db.query('DROP TABLE IF EXISTS PERSON')
          await db.person_1()
          const persons = await db.query("SELECT * FROM pg_catalog.pg_tables WHERE tablename = 'person'").then(persons => persons)
            expect(persons[0].tablename).toBe('person')
        });
    
        it('should successfully add a person', async () => {
            const person = {
                id: 1, 
                name: "Andrew",
                nickname: "WPM",
                age: 25,
                height: 175, 
                city: "Irving",
                favoritecolor: "Aquamarine"
            }
            await db.query("INSERT INTO person (name, nickname, age, height, city, favoritecolor) VALUES ('Andrew', 'WPM', 25, 175, 'Irving', 'Aquamarine')")
            const persons = await db.query('SELECT * FROM person WHERE id = 1').then(persons => persons)
                expect(persons[0]).toEqual(person)
            // Cleaning up person created
            await db.query('DELETE FROM person');
        });
    });

    describe('Person 2 Test', () => {
        it('should successfully add 5 people', async () => {
            await db.person_2()
            const numbers = await db.query('SELECT COUNT(*) FROM person').then(numbers => numbers)
                expect(+numbers[0].count).toBe(5)
        });
    });

    describe('Person 3 Test', () => {
        it('should successfully order people from tallest to shortest', async () => {
            const persons = await db.person_3().then(persons => persons)
                expect(persons[0].name).toBe('Hunter');
                expect(persons[1].name).toBe('Sean');
                expect(persons[2].name).toBe('Josh');
                expect(persons[3].name).toBe('Andrew');
                expect(persons[4].name).toBe('Austin');
        });
    });


    describe('Person 4 Test', () => {
        it('should successfully order people from shortest to tallest', async () => {
            const persons = await db.person_4().then(persons => persons)
                expect(persons[0].name).toBe('Austin');
                expect(persons[1].name).toBe('Andrew');
                expect(persons[2].name).toBe('Josh');
                expect(persons[3].name).toBe('Sean');
                expect(persons[4].name).toBe('Hunter');
        });
    });


    describe('Person 5 Test', () => {
        it('should successfully order people from oldest to youngest', async () => {
            const persons = await db.person_5().then(persons => persons);
                  expect(persons[0].name).toBe('Josh');
                  expect(persons[1].name).toBe('Andrew');
                  expect(persons[2].name).toBe('Sean');
                  expect(persons[3].name).toBe('Austin');
                  expect(persons[4].name).toBe('Hunter');
        });
    });

    describe('Person 6 Test', () => {
        it('should successfully select people that are older than 20', async () => {
            const persons = await db.person_6().then(persons => persons)
                  expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Andrew')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Sean')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Austin')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Hunter')).toBeFalsy();
        });
    });

    describe('Person 7 Test', () => {
        it('should successfully select people that are 18', async () => {
            const persons = await db.person_7().then(persons => persons);
                expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
        });
    });

    describe('Person 8 Test', () => {
        it('should successfully select people that are younger than 20 and older than 27', async () => {
            const persons = await db.person_8().then(persons => persons);
                expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
                expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
        });
    });

    describe('Person 9 Test', () => {
        it('should successfully select people that are not 18 years old', async () => {
            const persons = await db.person_9().then(persons => persons)
                expect(persons.find(person => person.name === 'Hunter')).toBeFalsy();
                expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                expect(persons.find(person => person.name === 'Andrew')).toBeTruthy();
                expect(persons.find(person => person.name === 'Sean')).toBeTruthy();
                expect(persons.find(person => person.name === 'Austin')).toBeTruthy();
        });
    });

    describe('Person 10 Test', () => {
        it('should successfully select people whose favorite color is not Orange', async () => {
            const persons = await db.person_10().then(persons => persons);
                expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
                expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                expect(persons.find(person => person.name === 'Andrew')).toBeTruthy();
                expect(persons.find(person => person.name === 'Austin')).toBeTruthy();
                expect(persons.find(person => person.name === 'Sean')).toBeFalsy();
        });
    });

    describe('Person 11 Test', () => {
        it('should successfully select people whose favorite color is not Orange and is not Blue', async () => {
            const persons = await db.person_11().then(persons => persons);
                  expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Andrew')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Austin')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Sean')).toBeFalsy();
        });
    });
    
    describe('Person 12 Test', () => {
        it('should successfully select people whose favorite color is Purple or Green', async () => {
            const persons = db.person_12().then(persons => persons);
                  expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Andrew')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Austin')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Sean')).toBeFalsy();
        });
    });

    describe('Person 13 Test', () => {
        it('should successfully select people whose favorite color is Purple, Green or Blue', async () => {
            const persons = db.person_13().then(persons => persons);
                  expect(persons.find(person => person.name === 'Hunter')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Josh')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Andrew')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Austin')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Sean')).toBeFalsy();
        });
    });

    describe('Person 14 Test', () => {
        it('should successfully select people whose city is Irving or LA', async () => {
            const persons = await db.person_14().then(persons => persons);
                  expect(persons.find(person => person.name === 'Hunter')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Josh')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Andrew')).toBeTruthy();
                  expect(persons.find(person => person.name === 'Austin')).toBeFalsy();
                  expect(persons.find(person => person.name === 'Sean')).toBeTruthy();
        });
    });

});
