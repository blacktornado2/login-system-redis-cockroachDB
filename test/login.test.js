import { expect } from "chai";
import sinon from 'sinon';

import { loginUser } from '../controllers/login.controller.js'

describe('API call', () => { 
describe('When the user tries to login', () => {

    let req = {};

    beforeEach(() => {
        req = {
            body: {
                username: "ankit",
                password: "abcd"
            }
        }
    });

    afterEach(() => {
        sinon.restore();
    });

    it.only('When request doesnt contain username or password', async () => {
        
        const res = {
            json: (data) => {
                return data;
            }
        };
        console.log(`Hello`);
        const result = {
            status: "login failed",
            message: "Provide all details required"
        };

        req.body = {};

        const x = await loginUser(req, res);
        expect(result).to.eql(x);
        expect(x).to.be.an('object');

    });

    it('When the username is incorrect', () => {
        
        sinon.stub(redis, 'get').resolves()

    });

    it('When the password is incorrect', () => {


    });

    it('When the username and password is correct, user logins and a new token is generated', () => {


    });
})

});