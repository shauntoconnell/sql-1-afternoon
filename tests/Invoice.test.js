const testInit = require('./helpers/init');

describe('Invoice Table Tests', () => {
    let db; 

    // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        });
    });

    describe('Invoice 1 Test', () => {
        it("should successfully count how many orders came from the USA", async () => {
            const counts = await db.Invoice_1();
                expect(parseInt(counts[0].count, 10)).toBe(91);      
        });
    });

    describe('Invoice 2 Test', () => {
        it("should successfully find the largest order total amount", async () => {
            const totals = await db.Invoice_2();
                expect(parseFloat(totals[0].max, 10)).toBe(25.86);      
        });
    });

    describe('Invoice 3 Test', () => {
        it("should successfully find the smallest order total amount", async () => {
            const totals = await db.Invoice_3();
                expect(parseFloat(totals[0].min, 10)).toBe(.99);      
        });
    });

    describe('Invoice 4 Test', () => {
        it("should successfully find all orders bigger than $5", async () => {
            const invoices = await db.Invoice_4();
                invoices.forEach(invoice => {
                    expect(parseFloat(invoice.Total, 10)).toBeGreaterThan(5);      
                });
        });
    });

    describe('Invoice 5 Test', () => {
        it("should successfully count how many orders were in CA, TX, or AZ", async () => {
            const counts = await db.Invoice_5();
                expect(parseInt(counts[0].count, 10)).toBe(233);      
        });
    });

    describe('Invoice 6 Test', () => {
        it("should successfully count how many orders were in CA, TX, or AZ", async () => {
            const counts = await db.Invoice_6();
                expect(parseInt(counts[0].count, 10)).toBe(35);      
        });
    });

    describe('Invoice 7 Test', () => {
        it("should successfully get the average total of all orders", async () => {
            const totals = await db.Invoice_7();
            const avgDecimal = parseFloat(totals[0].avg, 10)
            const avgDecimalRounded = parseFloat(avgDecimal, 10).toFixed(2)
            expect(parseFloat(avgDecimalRounded, 10)).toBe(5.65);      
        });
    });

    describe('Invoice 8 Test', () => {
        it("should successfully get the total sum of all orders", async () => {
            const totals = await db.Invoice_8();
            expect(parseFloat(totals[0].sum, 10)).toBe(2328.60);      
        });
    });

});