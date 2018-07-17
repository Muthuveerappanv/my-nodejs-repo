const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {

    var db = {
        saveUser: expect.createSpy()
    };

    var db1 = {
        saveDummy: expect.createSpy()
    };

    app.__set__('db', db);
    app.__set__('db1', db1);

    it('should call saveUser with user object', () => {
        var email = 'muthu8891@gmail.com';
        var password = '123abc';
        app.handleLogin(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    })

    it('should spy dummy method', () => {
        var dum = 'Me';
        var my = 'me';
        app.handleDummy(dum, my);
        expect(db1.saveDummy).toHaveBeenCalledWith({ dum, my });
    })
})

// how spies work
   // it('Should test how spies work', () => {
    //     var spy = expect.createSpy();
    //     spy();
    //     expect(spy).toHaveBeenCalled();
    // })