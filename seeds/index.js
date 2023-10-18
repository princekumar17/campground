require('dotenv').config();
const mongoose=require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities=require('./cities');
const Campground= require('../models/campground');
console.log(process.env.DB_URL)
mongoose.connect(`${process.env.DB_URL}`).then(()=>{
    console.log("Connection Established")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.random(Math.random()*20)+10;
       const camp= new Campground({
            author:'651d0fc92ce5484b46ae96dc',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius praesentium maiores recusandae temporibus iste facilis, molestiae laboriosam sed? Iusto enim facilis temporibus possimus reiciendis officiis molestiae harum labore ullam saepe?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqxzkxfl3/image/upload/v1692109896/YelpCamp/x7cks8xhkoj3fzffogvz.png',
                    filename: 'YelpCamp/x7cks8xhkoj3fzffogvz',
                },
                {
                    url: 'https://res.cloudinary.com/dqxzkxfl3/image/upload/v1692109897/YelpCamp/dduxjm4dftxll7axhvdo.png',
                    filename: 'YelpCamp/dduxjm4dftxll7axhvdo',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})