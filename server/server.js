const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const db = require("./db")

const app = express();

//cors helps to connect our backend to our frontend
//since there are different domains
app.use(cors())
app.use(express.json()) 


app.get("/api/v1/restaurants" , async (req, res) =>{
  
   try {
    const results = await db.query("Select * from restaurant");
    res.status(200).json({
        status: "success",
        count: results.rows.length,
        data: {
         restaurants: results.rows 
        }
       
    })
   } catch (error) {
    res.status(200).json({
        status: "failed",   
    })
   }
})

app.get("/api/v1/restaurants/:id" , async (req, res) =>{
    try {
        const restaurant = await db.query("Select * from restaurant where id = $1", [req.params.id]);
        const reviews = await db.query("Select * from reviews where restaurant_id = $1", [req.params.id]);
        const count = restaurant.rows.length

        if (count === 0){
            res.json({
                message: "no restaurant with the ID found"
            })
        }
        else {
        res.status(200).json({
            status: "success",
            count,
            data: {
             restaurants: restaurant.rows[0],
             reviews: reviews.rows
            }  
        })
    }
       } catch (error) {
        res.status(200).json({
            status: "failed",   
        })
       }
})
app.post("/api/v1/restaurants" , async (req, res) => {

    try {
        const name = req.body.name
        const location = req.body.location
        const price_range = req.body.price_range 
        const results = await db.query("INSERT INTO restaurant (name, location, price_range) values ($1, $2, $3) returning *",
         [name, location, price_range])

        res.status(200).json({
            status: "success",
           message: "New restaurant added",
           data: {
               AddedRestaurant: results.rows[0]
           }

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
           message: "Failed to add new restaurant"
        })
    }
  
})

//add reviews
app.post("/api/v1/reviews" , async (req, res) => {

    try {
        const name = req.body.name
        const rating = req.body.rating
        const review = req.body.review 
        const id = req.body.restaurant_id
        const results = await db.query("INSERT INTO reviews (name, rating, review, restaurant_id) values ($1, $2, $3, $4) returning *",
         [name, rating, review, id])

        res.status(200).json({
            status: "success",
           message: "New review added",
           data: {
               AddedReview: results.rows[0]
           }

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
           message: "Failed to add new review"
        })
    }
  
})

app.put("/api/v1/restaurants/:id", async (req, res) => {
    
    try {
        const name = req.body.name
        const location = req.body.location
        const price_range = req.body.price_range  
        const id = req.params.id
        const results = await db.query("UPDATE restaurant SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
         [name, location, price_range, id])

        res.status(200).json({
            status: "success",
           message: "restaurant updated",
           data: {
               UpdatedRestaurant: results.rows[0]
           }

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
           message: "Failed to add new restaurant"
        })
    }
})

app.delete("/api/v1/restaurants/:id" , async (req, res) => {

    try {
        const results = await db.query("Delete from restaurant where id = $1 returning *", 
        [req.params.id])

        res.status(200).json({
            status: "success",
            message: "restaurant with the ID deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            message: "restaurant not deleted"
        })
    }
})

//get average star rating
app.get("/api/v1/rating/:id", async ()=>{
    try {
        const id = req.body.restaurant_id
       const average = await db.query("Select avg(rating) from reviews where restaurant_id = $1;", [id])
       const count = await db.query("Select count(rating) from reviews where restaurant_id = $1;", [id])

       res.status(200).json({
           status: "success",
           data: {
            average,
            count
           }
           
       })
    } catch (error) {
        
    }
})


const port = process.env.PORT
app.listen(3001, () => {
    console.log(`listening on port 3001...`)
})
