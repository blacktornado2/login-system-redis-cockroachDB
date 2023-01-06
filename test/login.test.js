import { expect } from "chai";
import sinon from 'sinon';

import { loginUser } from '../controllers/login.controller.js'
import redis from '../config/redis.js'

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

    it('When request doesnt contain username or password', async () => {
        
        const res = {
            json: (data) => {
                return data;
            }
        };
        const result = {
            status: "Login failed",
            message: "Provide all details required"
        };

        req.body = {};

        const x = await loginUser(req, res);
        expect(x).to.eql(result);
        // expect(x).to.be.an('object');

    });
    
    it('When the username is correct, password is incorrect (redis database)', async () => {
        const res = {
            json: (data) => {
                return data;
            }
        };

        const result = {
            status: "Login failed",
            message: "Login failed. Please enter correct password"
        };

        sinon.stub(redis, 'get').resolves(`{"username": "ankit", "password":"12"}`);
        const x = await loginUser(req, res);
        expect(result).to.eql(x);
    });

    // it.skip('When the username and password is correct, user logins and a new token is generated', () => {

    //     sinon.stub(redis, 'get').resolves(null);
    //     sinon.stub(client, 'select').resol

    // });
});

});