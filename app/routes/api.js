//DB UserSchema
var User = require('../models/user');
var Product = require('../models/product');
var mongoose = require('mongoose');

module.exports = function(router){

  router.post('/connectToDB', function(req,res){
    var username  = req.body.username;
    var password  = req.body.password;

    //Mit Datenbank verbinden
    //mongoose.connect('mongodb://localhost:27017/prodman', { useNewUrlParser: true });
    var url = 'mongodb://'+ username + ':' + password + '@ds131601.mlab.com:31601/prodman';

    mongoose.connect(url, { useNewUrlParser: true });
    //Prüfe Verbindung
    var db = mongoose.connection;
    db.on('error',function(){
      console.log('Error while connecting to database');
      res.send('error');
    });
    db.once('open', function() {
      console.log('Connected to database');
      res.send('connected');
    });
  });

  // Create Users
  router.post('/users', function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
    //Prüfe ob die alle Daten übergeben worden sind
    if (user.username == null || user.username == '' ||
        user.password == null || user.password == '' ||
        user.email == null    || user.email == '') {
    }else{
        user.save(function(err){
          if(err){
            res.send(err);
          }else{
            res.send('user created');
          }
        });
    }
  });
  //Create Products
  router.post('/product', function(req,res){
    var product = new Product();
    product.productname = req.body.productname;
    product.eancode = req.body.eancode;
    product.manufacturer = req.body.manufacturer;
    product.quantity = req.body.quantity;
    product.purchaseprice = req.body.purchaseprice;
    product.sellingprice = req.body.sellingprice;
    product.save(function(err){
      if(err){
        res.send(err);
      }else{
        res.send('Product created');
      }
    });
  });

  router.post('/updateProduct', function(req,res){

    var id = req.body.id;

    var data = {
      "productname"   : req.body.productname,
      "eancode"       : req.body.eancode,
      "manufacturer"  : req.body.manufacturer,
      "quantity"      : req.body.quantity,
      "purchaseprice" : req.body.purchaseprice,
      "sellingprice"  : req.body.sellingprice
    };
    //Methode Update wird über das Model Aufgerufen
    Product.update({_id: id }, data ,function(err,result){
        if (err) {
          res.send(err);
        }else{
          res.send(result);
      }
    });

  });

  router.post('/getproducts', function(req,res){
    var filter = req.body;
    //Methode Find wird über das Model Aufgerufen
    Product.find(filter, function(err, products){
      if (err) {
        res.send(err);
      }else{
        res.send(products);
      }
    })
  });
  return router;
}
