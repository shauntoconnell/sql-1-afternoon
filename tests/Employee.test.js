const testInit = require('./helpers/init');

// Reusable function for transaction
function dbTransaction(db, doExpects) {
    let testPasses = false;
    return db.withTransaction(async (tx) => {
        await doExpects(tx);
        testPasses = true;
        return Promise.reject(new Error('Intentional rollback for testing'));
    }).catch(error => {
        if (testPasses) {
            // Do nothing. The promise returned to jest will be marked as resolved, meaning
            // the test will pass successfully.
        } else {
            throw error
        }
    });
}

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

describe('Employee Table Tests', () => {
    let db;

    // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        });
    });

    describe('Employee 1 Test', () => {
        it("should successfully select all employees' first and last name that live in Calagary", async () => {
            const employees = await db.Employee_1();
            expect(employees.length).toBe(5);
            expect(employees).toContainObject({ FirstName: 'Nancy', LastName: 'Edwards' });
            expect(employees).toContainObject({ FirstName: 'Jane', LastName: 'Peacock' });
            expect(employees).toContainObject({ FirstName: 'Margaret', LastName: 'Park' });
            expect(employees).toContainObject({ FirstName: 'Steve', LastName: 'Johnson' });
            expect(employees).toContainObject({ FirstName: 'Michael', LastName: 'Mitchell' });
        });
    });

    describe('Employee 2 Test', () => {
        it("should successfully select the youngest employee's FirstName, LastName, & BirthDate", async () => {
            const employees = await db.Employee_2();
            expect(employees.length).toBe(1);
            expect(employees).toContainObject({ BirthDate: new Date('1973/8/29'), FirstName: 'Jane', LastName: 'Peacock' });
        });
    });

    describe('Employee 3 Test', () => {
        it("should successfully select the oldest employee's FirstName, LastName, & BirthDate", async () => {
            const employees = await db.Employee_3();
            expect(employees.length).toBe(1);
            expect(employees).toContainObject({ BirthDate: new Date('1947/09/19'), FirstName: 'Margaret', LastName: 'Park' });
        });
    });

    describe('Employee 4 Test', () => {
        it("should successfully select the employees who report to Nancy Edwards", async () => {
            const employees = await db.Employee_4();
            expect(employees.length).toBe(3);
            expect(employees).toContainObject({ FirstName: 'Jane', LastName: 'Peacock' });
            expect(employees).toContainObject({ FirstName: 'Margaret', LastName: 'Park' });
            expect(employees).toContainObject({ FirstName: 'Steve', LastName: 'Johnson' });
        });
    });

    describe('Employee 5 Test', () => {
        it("should successfully select the employees who live in Lethbridge", async () => {
            const counts = await db.Employee_5();
            expect(parseInt(counts[0].count, 10)).toBe(2);
        });
    });

    describe('Employee 6 Test', () => {
        it('should successfully delete Andrew Adams from the Employee table', () => {

            //reference dbTransaction on line 3
            return dbTransaction(db, async (tx) => {
                await tx.Employee_6();
                const employees = await tx.query('SELECT * FROM "Employee"');
                expect(employees).not.toContainObject({ FirstName: 'Andrew', LastName: 'Adams' });
            });
        });
    });

    describe('Employee 7 Test', () => {
        it('should successfully update Nancy Edwards "Title" to General Manager and "ReportsTo" to null', () => {

            //reference dbTransaction on line 3
            return dbTransaction(db, async (tx) => {
                await tx.Employee_7();
                const employees = await tx.query(`SELECT * FROM "Employee" WHERE "FirstName" = 'Nancy' AND "LastName" = 'Edwards'`);
                expect(employees[0].Title).toBe('General Manager');
                expect(employees[0].ReportsTo).toBeNull();
            });
        });
    });

    describe('Employee 8 Test', () => {
        it(`should successfully change all employees' "Title" with the title Sales Support Agent to Sales Support Specialist`, () => {
            return dbTransaction(db, async (tx) => {
                await tx.Employee_8();
                const employees = await tx.query(`SELECT * FROM "Employee"`);
                expect(employees).not.toContainObject({ Title: 'Sales Support Agent' });
                expect(employees).toContainObject({ FirstName: 'Jane', LastName: 'Peacock', Title: 'Sales Support Specialist' });
                expect(employees).toContainObject({ FirstName: 'Margaret', LastName: 'Park', Title: 'Sales Support Specialist' });
                expect(employees).toContainObject({ FirstName: 'Steve', LastName: 'Johnson', Title: 'Sales Support Specialist' });
            });
        });
    });
});

