let express=require('express');
let app=express();
const bodyParser=require('body-parser')
const mysql=require('mysql');
const sserver=express();
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//establish tah databse connection

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"customerwebapp"
    });


/* app.get('/',(req,resp)=>{
    resp.send(`<h1>Hello world0`);
});

app.use(express.static('frontend')); */

app.listen('4500',()=>{
    console.log('node server is running');
})

db.connect(function(error){
    if(error){
    console.log("error connecting to DB");
    }else {
    console.log("successfull connected to DB");
    }
    });



    app.get("/api/personaldetails", (req, res) => {
        var sql = "SELECT * FROM personaldetails";
        db.query(sql, function (error, result) {
          if (error) {
            console.log("Error Connecting to DB");
          } else {
            res.send({ status: true, data: result });
          }
        });
      });

//poste data
      app.post("/api/personaldetails/add", (req, res) => {
        var details = {
          username: req.body.username,
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          gender:req.body.gender,
          dob:req.body.dob,
         };
        var sql = "INSERT INTO personaldetails SET ?";
        db.query(sql, details, (error) => {
          if (error) {
            res.send({ status: false, message: "personaldetails created Failed" });
          } else {
            res.send({ status: true, message: "personaldetails created successfully" });
          }
        });
      });


  app.put("/api/personaldetails/update/:username", (req, res) => {
    const sql = "UPDATE personaldetails SET username=?, first_name=?, last_name=?, gender=?, dob=? WHERE username=?";
  
    const { username, first_name, last_name, gender, dob } = req.body;
  
    db.query(sql, [username, first_name, last_name, gender, dob, req.params.username], (error, results) => {
      if (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send({ status: false, message: "An error occurred while updating personal details" });
      } else if (results.affectedRows === 0) {
        res.status(404).send({ status: false, message: "No personal details found for the specified username" });
      } else {
        res.send({ status: true, message: "Personal details updated successfully" });
      }
    });
  });
  
 
  
  
  
  
  
  
   //Delete the Records
/*  
   app.delete("/api/personaldetails/delete/:username", (req, res) => {
    let sql = "DELETE FROM student WHERE username=" + req.params.username + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });
 */

  app.delete("/api/personaldetails/delete/:username", (req, res) => {
    const sql = "DELETE FROM personaldetails WHERE username=?";
  
    db.query(sql, req.params.username, (error, results) => {
      if (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send({ status: false, message: "An error occurred while deleting personal details" });
      } else if (results.affectedRows === 0) {
        res.status(404).send({ status: false, message: "No personal details found for the specified username" });
      } else {
        res.send({ status: true, message: "Personal details deleted successfully" });
      }
    });
  });
  