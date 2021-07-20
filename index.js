const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1 ,name: 'course1'},
    {id: 2 ,name: 'course2'},
    {id: 3 ,name: 'course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello world!!!')
})

app.get('/api/courses',(req,res) => {
    res.send(courses)
 
})

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)res.status(404).send('The course with given id was not found ');
    res.send(course);
});

app.post('/api/courses',(req,res) => {
    // const schema = {
    //     name : Joi.string().min(3).required()
    // }
    // const result = Joi.validate(req.body, schema)

    // if(result.error ){
    // //400 bad request
    //     res.status(400).send(result.error.details[0].message)
    //     return
    // }  
    // INSTEAD OF ABOVE US THIS : SHORT METHOD

    const {error} =validateCourse(req.body) //result.error
    if(error ){
        res.status(400).send(error.details[0].message)
        return
    } 
    const course = {
        id : courses.length +1,
        name:req.body.name
    }

    courses.push(course)
    res.send(course) 
})

    //    Put is used for update
app.put('/api/courses:id',(req,res)=>{   
    //lookup the course 
    // If not existing,return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
    res.status(404).send('The course with given id was not found ');

    // validate 
    // If invalid , return 400 -Bad Request
    const {error} =validateCourse(req.body) //result.error
    if(error ){
        res.status(400).send(error.details[0].message)
        return
    }
    //update course 
    course.name = req.body.name
    // Return the updated course
    res.send(course) 
})


app.delete('/api/courses/:id',(req,res) => {
    // lookup the course 
    // If not existing , return  404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
    res.status(404).send('The course with given id was not found ');

    // delete
    const index = courses.indexOf(course)
    courses.splice(index,1)

    // Return the same course
    res.send(course)

})

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

// PORT
const port = process.env.PORT || 3000
app.listen(3000,()=>console.log(`Listening to port ${port}...`))
