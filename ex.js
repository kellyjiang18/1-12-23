const express = require('express');
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello there');
});

const courses = [
    {id:1, name:'Web Development'},
    {id:2, name:'IT'},
    {id:3, name:'Cybersecurity'},
];

// http GET requests route
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

//request courses by id
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
    res.send(course);
});
app.listen(3000,()=>{
    console.log('Listening on part 3000 ...')
});

//http POST requests
app.post('/api/courses',(req,res)=>{
    if(req.body.name.length>=3)
    {
        const course ={
            id: courses.length+1,
            name:req.body.name
        }
        courses.push(course);
        res.send(course);
    }
    res.status(404).send("The course name needs to be 3 or more characters long");
});

//http PUT requests
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
    c={
        id:req.params.id,
        name:req.body.name
    }
    courses[req.params.id]=c;
    res.send(courses[req.params.id]);
});

//https DELETE requests
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
    courses.splice(courses.indexOf(course),1);
    res.status(200).send("Course successfully deleted");
})

//Different programs can make changes in the backend with all these different
//requests. The GET request return the available information, the POST requests 
//add information, the PUT requests update, and the DELETE requests delete existing info.
