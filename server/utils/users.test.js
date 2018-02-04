const expect = require('expect');
const {Users} = require('./users');
var users;
describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.users = [
            {id: "1", name: 'lyes', room: 'node'},
            {id: "2", name: 'adel', room: 'node'},
            {id: "3", name: 'rachid', room: 'react'}
        ];
    });
    it('should add new user', () => {
        var users = new Users();
        var user = {id: 123, name: 'lyes', room: 'football'}
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    
    it('should remove a user', () => {
        var user = users.removeUser('1');
        expect(user.id).toEqual('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var user = users.removeUser('99');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', function () {
        var user = users.getUser('1');
        expect(user.name).toBe('lyes');
    });

    it('should not find user', function () {
        var user = users.getUser('4');
        expect(user).toNotExist();
    });

    it('should return name for node', ()=> {
        var userList = users.getUsersList('node');
        expect(userList).toEqual(['lyes','adel']);
    });

    it('should return name for react', ()=> {
        var userList = users.getUsersList('react');
        expect(userList).toEqual(['rachid']);
    });
})