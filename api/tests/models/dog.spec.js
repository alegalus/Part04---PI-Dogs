const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      
      it('should throw an error if height is null', (done) => {
        Dog.create({name: "Pug", weight: "10 - 12"})
          .then(() => done(new Error('It requires a valid heigth')))
          .catch(() => done());
      });
      it('should work when have all the dates', () => {
        Dog.create({name: "Pug", height: "20 - 24", weight: "10 - 12"});
      });

    });
  });
});
