import faker from 'faker';

export class Mocking {
    constructor() {}

    static async genProd() {
        let products = [];

        for (let i = 0; i < 100; i++) {
            let _id = faker.uuid(); /* genera id aleatorios */
            let code = faker.string.alphaNumeric(5);
            let title = faker.commerce.productName();
            let description = faker.commerce.product();
            let price = faker.commerce.price({ min: 1000, max: 4000, dec: 2, symbol: '$' });
            let stock = faker.number({ min: 1, max: 20 });
            let category = faker.commerce.department();
            let thumbnail = faker.image.imageUrl();
            let __v = 0;
            let status = true;

            products.push({
                _id,
                code,
                title,
                description,
                price,
                stock,
                category,
                thumbnail,
                __v,
                status
            });
        }

        return products;
    }
}
