const testInit = require('./helpers/init');

// Method to check if object is contained within array
expect.extend({
  toContainObject(received, argument) {

    const pass = this.equals(received, 
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    )

    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
        pass: false
      }
    }
  }
});


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
          await db.query('DROP TABLE IF EXISTS PERSON');
          await db.person_1();
          const persons = await db.query("SELECT * FROM pg_catalog.pg_tables WHERE tablename = 'person'");
            expect(persons[0].tablename).toBe('person');
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
            await db.query("INSERT INTO person (name, nickname, age, height, city, favoritecolor) VALUES ('Andrew', 'WPM', 25, 175, 'Irving', 'Aquamarine')");
            const persons = await db.query('SELECT * FROM person WHERE id = 1');
                expect(persons[0]).toEqual(person);
            // Cleaning up person created
            await db.query('DELETE FROM person');
        });
    });

    describe('Person 2 Test', () => {
        it('should successfully add 5 people', async () => {
            await db.person_2();
            const numbers = await db.query('SELECT COUNT(*) FROM person');
                expect(parseInt(numbers[0].count, 10)).toBe(5);
        });
    });

    describe('Person 3 Test', () => {
        it('should successfully order people from tallest to shortest', async () => {
            const persons = await db.person_3();
                expect(persons[0].name).toBe('Hunter');
                expect(persons[1].name).toBe('Sean');
                expect(persons[2].name).toBe('Josh');
                expect(persons[3].name).toBe('Andrew');
                expect(persons[4].name).toBe('Austin');
        });
    });


    describe('Person 4 Test', () => {
        it('should successfully order people from shortest to tallest', async () => {
            const persons = await db.person_4();
                expect(persons[0].name).toBe('Austin');
                expect(persons[1].name).toBe('Andrew');
                expect(persons[2].name).toBe('Josh');
                expect(persons[3].name).toBe('Sean');
                expect(persons[4].name).toBe('Hunter');
        });
    });


    describe('Person 5 Test', () => {
        it('should successfully order people from oldest to youngest', async () => {
            const persons = await db.person_5();
                  expect(persons[0].name).toBe('Josh');
                  expect(persons[1].name).toBe('Andrew');
                  expect(persons[2].name).toBe('Sean');
                  expect(persons[3].name).toBe('Austin');
                  expect(persons[4].name).toBe('Hunter');
        });
    });

    describe('Person 6 Test', () => {
        it('should successfully select people that are older than 20', async () => {
            const persons = await db.person_6();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).toContainObject({name: 'Andrew'});
            expect(persons).toContainObject({name: 'Sean'});
            expect(persons).toContainObject({name: 'Austin'});
            expect(persons).not.toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 7 Test', () => {
        it('should successfully select people that are 18', async () => {
            const persons = await db.person_7();
            expect(persons).toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 8 Test', () => {
        it('should successfully select people that are younger than 20 and older than 27', async () => {
            const persons = await db.person_8();
            expect(persons).toContainObject({name: 'Hunter'});
            expect(persons).toContainObject({name: 'Josh'});
        });
    });

    describe('Person 9 Test', () => {
        it('should successfully select people that are not 18 years old', async () => {
            const persons = await db.person_9();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).toContainObject({name: 'Andrew'});
            expect(persons).toContainObject({name: 'Sean'});
            expect(persons).toContainObject({name: 'Austin'});
            expect(persons).not.toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 10 Test', () => {
        it('should successfully select people whose favorite color is not Orange', async () => {
            const persons = await db.person_10();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).toContainObject({name: 'Andrew'});
            expect(persons).not.toContainObject({name: 'Sean'});
            expect(persons).toContainObject({name: 'Austin'});
            expect(persons).toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 11 Test', () => {
        it('should successfully select people whose favorite color is not Orange and is not Blue', async () => {
            const persons = await db.person_11();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).toContainObject({name: 'Andrew'});
            expect(persons).not.toContainObject({name: 'Sean'});
            expect(persons).not.toContainObject({name: 'Austin'});
            expect(persons).toContainObject({name: 'Hunter'});
        });
    });
    
    describe('Person 12 Test', () => {
        it('should successfully select people whose favorite color is Purple or Green', async () => {
            const persons = await db.person_12();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).not.toContainObject({name: 'Andrew'});
            expect(persons).not.toContainObject({name: 'Sean'});
            expect(persons).not.toContainObject({name: 'Austin'});
            expect(persons).toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 13 Test', () => {
        it('should successfully select people whose favorite color is Purple, Green or Blue', async () => {
            const persons = await db.person_13();
            expect(persons).toContainObject({name: 'Josh'});
            expect(persons).not.toContainObject({name: 'Andrew'});
            expect(persons).not.toContainObject({name: 'Sean'});
            expect(persons).toContainObject({name: 'Austin'});
            expect(persons).toContainObject({name: 'Hunter'});
        });
    });

    describe('Person 14 Test', () => {
        it('should successfully select people whose city is Irving or LA', async () => {
            const persons = await db.person_14();
            expect(persons).not.toContainObject({name: 'Josh'});
            expect(persons).toContainObject({name: 'Andrew'});
            expect(persons).toContainObject({name: 'Sean'});
            expect(persons).not.toContainObject({name: 'Austin'});
            expect(persons).not.toContainObject({name: 'Hunter'});
        });
    });

});
