const { BadRequest, Unauthenticated } = require("../errors");
const { CustomerRepository } = require("../repository/customer-repository");
const validator = require("validator");
const { GenerateToken } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const bcryptjs = require("bcryptjs");

class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }

    async signUp(payload) {
        const { firstName, lastName, userName, email, password, phone } =
            payload;

        if (!firstName) {
            throw new BadRequest("First name is required");
        }

        if (!lastName) {
            throw new BadRequest("Last name is required");
        }

        if (!email) {
            throw new BadRequest("Email address is required");
        }

        if (!password) {
            throw new BadRequest("Password is required");
        }

        if (!phone) {
            throw new BadRequest("Phone number is required");
        }

        if (!validator.default.isStrongPassword(password)) {
            throw new BadRequest(
                "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
            );
        }

        const createCustomer = await this.repository.createCustomer(payload);

        const token = await GenerateToken({
            id: createCustomer.id,
            email: createCustomer.email,
        });

        return {
            success: true,
            data: createCustomer,
            token,
        };
    }

    async login(payload) {
        const { password, email } = payload;
        console.log(payload);

        if (!email) {
            throw new BadRequest("Email address is required");
        }

        if (!validator.default.isEmail(email)) {
            throw new BadRequest("Please provide a valid email address");
        }

        if (!password) {
            throw new BadRequest("Password is required");
        }

        if (!validator.default.isStrongPassword(password)) {
            throw new BadRequest(
                "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
            );
        }

        const customer = await this.repository.getCustomerByEmail(payload);

        if (!customer) {
            throw new Unauthenticated("Login failed: Incorrect email address");
        }

        const comparePassword = await bcryptjs.compare(
            password,
            customer.password
        );

        if (!comparePassword) {
            throw new Unauthenticated("Login failed: Incorrect  password");
        }

        const token = await GenerateToken({
            id: customer.id,
            email: customer.email,
        });

        return {
            success: true,
            data: customer,
            token,
        };
    }
}

module.exports = { CustomerService };
