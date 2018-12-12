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
            const counts = await db.Invoice_1().then(counts => counts);
                expect(+counts[0].count).toBe(91);      
        });
    });

    describe('Invoice 2 Test', () => {
        it("should successfully find the largest order total amount", async () => {
            const totals = await db.Invoice_2().then(totals => totals);
                expect(+totals[0].max).toBe(25.86);      
        });
    });

    describe('Invoice 3 Test', () => {
        it("should successfully find the smallest order total amount", async () => {
            const totals = await db.Invoice_3().then(totals => totals);
                expect(+totals[0].min).toBe(.99);      
        });
    });

    describe('Invoice 4 Test', () => {
        it("should successfully find all orders bigger than $5", async () => {
            const invoices = await db.Invoice_4().then(invoices => invoices);
                invoices.forEach(invoice => {
                    expect(+invoice.Total).toBeGreaterThan(5);      
                });
        });
    });

    describe('Invoice 5 Test', () => {
        it("should successfully count how many orders were in CA, TX, or AZ", async () => {
            const counts = await db.Invoice_5().then(counts => counts);
                expect(+counts[0].count).toBe(233);      
        });
    });

    describe('Invoice 6 Test', () => {
        it("should successfully count how many orders were in CA, TX, or AZ", async () => {
            const counts = await db.Invoice_6().then(counts => counts);
                expect(+counts[0].count).toBe(35);      
        });
    });

    describe('Invoice 7 Test', () => {
        it("should successfully get the average total of all orders", async () => {
            const totals = await db.Invoice_7().then(totals => totals);
            const avgDecimal = +totals[0].avg 
            const avgDecimalRounded = +avgDecimal.toFixed(2)
                expect(avgDecimalRounded).toBe(5.65);      
        });
    });

    describe('Invoice 8 Test', () => {
        it("should successfully get the total sum of all orders", async () => {
            const totals = await db.Invoice_8().then(totals => totals);
                expect(+totals[0].sum).toBe(2328.60);      
        });
    });

});