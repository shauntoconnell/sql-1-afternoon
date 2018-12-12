const testInit = require('./helpers/init');

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
            const employees = await db.Employee_1().then(employees => employees);
                expect(employees.length).toBe(5);
                expect(employees.find(employee => employee.FirstName === 'Nancy' && employee.LastName === 'Edwards')).toBeTruthy();
                expect(employees.find(employee => employee.FirstName === 'Jane' && employee.LastName === 'Peacock')).toBeTruthy();
                expect(employees.find(employee => employee.FirstName === 'Margaret' && employee.LastName === 'Park')).toBeTruthy();
                expect(employees.find(employee => employee.FirstName === 'Steve' && employee.LastName === 'Johnson')).toBeTruthy();
                expect(employees.find(employee => employee.FirstName === 'Michael' && employee.LastName === 'Mitchell')).toBeTruthy();
                
        });
    });

    describe('Employee 2 Test', () => {
        it("should successfully select the youngest employee's FirstName, LastName, & BirthDate", async () => {
            const employees = await db.Employee_2().then(employees => employees);
                expect(employees.length).toBe(1);
                expect(employees.find(employee => employee.FirstName === 'Jane' && employee.LastName === 'Peacock')).toBeTruthy();      
        });
    });

    describe('Employee 3 Test', () => {
        it("should successfully select the oldest employee's FirstName, LastName, & BirthDate", async () => {
            const employees = await db.Employee_3().then(employees => employees);
                expect(employees.length).toBe(1);
                expect(employees.find(employee => employee.FirstName === 'Margaret' && employee.LastName === 'Park')).toBeTruthy();      
        });
    });

    describe('Employee 4 Test', () => {
        it("should successfully select the employees who report to Nancy Edwards", async () => {
            const employees = await db.Employee_4().then(employees => employees);
                expect(employees.length).toBe(3);
                expect(employees.find(employee => employee.FirstName === 'Steve' && employee.LastName === 'Johnson')).toBeTruthy();      
                expect(employees.find(employee => employee.FirstName === 'Margaret' && employee.LastName === 'Park')).toBeTruthy();      
                expect(employees.find(employee => employee.FirstName === 'Jane' && employee.LastName === 'Peacock')).toBeTruthy();      
        });
    });

    describe('Employee 5 Test', () => {
        it("should successfully select the employees who live in Lethbridge", async () => {
            const counts = await db.Employee_5().then(counts => counts);
                expect(+counts[0].count).toBe(2);      
        });
    });
});