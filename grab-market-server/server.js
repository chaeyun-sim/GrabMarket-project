const express = require("express");
const cors = require("cors");
const models = require('./models')
const { sequelize } = require("./models");
const { DataTypes } = require("sequelize");
const multer = require('multer');
const Product = require('./models/product')(sequelize, DataTypes);
const app = express();
const port = 8080;

console.log(Product)
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

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Main Page')
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
      ],
    }).then((result) => {
        console.log(result)
        res.send({
            products: result
        })
    }).catch((err)=>{
        console.error(err)
    })
});

app.post("/products", (req, res) => {
    const body = req.body;
    const { name, description, price, seller } = body;
    if (!name || !description || !price || !seller) {
      res.send("모든 필드를 입력해주세요");
    }
    Product.create({
      name,
      description,
      price,
      seller,
    })
      .then((result) => {
        console.log("상품 생성 결과 : ", result);
        res.send({
          result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.send("상품 업로드에 문제가 발생했습니다");
      });
  });

app.get('/products/:id', (req, res) => {
    Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    }).catch((error) => {
      console.error(error);
      res.send("상품 조회에 에러가 발생했습니다");
    });
});

app.post('/image', upload.single('image'), (req, res) => {
  const file = req.file;
  console.log(file)
  res.send({
    imageUrl : file.path,
  })
});  // single 이미지파일 하나 보냈을 때 (key 필수)

app.listen(port, () => {
   console.log("Server Connected to http://localhost:"+port);
   models.sequelize.sync().then(() => {
    console.log('DB Connected')
   }).catch((err) => {
    console.error(err);
    console.log('DB Disconnected');
    process.exit();
   })
});