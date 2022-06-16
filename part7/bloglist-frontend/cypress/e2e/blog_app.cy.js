const user = {
    name: 'tester',
    username: 'u_tester',
    password: 'password',
};

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('Open login').click();

        cy.contains('username');
        cy.contains('password');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
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

        it('fails with wrong credentials', function () {
            loginWithForm(user.username, 'wrong');
            cy.contains('Wrong credentials');
        });

        it('Correct notification appears when fails', function () {
            loginWithForm(user.username, 'wrong');

            cy.get('.notification')
                .should('contain', 'Wrong credentials!')
                .and('have.css', 'border', '3px solid rgb(255, 0, 0)');
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login(user);
        });

        it('A blog can be created', function () {
            cy.get('#new-blog-btn').click();

            cy.get('#title').type('A new blog');
            cy.get('#author').type('Dude');
            cy.get('#url').type('www.somesite.com');

            cy.get('#create-blog-btn').click();

            cy.get('#blogs')
                .should('contain', 'A new blog | Dude')
                .and('contain', 'view');
        });

        describe('And some blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Some title',
                    author: 'Author',
                    url: 'Url',
                });
                cy.createBlog({
                    title: 'A better blog',
                    author: 'Kalle',
                    url: 'fullstackopen.com',
                });
            });

            it('A blog can be liked', function () {
                cy.contains('A better blog')
                    .parent()
                    .contains('view')
                    .click()
                    .parent()
                    .get('.like-btn')
                    .click()
                    .click();

                cy.contains('likes 2');

                cy.contains('Some title').parent().contains('view').click();

                cy.contains('likes 0');
            });

            it('Just liked blog can be deleted', function () {
                cy.contains('Some title')
                    .parent()
                    .within(function () {
                        cy.contains('view').click();
                        cy.get('.like-btn').click().click();
                        cy.contains('remove').click();
                    });

                cy.get('html').should('not.contain', 'Some title');
            });

            it('Owned blog can be deleted', function () {
                cy.contains('A better blog')
                    .parent()
                    .contains('view')
                    .click()
                    .parent()
                    .contains('remove')
                    .click();

                cy.get('html').should('not.contain', 'A better blog');
            });

            it('Not owned blog cannot be deleted', function () {
                const tempUser = {
                    name: 'temp',
                    username: 'temp',
                    password: 'secret',
                };
                cy.request(
                    'POST',
                    'http://localhost:3001/api/users/',
                    tempUser
                );
                cy.login(tempUser);

                cy.contains('A better blog')
                    .parent()
                    .contains('view')
                    .click()
                    .parent()
                    .should('not.contain', 'remove');
            });

            it('Blogs are ordered by likes', function () {
                cy.contains('A better blog')
                    .parent()
                    .contains('view')
                    .click()
                    .parent()
                    .get('.like-btn')
                    .click();

                cy.get('.blog').eq(0).should('contain', 'A better blog');

                cy.contains('Some title')
                    .parent()
                    .within(function () {
                        cy.contains('view').click();
                        cy.get('.like-btn').click().click();
                    });

                cy.get('.blog').eq(0).should('contain', 'Some title');
                cy.get('.blog').eq(1).should('contain', 'A better blog');
            });
        });
    });
});
