const router = require("express").Router();
const Student = require("../models/student");
const task = require("../models/task");
const Task = require("../models/task");

// student
router.post("/student", async (req, res) => {
    const student = new Student(req.body)
    try {
        await student.save()
        res.send(student);

    } catch (err) {
        res.send(err)
    }
})

// all student data
router.get("/allStudent", async (req, res) => {
    const student = await Student.find({})
    try {
        res.send(student)
    } catch (err) {
        res.send(err)
    }
})

// student data by id
router.get("/allStudent/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id)
        res.send(student)
    } catch (err) {
        res.send(err)
    }
})

// update
router.patch("/update/:id", async(req, res) => {

    const updates  = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid updates"})
    }
    // .................
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (err) {
        res.send(err);
    }
})

router.delete("/delete/:id", async(req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        if(!student){
            return res.status(404).send()
        }
        res.send(student)
    }catch(err){
        res.send(err)
    }
})

// task
router.post("/task", (req, res) => {
    const task = new Task(req.body)
    task.save().then(data => {
        res.send(data)
    })
        .catch(err => {
            res.send(err)
        })
})

// get all task
router.get("/allTask", (req, res) => {
    Task.find({}).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.send(err)
        })
})

// get task by id
router.get("/allTask/:id", (req, res) => {
    const id = req.params.id;
    Task.findById(id).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.send(err)
        })
})

router.delete("/task/:id", async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(err){
        res.send(err)
    }
})



module.exports = router;