// app.js

/*
    SETUP
*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars

app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.var app = express();
app.use(express.static(__dirname + '/public'));
PORT = 9131;
app.use(bodyParser.urlencoded({ extended: true }));

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
    {    
        res.render('index')                                               
    });                                                        


app.get('/dogs', function(req, res)
    {  
        let query1 = `SELECT dogID, dog_name, birthday, Breeds.breed_name AS breed
        FROM Dogs 
             INNER JOIN Breeds
             ON Dogs.breedID = Breeds.breedID;`;
        let query2 = `SELECT dogID, dog_name FROM Dogs;`;
        let query3 = `SELECT breedID, breed_name FROM Breeds;`;
        let query4 = `SELECT dogID FROM Dogs ORDER BY dogID ASC;`;
        let query5 = `SELECT * FROM Dogs WHERE Dogs.breedID IS NULL;`;                   
        db.pool.query(query1, function(error, rows, fields) {
            let table_info = rows;
            db.pool.query(query2, (error, rows, fields) => {                
                let dog_names = rows;
                db.pool.query(query3, (error, rows, fields) => {
                    let breeds = rows;
                    db.pool.query(query4, (error, rows, fields) => {
                        let dogIDs = rows;
                        db.pool.query(query5, (error, rows, fields) => {
                            let null_table_info = rows;
                            return res.render('dogs', {table_info, dog_names, breeds, dogIDs, null_table_info});
                        })
                    })
                }) 
            })
        })                         
    });  
    
app.get('/humans', function(req, res)
{  
    let query1 = `SELECT humanID, human_name, phone, email FROM Humans;`;
    let query2 = `SELECT humanID, human_name FROM Humans;`;
    let query3 = `SELECT humanID FROM Humans ORDER BY humanID ASC;`;                    
    db.pool.query(query1, function(error, rows, fields) {
        let table_info = rows;
        db.pool.query(query2, (error, rows, fields) => {                
            let human_names = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let humanIDs = rows;
                    return res.render('humans', {table_info, human_names, humanIDs});
            }) 
        })
    })                         
});   

app.get('/breeds', function(req, res)
    {  
        let query1 = `SELECT breedID, breed_name FROM Breeds;` ; 
        let query2 = `SELECT breedID FROM Breeds;`;                    
        db.pool.query(query1, function(error, rows, fields) {
            let table_info = rows; 
            db.pool.query(query2, (error, rows, fields) => {                
                let breedIDs = rows;  
                return res.render('breeds', {table_info, breedIDs});
            })                 
        })                                                     
    });   

app.get('/relation_types', function(req, res)
    {  
        let query1 = `SELECT relation_typeID, relationship FROM RelationTypes;` ; 
        let query2 = `SELECT relation_typeID FROM RelationTypes;`;                    
        db.pool.query(query1, function(error, rows, fields) {
            let table_info = rows; 
            db.pool.query(query2, (error, rows, fields) => {                
                let relation_typeIDs = rows;  
                return res.render('relation_types', {table_info, relation_typeIDs});
            })                 
        })                                                     
    });  

app.get('/dog_human_relations', function(req, res)
    {  

        let query1 = `SELECT relationID, RelationTypes.relationship AS relation_type, Dogs.dog_name AS dog, Humans.human_name AS human
        FROM DogHumanRelations 
            INNER JOIN RelationTypes
            ON DogHumanRelations.relation_typeID = RelationTypes.relation_typeID
            INNER JOIN Dogs
            ON DogHumanRelations.dogID = Dogs.dogID
            INNER JOIN Humans
            ON DogHumanRelations.humanID = Humans.humanID
        ORDER BY relationID ASC;`;
        let query2 = `SELECT relation_typeID, relationship FROM RelationTypes;`;
        let query3 = `SELECT dogID, dog_name FROM Dogs;`
        let query4 = `SELECT humanID, human_name FROM Humans;`
        let query5 = `SELECT relationID FROM DogHumanRelations;`
        db.pool.query(query1, function(error, rows, fields) {
            let table_info = rows;
            db.pool.query(query2, (error, rows, fields) => {                
                let relation_types = rows;
                db.pool.query(query3, (error, rows, fields) => {
                    let dog_names = rows;
                    db.pool.query(query4, (error, rows, fields) => {
                        let human_names = rows;
                        db.pool.query(query5, (error, rows, fields) => {
                            let relationIDs = rows
                            return res.render('dog_human_relations', {table_info, relation_types, dog_names, human_names, relationIDs});
                        })
                    })
                })
            })
        })                         
    });  

app.get('/visits', function(req, res)
    {  
        let query1 = `SELECT relationID, RelationTypes.relationship AS relation_type, Dogs.dog_name AS dog, Humans.human_name AS human
        FROM DogHumanRelations 
            INNER JOIN RelationTypes
            ON DogHumanRelations.relation_typeID = RelationTypes.relation_typeID
            INNER JOIN Dogs
            ON DogHumanRelations.dogID = Dogs.dogID
            INNER JOIN Humans
            ON DogHumanRelations.humanID = Humans.humanID
        ORDER BY relationID ASC;`;
        let query2 = `SELECT visitID, entry_time, exit_time, relationID FROM Visits;`;
        let query3 = `SELECT relationID FROM DogHumanRelations;`;
        let query4 = `SELECT visitID FROM Visits;`;
        db.pool.query(query1, function(error, rows, fields) {
            let ref_table_info = rows;
            db.pool.query(query2, (error, rows, fields) => {                
                let table_info = rows;
                db.pool.query(query3, (error, rows, fields) => {
                    let relationIDs = rows;
                    db.pool.query(query4, (error, rows, fields) => {
                        let visitIDs = rows;
                        return res.render('visits', {ref_table_info, table_info, relationIDs, visitIDs});
                    })
                })
            })
        })
    });
  

app.post('/breeds', function(req, res){
        query1 = `INSERT INTO Breeds (breed_name) 
        VALUES ('${req.body.breed_name}');
     `;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/breeds');
            }
        })
    })

app.post('/breeds_delete', function(req, res)
    {  
        const id = req.body.breedID
        let query1 = `DELETE FROM Breeds WHERE breedID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/breeds');
            }
        })                                                     
    });  

app.post('/relation_types', function(req, res){
        query1 = `INSERT INTO RelationTypes (relationship) 
        VALUES ('${req.body.relationship}');
     `;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/relation_types');
            }
        })
    })

app.post('/relation_types_delete', function(req, res)
    {  
        const id = req.body.relation_typeID
        let query1 = `DELETE FROM RelationTypes WHERE relation_typeID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/relation_types');
            }
        })                                                     
    });  

app.post('/humans', function(req, res){
        query1 = `INSERT INTO Humans (human_name, phone, email) 
        VALUES ('${req.body.human_name}', '${req.body.phone}', '${req.body.email}');
     `;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/humans');
            }
        })
    })

app.post('/humans_update', function(req, res)
    {  
        const { humanID, human_name, phone, email } = req.body
        const query1 = `UPDATE Humans
                            SET human_name = '${human_name}', phone = '${phone}', email = '${email}'
                            WHERE humanID = ${humanID};`
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/humans');
            }
        })                                                     
    });  

app.post('/humans_delete', function(req, res)
    {  
        const id = req.body.humanID
        let query1 = `DELETE FROM Humans WHERE humanID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/humans');
            }
        })                                                     
    });  

app.post('/dogs', function(req, res){
        let id = req.body.breedID
        if (id === ''){
            id = 'NULL';
        }
        query1 = `INSERT INTO Dogs (dog_name, birthday, breedID) 
        VALUES ('${req.body.dog_name}', '${req.body.birthday}', ${id});
     `;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/dogs');
            }
        })
    })

app.post('/dogs_update', function(req, res)
    {  
        let id = req.body.breedID
        if (id === ''){
            id = 'NULL';
        }
        const query1 = `UPDATE Dogs
                            SET dog_name = '${req.body.dog_name}', birthday = '${req.body.birthday}', breedID = ${id}
                            WHERE dogID = ${req.body.dogID};`
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/dogs');
            }
        })                                                     
    });  

app.post('/dogs_delete', function(req, res)
    {  
        const id = req.body.dogID
        let query1 = `DELETE FROM Dogs WHERE dogID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/dogs');
            }
        })                                                     
    });  

app.post('/dog_human_relations', function(req, res){   
        query1 = `INSERT INTO DogHumanRelations (relation_typeID, dogID, humanID) 
        VALUES (${req.body.relation_typeID}, ${req.body.dogID},  ${req.body.humanID});
     `;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/dog_human_relations');
            }
        })
    })

app.post('/dog_human_relations_update', function(req, res)
    {  
        const { relationID, relation_typeID, dogID, humanID } = req.body
        const query1 = `UPDATE DogHumanRelations
                            SET relation_typeID = ${relation_typeID}, dogID = ${dogID}, humanID = ${humanID}
                            WHERE relationID = ${relationID};`
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/dog_human_relations');
            }
        })                                                     
    });  

app.post('/dog_human_relations_delete', function(req, res)
    {  
        const id = req.body.relationID
        let query1 = `DELETE FROM DogHumanRelations WHERE relationID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/dog_human_relations');
            }
        })                                                     
    });  

app.post('/visits', function(req, res){
        query1 = `INSERT INTO Visits (entry_time, exit_time, relationID) 
        VALUES ('${req.body.entry_time}', '${req.body.exit_time}', ${req.body.relationID});`;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/visits');
            }
        })
    })

app.post('/visits_delete', function(req, res)
    {  
        const id = req.body.visitID
        let query1 = `DELETE FROM Visits WHERE visitID = ${id}`;                     
        db.pool.query(query1, function(error, rows, fields){   
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }              
            else {
                res.redirect('/visits');
            }
        })                                                     
    });  


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + 9131 + '; press Ctrl-C to terminate.')
});
