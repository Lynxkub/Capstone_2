
const { sqlForPartialUpdate } = require('./sql');

describe('sqlForPartialUpdate' , function () {
    test('works' , function () {
        const result = sqlForPartialUpdate(
            {f1 : 'v1'},
            {f1 : 'f1' , ff2 : 'f2'}
        );
        expect(result).toEqual({
            setCols: "\"f1\" = $1" ,
            values : ["v1"]
        })
    })
})