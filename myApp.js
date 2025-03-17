require("dotenv").config();
const mongoose = require("mongoose");
// import 'dotenv/config'
// import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [String],
});

// let Person;
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const me = new Person({
    name: "Alejandro",
    age: 46,
    favoriteFoods: ["paella", "cacaus", "cerveza"]
  });
  me.save()
    .then(data => {
      done(null, data);
    })
    .catch(err => {
      console.error(err);
      done(err);
    });
};

/** 4) Create many People with `Model.create()` */
const  arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, people) => {
    if (err) console.log(err);
    
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, personFound) => {
    if(err) console.log (err)
    console.log(pensonFound, ' finded')
  done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) console.log(err);
    console.log(personFound)
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) console.log(err);
  console.log(personFound);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if(err) console.log(err);
    const foodToAdd = "hamburguer";
    personFound.favoriteFoods.push(foodToAdd)
    personFound.save((err, updatedPerson) => {
      if (err) console.log(err);
      console.log(updatedPerson);
      done(null, updatedPerson);
    });

})


};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, personFound, ) => {
    if(err)console.log(err);
    done(null,personFound);
  })

};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
