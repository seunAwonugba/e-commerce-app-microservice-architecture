const { customer } = require("../models");

class CustomerRepository {
    async createCustomer({
        firstName,
        lastName,
        userName,
        email,
        password,
        phone,
    }) {
        const data = { firstName, lastName, userName, email, password, phone };
        const createCustomer = await customer.create(data);

        return createCustomer;
    }

    async getCustomerByEmail({ email }) {
        const getCustomer = await customer.findOne({
            where: {
                email,
            },
        });

        return getCustomer;
    }
}

module.exports = { CustomerRepository };
