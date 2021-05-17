Copy and paste this template into your .env file

- DB_NAME=
- DB_USERNAME=
- DB_PASSWORD=
- TWITTER_KEY=
- TWITTER_SECRET=
- FACEBOOK_APP_ID=
- FACEBOOK_SECRET=
- GOOGLE_ID=
- GOOGLE_SECRET=

# Route Names

GET /auth/gmail
GET /auth/facebook DONE
GET /todolist (placeholder)
GET /login DONE
GET /signup DONE
POST /login
POST /signup

TABLE

## passport_users

id
username
facebook_id
gmail_id
password
hash

## profile

id
first name
last name
email
number

# Steps

1. Install all needed packages
2. Create app.js
3. Import packages
4. Create queries
   // postUser(username, twitter_id, facebook_id, password)
   // getAllUsers()
   // twitterIdExists(twitterId)
   // facebookIdExists(facebookId)
   // getById(id)
   // getByTwitterId(twitterId)
   // getByFacebookId(facebookId)
   // deserialize(id, done)
   // serialize(user, done)

5. knex init
6. Create migration tables
   1. knex migrate:make passport_users
   2. If doesn't work, delete knex tables from your database (knex_migrations and knex_migrations_lock)
7. Test queries
8. Get facebook id and secret
9. Get twitter id and secret

## Questions

- How do I setup the username and password?

- Check the sign in and create route

// Whenever you use passport, you are essentially using two libraries
// the first is passport
// the second is the "strategy" that you are using

// local strategy verifies username and password
// http://www.passportjs.org/packages/passport-local/
