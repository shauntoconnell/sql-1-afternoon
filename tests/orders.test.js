const testInit = require('./helpers/init');

describe('Orders Table Tests', () => {
    let db; 

     // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        });
    });

    describe('Orders 1 Test', () => {
        it('should successfully create table ORDERS', async () => {
          await db.query('DROP TABLE IF EXISTS ORDERS');
          await db.orders_1();
          const orders = await db.query("SELECT * FROM pg_catalog.pg_tables WHERE tablename = 'orders'");
          
          expect(orders[0].tablename).toBe('orders');
        });
  
        it('should successfully add an order', async () => {   
            const order = {
                id: 1, 
                personid: 1,
                productname: 'dog bone',
                productprice: 10.24,
                quantity: 1,
            };
            await db.query('DELETE FROM orders');
            await db.query("INSERT INTO orders (personid, productname, productprice, quantity) VALUES (1, 'dog bone', 10.24, 1)");
            const orders = await db.query('SELECT * FROM orders WHERE id = 1');
            expect(orders[0]).toEqual(order);
            // Cleaning up order created
            await db.query('DELETE FROM orders');
        });
    });

    describe('Orders 2 Test', () => {
        it('should successfully add 5 orders', async () => {  
           await db.query('DELETE FROM orders');
           await db.orders_2();
           const counts = await db.query('SELECT COUNT(*) FROM orders');
           expect(parseInt(counts[0].count, 10)).toBe(5);
        });
    });

    describe('Orders 3 Test', () => {
        it('should successfully select all orders', async () => {
            await db.orders_3();
            const counts = await db.query('SELECT COUNT(*) FROM orders');
                expect(parseInt(counts[0].count, 10)).toBe(5);
        });
    });

    describe('Orders 4 Test', () => {
        it('should successfully find the total quantity count of all orders', async () => {
            const sums = await db.orders_4();
            expect(parseInt(sums[0].sum, 10)).toBe(106);
        });
    });

    describe('Orders 5 Test', () => {
        it('should successfully find the total price of all orders', async () => {
            const sums = await db.orders_5();
            expect(parseFloat(sums[0].sum, 10)).toBe(160.05);
        });
    });

    describe('Orders 6 Test', () => {
        it('should successfully find the total price of all orders from the person with an id of 1', async () => {
            const sums = await db.orders_6();
            expect(parseFloat(sums[0].sum, 10)).toBe(79.5);
        });
    });
});


