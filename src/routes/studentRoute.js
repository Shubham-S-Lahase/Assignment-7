
const router = require("express").Router();

const studentArray = require("../InitialData");

let new_id = studentArray[studentArray.length-1].id;

const errorId = {
    status:"error",
    message: "id does not exist"
}

router.route("/")
.get((req,res)=>{{ //get
    try{
        res.json(studentArray);
    }
    catch(err){
        res.sendStatus(500);
    }
}})
.post((req,res)=>{ // post
    try{

        const receivedData = req.body;
        // console.log(receivedData);

    if(receivedData.name && receivedData.currentClass && receivedData.division){
        new_id++;
        studentArray.push({
            id:new_id,
            name:receivedData.name,
            currentClass: parseInt(receivedData.currentClass),
            division: receivedData.division

        });
        // console.log(studentArray);    
        res.json({
            status : "Success",
            message:"Added Successfully"

        })    
    }else{
        res.status(400).json({
            status: "error",
            message : "Invalid input"
        });
    }
    }
    catch(err){
        res.sendStatus(500);
    }
    
})


router.route("/:id")
.get((req,res)=>{
    const id = parseInt(req.params.id);
    // console.log(id);
    try{

        for(let i = 0; i < studentArray.length; i++){
            // console.log(studentArray[i]);
            if(studentArray[i].id === id){
                return res.json(studentArray[i]) ;
            }
        }
        
        return res.status(400).json(errorId);
    }
    catch(err){
        // console.log(err);
        res.sendStatus(500);
    }
})

//put

.put((req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const receviedData = req.body;
        for(let i = 0; i < studentArray.length; i++){
            // console.log(studentArray[i]);
            if(studentArray[i].id === id){
                studentArray[i]={
                     ...studentArray[i],
                    name : (receviedData.name || studentArray[i].name),
                    currentClass : (parseInt(receviedData.currentClass) || studentArray[i].currentClass),
                    division: (receviedData.division || studentArray[i].division)
                }
                return res.json(studentArray[i]) ;
            }
        }
        return res.status(400).json(errorId);

    }
    catch(err){
        res.sendStatus(500);
    }
})
//Delete

.delete((req,res)=>{

    try{

        const id = parseInt(req.params.id);
        for(let i = 0; i < studentArray.length; i++){
            if(id === studentArray[i].id){
                let deleted = studentArray.splice(i,1);
                // console.log(studentArray);
                return res.send({
                    status : "Success",
                    data: deleted[0],
                    
                });

            }
        }
        return res.status(400).json(errorId);
        
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
   


})

module.exports = router;