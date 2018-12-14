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
            // Do nothing. The promise returned to jest will be marked as solved, meaning
            // the test will pass successfully.
        } else {
            throw error
        }
    });
};

// Method to check if object is contained within array (toContainObject)
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
            const orders = await db.Invoice_4();
            orders.forEach(order => {
                expect(parseFloat(order.Total, 10)).toBeGreaterThan(5);      
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

    describe('Invoice 9 Test', () => {
        it(`should successfully remove all orders that has a "BillingState" of null`, () => {
            //reference dbTransaction on line 3
            return dbTransaction( db, async (tx) => {
               await tx.Invoice_9();
               const orders = await tx.query('SELECT * FROM "Invoice"');
               expect(orders).not.toContainObject({BillingState: null});
            });
        });
    });

});