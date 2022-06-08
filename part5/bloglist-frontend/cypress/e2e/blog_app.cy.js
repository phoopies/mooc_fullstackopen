const user = {
    name: 'tester',
    username: 'u_tester',
    password: 'password'
};

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function() {
        cy.contains('Open login').click();

        cy.contains('username');
        cy.contains('password');
    });

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click();
            cy.get('#username').type(user.username);
            cy.get('#password').type(user.password);

            cy.get('#login-btn').click();

            cy.contains(`${user.name} logged in`);
        });

        function loginWithForm(username, pw) {
            cy.contains('login').click();
            cy.get('#username').type(username);
            cy.get('#password').type(pw);
            cy.get('#login-btn').click();
        }

        it('fails with wrong credentials', function() {
            loginWithForm(user.username, 'wrong');
            cy.contains('Wrong credentials');
        });

        it('Correct notification appears when fails', function() {
            loginWithForm(user.username, 'wrong');

            cy.get('.notification')
                .should('contain', 'Wrong credentials!')
                .and('have.css', 'border', '3px solid rgb(255, 0, 0)');
        });
    });

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login(user);
        });

        it('A blog can be created', function() {
            cy.get('#new-blog-btn').click();

            cy.get('#title').type('A new blog');
            cy.get('#author').type('Dude');
            cy.get('#url').type('www.somesite.com');

            cy.get('#create-blog-btn').click();

            cy.get('#blogs')
                .should('contain', 'A new blog | Dude')
                .and('contain', 'view');
        });
    });
});