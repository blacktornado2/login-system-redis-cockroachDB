import { expect } from "chai";
import sinon from 'sinon';

import { registerUser } from '../controllers/register.controller.js'
import redis from '../config/redis.js';
import client from '../config/configDB.js';

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


    it('When request doesnt contain username or password', async () => {
        const res = {
            json: (data) => {
                return data;
            }
        };

        const result = {
            status: "Registration failed",
            message: "Provide all details required"
        };

        req.body = {};

        const x = await registerUser(req, res);
        expect(result).to.eql(x);
    });

    it.skip('When the user is already registered', async () => {
        
         const res = {
            json: (data) => {
                return data;
            }
        };

        const result = {
            status: "Registration failed",
            message: "User already registered"
        };

        const dbStub = sinon.stub(client, 'select').returns({
            
        });
        const x = await registerUser(req, res);
       
        expect(x).to.eql(result);
    });
});