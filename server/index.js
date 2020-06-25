require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const multer = require('multer');
const app = express();
app.use(express.json());
app.use(staticMiddleware);
app.use(sessionMiddleware);
// USER CAN LOGIN
app.post('/api/login/', (req, res, next) => {
  const { userName } = req.body;
  const value = [`${userName}`];
  const findUserDB = `
  select *
  from "user"
  where "userName" = $1;`;
  db.query(findUserDB, value)
    .then(result => {
      const userObject = result && result.rows && result.rows[0];
      if (!userObject) {
        const sql2 = `
        insert into "user" ("userName")
                    values ($1)
                    returning *`;
        const value2 = [`${userName}`];
        db.query(sql2, value2).then(data => {
          req.session.userInfo = data.rows[0];
          return res.json(req.session);
        });
      } else {
        req.session.userInfo = userObject;
        return res.json(req.session);
      }
    })
    .catch(err => {
      return res.send({ message: err });
    });
});
// USER CAN SEARCH POST BY LOCATION (ZIPCODE)
app.get('/api/post/:location', (req, res, next) => {
  const { location } = req.params;
  const sql = `
    SELECT *
      FROM "post"
     WHERE "sellerId" IN
      (SELECT "userId"
         FROM "user"
        WHERE "location" = ANY($1))
  `;
  const params = [location.split(',')];
  db.query(sql, params)
    .then(result => {
      const posts = result.rows;
      if (!posts.length) {
        res.status(400).json({
          error: `Cannot find posts in area ${location}`
        });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN EDIT PROFILE
app.put('/api/user/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const { email, profileImg, coverImg, description, location } = req.body;
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      error: 'UserId must be a positive integer'
    });
  }
  if (!email) {
    return res.status(400).json({
      error: 'Email is a required field'
    });
  }
  if (!location) {
    return res.status(400).json({
      error: 'Location is a required field'
    });
  }
  const sql = `
  UPDATE     "user"
  SET        "email" = $1,
             "profileImg" = $2,
             "coverImg" = $3,
             "description" = $4,
             "location" = $5
  WHERE      "userId" = $6
  RETURNING  *
  `;
  const params = [email, profileImg, coverImg, description, location, userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});
// TO UPLOAD AN IMAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/user-posts');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
// TO UPLOAD AN IMAGE
app.post('/api/post/image', (req, res) => {
  const upload = multer({
    limits: {
      fileSize: 1000000
    },
    storage: storage,
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload a jpg., .jpeg, or .png file'));
      }
      cb(undefined, true);
    }
  }).single('image');
  upload(req, res, function (err) {
    console.error(err);
    res.end('File is successfully uploaded');
  });
});
// USER CAN CREATE A POST
app.post('/api/post/', (req, res, next) => {
  const {
    sellerId,
    description,
    imageUrl,
    title,
    startingBid,
    biddingEnabled,
    isDeleted,
    expiredAt,
    notes,
    category
  } = req.body;
  const sql = `
    INSERT INTO "post" ("sellerId", "description", "imageUrl", "title", "startingBid", "biddingEnabled", "isDeleted", "expiredAt","notes","category")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING "postId"
  `;
  const params = [
    sellerId,
    description,
    imageUrl,
    title,
    startingBid,
    biddingEnabled,
    isDeleted,
    expiredAt,
    notes,
    category
  ];
  db.query(sql, params)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        res.status(400).json({
          error: 'Failed to create post'
        });
      } else {
        res.json(post);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW ALL POSTS
app.get('/api/posts/:category/:offset', (req, res, next) => {
  const category = req.params.category;
  const offset = req.params.offset;
  const sql = `
    select "postId",
           "imageUrl",
           "createdAt"
    from  "post"
    where "category" = $1
    order by "createdAt" desc
    limit 10 offset $2
  `;
  const params = [category, offset];
  db.query(sql, params)
    .then(result => {
      const posts = result.rows;
      if (posts.length === 0) {
        return res.status(404).json({
          error: `There are no more posts with the category ${category}`
        });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN EDIT A POST
app.patch('/api/post/', (req, res, next) => {
  const {
    postId,
    description,
    imageUrl,
    title,
    startingBid,
    biddingEnabled,
    isDeleted,
    expiredAt,
    category
  } = req.body;
  const sql = `
      UPDATE "post"
         SET "description" = $1,
             "imageUrl" = $2,
             "title" = $3,
             "startingBid" = $4,
             "biddingEnabled" = $5,
             "isDeleted" = $6,
             "expiredAt" = $7,
             "category" = $8
      WHERE "postId" = $9
      RETURNING *
  `;
  const params = [
    description,
    imageUrl,
    title,
    startingBid,
    biddingEnabled,
    isDeleted,
    expiredAt,
    category,
    postId
  ];
  db.query(sql, params)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        res.status(400).json({
          error: 'Failed to update post'
        });
      } else {
        res.status(202).json(post);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN SEND A PRIVATE MESSAGE
app.post('/api/message/', (req, res, next) => {
  const {
    senderId,
    recipientId,
    postId,
    message
  } = req.body;
  const sql = `
    INSERT INTO "message" ("senderId", "recipientId", "postId", "message", "createdAt")
         VALUES ($1, $2, $3, $4, now())
      RETURNING "messageId"
  `;
  const params = [
    senderId,
    recipientId,
    postId,
    message
  ];
  db.query(sql, params)
    .then(result => {
      const message = result.rows[0];
      if (!message) {
        res.status(400).json({
          error: `Failed to send a message ${message}`
        });
      } else {
        res.status(202).json(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW THE LISTS OF RECEIVED PRIVATE MESSAGES
app.post('/api/message/list/', (req, res, next) => {
  const { recipientId } = req.body;
  if (!recipientId) {
    res.status(400).json({
      error: 'userId is required'
    });
  }
  const sql = `
      SELECT "me"."senderName", "me","senderId", "me"."postId", "me"."message", "me"."createdAt" FROM (
      SELECT DISTINCT ON ("m"."postId", "m"."senderId") "u"."userName" AS "senderName", "m"."senderId", "m"."postId", "m"."message", "m"."createdAt"
      FROM "message" AS "m"
      JOIN "user" AS "u"
      ON "u"."userId" = "m"."senderId"
      WHERE "m"."recipientId" = $1
      ORDER BY "m"."postId", "m"."senderId", "m"."createdAt" DESC) AS "me"
      ORDER BY "me"."createdAt" DESC
  `;
  const params = [recipientId];
  db.query(sql, params)
    .then(result => {
      const message = result.rows;
      if (!result.rows[0]) {
        res.status(400).json({
          error: 'You don\'t have a received message'
        });
      } else {
        res.status(200).json(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW THE MESSAGES FROM A USER
app.post('/api/message/detail/', (req, res, next) => {
  const { recipientId, senderId, postId } = req.body;
  if (!recipientId) {
    res.status(400).json({
      error: 'userId is required'
    });
  }
  if (!senderId) {
    res.status(400).json({
      error: 'senderId is required'
    });
  }
  if (!postId) {
    res.status(400).json({
      error: 'postId is required'
    });
  }
  const sql = `
      SELECT "u"."userName" AS "senderName", "m"."postId", "m"."message", "m"."createdAt"
        FROM "message" AS "m"
        JOIN "user" AS "u"
          ON "u"."userId" = "m"."senderId"
       WHERE "m"."recipientId" = $1
         AND "m"."senderId" = $2
         AND "m"."postId" = $3
    ORDER BY "m"."createdAt" DESC
  `;
  const params = [recipientId, senderId, postId];
  db.query(sql, params)
    .then(result => {
      const message = result.rows;
      if (!result.rows[0]) {
        res.status(400).json({
          error: `You don't have a received message from user ${senderId}`
        });
      } else {
        res.status(200).json(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW A SPECIFIC POST - the post details + username
app.get('/api/viewpost/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 0) {
    return res.status(400).json({ error: 'postId must be a positive integer' });
  }
  const sql = `
    select "post".*,
           "user"."userName"
    from "post" join "user" on "post"."sellerId" = "user"."userId"
    where "post"."postId" = $1
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        return res.status(404).json({
          error: `Cannot find post with "postId" ${postId}`
        });
      } else {
        return res.status(200).json(post);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW A SPECIFIC POST - the watchlist counts
app.get('/api/watchlistcounts/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 0) {
    return res.status(400).json({ error: 'postId must be a positive integer' });
  }
  const sql = `
    select count(*) as "totalWatchlisters"
    from "watchlists"
    where "postId" = $1
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const watchlistCounts = result.rows[0];
      res.json(watchlistCounts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW A SPECIFIC POST - bid info
app.get('/api/bidinfo/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 0) {
    return res.status(400).json({ error: 'postId must be a positive integer' });
  }
  const sql = `
    select count(*) as "totalBids",
    max ("currentBid") as "highestBid"
    from "bid"
    where "postId" = $1
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      const bidInfo = result.rows;
      res.json(bidInfo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
// USER CAN VIEW POSTS ON PROFILE
app.get('/api/posts', (req, res, next) => {
  const userId = [req.session.userInfo.userId];
  const findUserPosts = `
  SELECT  "postId", "imageUrl"
  FROM    "post"
  WHERE   "sellerId" = $1
  `;
  db.query(findUserPosts, userId)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});
// HEALTH CHECK
app.get('/api/health-check', (req, res, next) => {
  db.query("select 'successfully connected' as \"message\"")
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('[http] Server listening on port', process.env.PORT);
});
