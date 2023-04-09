const { customer, address } = require("../models");

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
        const createCustomer = await customer.create({ ...data });

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

    async createAddress({
        id,
        street,
        postalCode,
        city,
        country,
        houseNumber,
    }) {
        const data = { street, postalCode, city, country, houseNumber };

        const createAddress = await address.create({ ...data, customerId: id });

        return createAddress;
    }

    async getCustomerById({ id }) {
        const getCustomer = await customer.findByPk(id);

        return getCustomer;
    }
}

module.exports = { CustomerRepository };
