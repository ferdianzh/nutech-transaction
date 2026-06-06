## Public Host

Can be accessed via link below
[Link Text](https://nutech-transaction-1476.up.railway.app)


## Local Host

Follow these step to host on your local computer

- copy .env.copy to .env (set the env value if necessary)
- create MySQL database named "nutech_transaction"
- install package and build with these commands:

```bash
$ npm install
$ npm run build
```
- run db migrations and seeds:
```bash
$ npm run migrate
$ npm run seed:all
```
- run the app with one of these commands:
```bash
# production mode
$ npm run start

# development mode
$ npm run dev
```
