const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    updateDb();
  })
  .catch(error => {
    console.log('Error connecting to the database', error);
  });

  const updateDb = async ()=> {
    try{
      const createdRecipe = await Recipe.create({
        title: "Peanut Butter Jelly Sandwich",
        level: "Amateur Chef",
        ingredients: ["peanut butter", "strawberry jelly", "white bread"],
        cuisine: "American",
        dishType: "snack",
        image: "https://i.insider.com/605e438d8f71c3001853a9a0?width=700",
        duration: 5,
        creator: " Julia Davis Chandler",
      })
      console.log(createdRecipe.title);
      
      await Recipe.insertMany(data);
  
      await data.forEach(recipe => {
        console.log(recipe.title);
      });
  
      await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, console.log("Sucess!"))
    
      await Recipe.deleteOne({title: "Carrot Cake"}, console.log("Delete Sucess!"))
    } finally {
      mongoose.connection.close();
    }
  }