const testInit = require('./helpers/init');

// Reusable function for transaction
function dbTransaction(db, doExpects) {
    let testPasses = false;
    db.withTransaction(async (tx) => {
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

describe('Artist Table Tests', () => {
    let db; 

    // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        })
    });

    describe('Artist 1 Test', () => {
        it('should successfully add 3 artists', () => {
            //reference dbTransaction on line 3
            dbTransaction(db, async (tx) => {
               await tx.Artist_1();
               const artists = await tx.query('SELECT * FROM "Artist" WHERE "ArtistId" in (276, 277, 278');
               expect(artists.length).toBe(3);
            })
        });
    });


    describe('Artist 2 Test', () => {
        it('should successfully select 10 artists in reverse alphabetical order', async () => {
            const artists = await db.Artist_2();
            expect(artists.length).toBe(10);
            expect(artists[0].Name).toBe('Zeca Pagodinho');
            expect(artists[7].Name).toBe('Vinicius, Toquinho & Quarteto Em Cy');
        });
    });

    describe('Artist 3 Test', () => {
        it('should successfully select 10 artists in reverse alphabetical order', async () => {
            const artists = await db.Artist_3();
            expect(artists.length).toBe(5);
            expect(artists[0].Name).toBe('Aaron Copland & London Symphony Orchestra');
            expect(artists[4].Name).toBe('Academy of St. Martin in the Fields & Sir Neville Marriner');
        });
    });

   describe('Artist 4 Test', () => {
        it('should successfully select artists where their "Name" starts with the word Black', async () => {
            const artists = await db.Artist_4();
            expect(artists.length).toBe(3);
            expect(artists).toContainObject({Name: 'Black Label Society'});
            expect(artists).toContainObject({Name: 'Black Sabbath'});
            expect(artists).toContainObject({Name: 'Black Eyed Peas'});
        });
    });

    describe('Artist 5 Test', () => {
        it('should successfully select artists where their "Name" contains the word Black', () => {
            db.Artist_5().then(artists => {
                expect(artists.length).toBe(5);
                expect(artists).toContainObject({Name: 'Black Label Society'});
                expect(artists).toContainObject({Name: 'Black Sabbath'});
                expect(artists).toContainObject({Name: 'Banda Black Rio'});
                expect(artists).toContainObject({Name: 'The Black Crowes'});
                expect(artists).toContainObject({Name: 'Black Eyed Peas'});
            });
        });
    });
});