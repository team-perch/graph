/*eslint-disable */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const faker = require('faker');
const start = Date.now()
let count = 1;
MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
    if(err){
        throw(err);
    }
    assert.equal(null, err);
    const db = client.db('related')
    const collection = db.collection('houses')
    function photos(){
        var photoarr = [];
        for(var i = 0; i < 5; i++){
            photoarr.push(`https://sdc-images-airbnb.s3-us-west-1.amazonaws.com/img_${faker.random.number({min: 1, max: 919})}.jpeg`)
        }
        return photoarr
    }
    function array (){
        let arr=[];
        for(var i = (count - 1) * 2000000 + 1; i < count * 2000000 + 1; i += 1){
            arr.push({
                _id: i,
                Address: faker.address.streetAddress(),
                Region: faker.address.zipCode(),
                Photos: photos()
            })
        }
        console.log('ARRAY completed')
        count ++;
        return arr;
    }
    let arr = array()
    collection.insertMany(arr, function(){
        console.log('INSERT TIME:', Date.now()-start, "ms")
        arr = [];
        arr = array();
        collection.insertMany(arr, function(){
            console.log('INSERT TIME:', Date.now()-start, "ms")
            arr = [];
            arr = array();
            collection.insertMany(arr, function(){
                console.log('INSERT TIME:', Date.now()-start, "ms")
                arr = [];
                arr = array();
                collection.insertMany(arr, function(){
                    console.log('INSERT TIME:', Date.now()-start, "ms")
                    arr = [];
                    arr = array();
                    collection.insertMany(arr, function(err){
                        if(err){
                            throw(err)
                        }
                        console.log('INSERT TIME:', Date.now()-start, "ms")
                        arr = [];
                        client.close((error)=>{
                            if(error){
                                throw(error)
                            } else {
                                console.log('CONNECTION CLOSED')
                            }
                        })
                    })
                })
            })
        })
    })
  })

// ====================================================================================

const mongo = require('mongodb').MongoClient;
const faker = require('faker');

const url = 'mongodb://127.0.0.1:27017';
const startTime = new Date();

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected');
    const db = client.db('reviewmodule');
    const hosts = db.collection('hosts');
    const reviews = db.collection('reviews');
    let count = 0;
    const reSeed = function(start, end, hostStart, hostEnd, revStart, revEnd) {
        count++
        let hostArray = [];
        for (let i = hostStart; i <= hostEnd; i += 1) {
            var newHostStart = i;
            var revIndexes = [];
            for (let h = start; h < end; h++) {
                revIndexes.push(h);
            }
            let _id = i;
            let hostName = faker.name.firstName();
            let hostImage = faker.image.avatar();
            let hostData = { _id, hostName, hostImage, revIndexes };
            hostArray.push(hostData);
            start += 10;
            end += 10;
        }
        console.log('done seeding hosts');

        let reviewsArray = [];
        for (let x = revStart; x <= revEnd; x += 1) {
            var newRevStart = x;
            _id = x;
            let userId = Math.ceil(Math.random() * 1000000);
            let hostRes = Math.random() >= 0.5;
            let longRev = Math.random() <= 0.25;
            let date = faker.date.recent(100);
            let now = new Date();
            let hostResDate = faker.date.between(date, now);
            let obj = {
                _id,
                userId,
                date,
                body: longRev ? `${faker.lorem.paragraph()} ${faker.lorem.paragraph()}` : faker.lorem.paragraph(),
                rating: Math.floor(Math.random() * 3 + 3),
                cleanliness: Math.floor(Math.random() * 3 + 3),
                communication: Math.floor(Math.random() * 3 + 3),
                checkin: Math.floor(Math.random() * 3 + 3),
                accuracy: Math.floor(Math.random() * 3 + 3),
                location: Math.floor(Math.random() * 3 + 3),
                value: Math.floor(Math.random() * 3 + 3),
                quiRes: Math.random() >= 0.3,
                outHos: Math.random() >= 0.3,
                amaAme: Math.random() >= 0.3,
                stySpa: Math.random() >= 0.3,
                spaCle: Math.random() >= 0.3,
                hostRes: hostRes ? faker.lorem.paragraph() : null,
                hostResDate: hostRes ? hostResDate : null,
                name: faker.name.firstName(),
                image: faker.image.avatar(),
            };
            reviewsArray.push(obj);
        }
        console.log('reviews done seeding');

        hosts.insertMany(hostArray, (err, result) => {
            if (err) console.log(err);
            console.log(new Date() - startTime);
            reviews.insertMany(reviewsArray, (err, result) => {
                if (err) console.log(err);
                console.log(new Date() - startTime);
                if (count === 1) {
                    client.close();
                    return;
                } else {
                    console.log('reSeed: ', count)
                    reSeed(start, end, newHostStart + 1, newHostStart + 100000, newRevStart + 1, newRevStart + 1000000);
                }
            })
        })
        console.log('done');
    }

    reSeed(1, 11, 1, 100000, 1, 1000000);
})