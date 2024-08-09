const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}



app.get('/user/:id', logMiddleware, (req, res) => {
  // :idをreq.params.idとして受け取る
  res.status(200).send(req.params.id);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

async function main() {
  // サーバーのlisten前に接続する
  await client.connect();
  const db = client.db('my-app');

  app.listen(3000, () => {
    // app.get('/', logMiddleware, async(req, res) => {
    //   const users = await db.collection('user').find().toArray();
    //   const names = users.map((user) => { return user.name });

    //   res.render(path.resolve(__dirname, 'views/index.ejs'), { users: users });
    // })
    app.get('/', logMiddleware, async (req, res) => {
      try {
        const users = await db.collection('user').find().toArray();
        const names = users.map((user) => { return user.name });
        res.render(
          path.join(__dirname, 'views', 'index.ejs'),
          { users: names }
        
        );

        app.post('/api/user', express.json(), async (req, res) => {
          const name = req.body.name;
          if (!name) {
            res.status(400).send('Bad Request');
            return;
          }


          await db.collection('user').insertOne({ name: name });
          res.status(200).send('Created');

        });

        app.post('/api/user-delete', express.json(), async (req, res) => {
          const name = req.body.name;
          console.log(name)
          if (!name) {
            res.status(400).send('Bad Request');
            return;
          }

          await db.collection('user').deleteOne({ name: name });
          console.log("%")
          res.status(200).send('delete');
        });


        app.post('/api/user-change', express.json(), async (req, res) => {
          const name1 = req.body.names[0];
          console.log(name1)
          const name2 = req.body.names[1];
          console.log(name2)
          if (!name1) {
            res.status(400).send('Bad Request');
            return;
          }
          if (!name2) {
            res.status(400).send('Bad Request');
            return;
          }
          await db.collection('user').updateOne({ name: name1 },{
            $set: {
              name: name2
            },
          });
          console.log("&")
          res.status(200).send('change');

        });




      } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    });
    console.log('start listening');
  });
}

main()