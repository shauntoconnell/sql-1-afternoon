const testInit = require('./helpers/init');

describe('Artist Table Tests', () => {
    let db; 

    // Connect to the database
    beforeAll(() => {
        return testInit.initDb().then(database => {
            db = database;
        });
    });

    // Reverse all commands done by user after each test
    // beforeEach(() => {
    //     return db.query('BEGIN TRANSACTION')
    // });

    // afterEach(() => {
    //     return db.query('ROLLBACK')
    // });

    describe('Artist 1 Test', () => {
        it('should successfully add 3 artists', async () => {
            await db.query('DELETE FROM "Artist" WHERE "ArtistId" in (276, 277, 278)');
            await db.Artist_1();
            const artists = await db.query('SELECT * FROM "Artist" WHERE "ArtistId" in (276, 277, 278)').then(artists => artists);
                expect(artists.length).toBe(3);
            await db.query('DELETE FROM "Artist" WHERE "ArtistId" in (276, 277, 278)');
        });
    });

    describe('Artist 2 Test', () => {
        it('should successfully select 10 artists in reverse alphabetical order', async () => {
            const artists = await db.Artist_2().then(artists => artists);
             expect(artists.length).toBe(10);
             expect(artists[0].Name).toBe('Zeca Pagodinho');
             expect(artists[7].Name).toBe('Vinicius, Toquinho & Quarteto Em Cy');
        });
    });

    describe('Artist 3 Test', () => {
        it('should successfully select 10 artists in reverse alphabetical order', async () => {
            const artists = await db.Artist_3().then(artists => artists);
             expect(artists.length).toBe(5);
             expect(artists[0].Name).toBe('Aaron Copland & London Symphony Orchestra');
             expect(artists[4].Name).toBe('Academy of St. Martin in the Fields & Sir Neville Marriner');
        });
    });

   describe('Artist 4 Test', () => {
        it('should successfully select artists where their "Name" starts with the word Black', async () => {
            const artists = await db.Artist_4().then(artists => artists);
             expect(artists.length).toBe(3);
             expect(artists.find(artist => artist.Name === 'Black Sabbath')).toBeTruthy();
        });
    });

    describe('Artist 5 Test', () => {
        it('should successfully select artists where their "Name" contains the word Black', async () => {
            const artists = await db.Artist_5().then(artists => artists);
             expect(artists.length).toBe(5);
             expect(artists.find(artist => artist.Name === 'The Black Crowes')).toBeTruthy();
        });
    });
});