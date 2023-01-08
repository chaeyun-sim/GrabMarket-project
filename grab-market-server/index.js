const express = require("express");
const cors = require("cors");
const models = require('./models')
const { sequelize } = require("./models");
const { DataTypes } = require("sequelize");
const multer = require('multer');
const Product = require('./models/product')(sequelize, DataTypes);
const Banner = require('./models/banner')(sequelize, DataTypes)
const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});


const detectProduct = require('./helpers/detectProduct')
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('Main Page')
});

app.get('/banners', (req, res) => {
  Banner.findAll({
    limit: 2
  }).then((result) => {
    res.send({
      banners : result,
    })
  }).catch((err) => {
    console.error(err);
    res.status(500).send('에러가 발생했습니다.')
  })
})

app.get("/products", (req, res) => {
    // const query = req.query;
    Product.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      attribute: [
        'id',
        'name',
        'price',
        'createdAt',
        'seller',
        "imageUrl",
        "soldout",
      ],
    }).then((result) => {
        res.send({
            products: result
        })
    }).catch((err)=>{
        console.error(err)
    })
});

app.post("/products", (req, res) => {
    const body = req.body;
    const { name, description, price, seller, imageUrl } = body;
    if (!name || !description || !price || !seller || !imageUrl) {
      res.status(400).send("모든 필드를 입력해주세요");
    }
    detectProduct(imageUrl, (type) => {
      Product.create({
        name,
        description,
        price,
        seller,
        imageUrl,
        type,
      })
        .then((result) => {
          res.send({
            result,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send("상품 업로드에 문제가 발생했습니다");
        });
    })
  });

app.get('/products/:id', (req, res) => {
    Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.send({
        product: result,
      });
    }).catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다");
    });
});

app.post('/image', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send({
    imageUrl : req.file.path,
  })
});  // single 이미지파일 하나 보냈을 때 (key 필수)

app.post("/purchase/:id", (req, res) => {
  const { id } = req.params;
  Product.update(
    {
      soldout: 1,
    },
    {
      where: {
        id,
      },
    }).then((result) => {
      res.send({
        result: true,
      });
    }).catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.get("/products/:id/recommendation", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  }).then((product) => {
    console.log(product);
    Product.findAll({
      where: {
        type : product.type,
        id: {
          [models.Sequelize.Op.ne] : req.params.id   //이와 일치하지 않ㅡ
        }
      }
    }).then((products) => {
      res.send({products});
    }).catch((err) => {
        res.status(500).send("에러가 발생했습니다.");
    })
  })
});


app.listen(process.env.PORT || 8080, () => {
   console.log("Server Connected to http://localhost:"+app.settings.env);
   models.sequelize.sync().then(() => {
    console.log('DB Connected')
   }).catch((err) => {
    console.error(err);
    console.log('DB Disconnected');
    process.exit();
   })
});