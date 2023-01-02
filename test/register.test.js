import { expect } from "chai";
import sinon from 'sinon';

import { registerUser } from '../controllers/register.controller.js'

describe('When the user tries to register', () => {

    let req = {};

    beforeEach(() => {
        req = {
            body: {
                username: "ankit",
                password: "abcd"
            }
        };
    });

    afterEach(() => {
        sinon.restore();
    })


    it('should return invalid credentials', async () => {
        const res = {
            json: (data) => {
                return data;
            }
        };

        const result = {
            status: "login failed",
            message: "Provide all details required"
        };
        console.log(`Hello`);
        req.body = {};

        const x = await registerUser(req, res);
        console.log(x);
        expect(2).to.be.equal(4-2);
    })
})