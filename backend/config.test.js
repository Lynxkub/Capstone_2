"use strict";



describe('config can come from env' , function() {
    test('works' , function() {
        process.env.SECRET_KEY = 'abc';
        process.env.PORT = '5000';
        process.env.DATABASE_URL = 'other';
        process.env.NODE_ENV = 'other';

        const config = require('./config');
        expect(config.SECRET_KEY).toEqual('abc');
        expect(config.PORT).toEqual(5000);
        expect(config.getDatabaseUri()).toEqual('other');
        

        delete process.env.SECRET_KEY;
        delete process.env.PORT;
        delete process.env.DATABASE_URL;


        // test if env can connect to foodly db and test db
        expect(config.getDatabaseUri()).toEqual('foodly');
        process.env.NODE_ENV = 'test';
        expect(config.getDatabaseUri()).toEqual('foodly_test');
    })
})