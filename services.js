const express = require('express')
const mongodb = require('mongodb');
const app = express();
app.use(express.json());

//MONGODB CONN AND FETCHING COLLECTIONS FROM DB
app.get('/api/FoodHubdb',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		dbo.listCollections().toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
	
});

//READ DATA FROM COLLECTION
app.get('/api/FoodHubdb/collection',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		dbo.collection('dessert').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

//GET DATA FROM COLLECTION WITH PARAMETER
app.get('/api/FoodHubdb/collection/:Name',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		dbo.collection('dessert').find({"Name":(req.params.Name)}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});


//INSERT DOCUMENT IN COLLECTION
app.post('/api/FoodHubdb/collection/insertItem',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		var doc = { '_id':'DM14',
        'Name':'Rowdy Kalakar Kalakand',
        'Price':5.99,
        'Desc':'Made with milk and kalakand with cinnamon and added flavour'};
		dbo.collection('dessert').insertOne(doc,function(err, result) 
		{
			if (err) throw err;
			res.send("NEW ITEM INSERTED");
			db.close();
		});
	});
});

//UPDATE ITEM IN COLLECTION
app.put('/api/FoodHubdb/collection/updateData',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		var query = {Name: 'Rowdy Kalakar Kalakand' };
		var newquery = { $set: {Name:'Rowdy Masala street Pavv' } };
		dbo.collection('dessert').updateOne(query,newquery,function(err, result) 
		{
			if (err) throw err;
			res.send('MENU ITEM UPDATED');
			db.close();
		});
	});
	
});
   
//DELETE DOCUMENT IN COLLECTION
app.delete('/api/FoodHubdb/collection/deleteItem',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubdb");
		var query = { Name: 'Rowdy Kalakar Kalakand' };
		dbo.collection('dessert').deleteOne(query,function(err, result) 
		{
			if (err) throw err;
			res.send('ITEM DELETED');
			db.close();
		});
	});
	
});
 

  
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening on port ${port}..'));





