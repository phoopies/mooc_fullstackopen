// eslint-disable-next-line no-undef
db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database',
        },
    ],
});
