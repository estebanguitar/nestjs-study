const typeorm = require('typeorm');

const getDatesource = () => {
    return new typeorm.DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'password',
        database: 'board',
        synchronize: false,
        logging: true,
        entities: [`dist/entities/*.entity.js`],
        migrations: ['migration/*.js'],
    })
}
exports.default = getDatesource()