const mongoose=require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities=require('./cities');
const Campground= require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(()=>{
    console.log("Connection Established")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.random(Math.random()*20)+10;
       const camp= new Campground({
            author:'64d89598ca06c94ee7b6e827',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://picsum.photos/800',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius praesentium maiores recusandae temporibus iste facilis, molestiae laboriosam sed? Iusto enim facilis temporibus possimus reiciendis officiis molestiae harum labore ullam saepe?',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})