const faker = require('faker/locale/en');
const bcrypt = require('bcrypt');

const createFakeUser = async () => {
    const password = await bcrypt.hash(faker.internet.password(8), 10);
    const [firstname, lastname] = [faker.name.firstName(), faker.name.lastName()]
    return {
        firstname,
        lastname,
        email: faker.internet.email(firstname, lastname),
        password
    }
    
}

module.exports = createFakeUser;