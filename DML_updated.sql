--Dogs Admin Page
--read operation for Dogs
SELECT dogID, dog_name, birthday, Breeds.breed_name AS breed
      FROM Dogs 
            INNER JOIN Breeds
            ON Dogs.breedID = Breeds.breedID;
SELECT * FROM Dogs WHERE Dogs.breedID IS NULL;

--prepopulate breed drop-down
SELECT breedID, breed_name FROM Breeds;

--prepopulate dogID drop-down
SELECT dogID FROM Dogs ORDER BY dogID ASC;

--create a new dog
INSERT INTO Dogs (dog_name, birthday, breedID) 
        VALUES (:dog_nameInput, :birthdayInput, :breedID_from_dropdownInput);

--delete a dog
DELETE FROM Dogs WHERE dogID = :dogID_selected_from_dropdownInput;

-- update a dog's data based on submission of the Update Dog Form 
UPDATE Dogs 
   SET dog_name = :dog_nameInput, birthday= :birthdayInput, 
       breedID = :breedID_from_dropdownInput
   WHERE dogID = :dogID_from_update_dog_form;


--Humans Admin Page
--read operation for Humans
SELECT humanID, human_name, phone, email FROM Humans;

--prepopulate humanID drop down
SELECT humanID FROM Humans ORDER BY humanID ASC;

--create a new human
INSERT INTO Humans (human_name, phone, email) 
   VALUES (:human_nameInput, :phoneInput, :emailInput);

--delete a human
DELETE FROM Humans WHERE id = :humanID_selected;

-- update a human's data based on submission of the Update Human Form 
UPDATE Humans 
   SET human_name = :human_nameInput, phone= :phoneInput, 
       email = :emailInput
   WHERE humanID = :humanID_from_update_human_form;


--Breeds Admin Page
--read operation for Breeds
SELECT breedID, breed_name FROM Breeds; 

--prepopulate breedID drop down
SELECT breedID FROM Breeds;

--create a new breed
INSERT INTO Breeds (breed_name) 
   VALUES (:breed_nameInput);

--delete a breed
DELETE FROM Breeds WHERE breedID = :breedID_selected;


--Relation Types Admin Page
--read operation for Relation Types
SELECT relation_typeID, relationship FROM RelationTypes;

--prepopulate relation_typeID drop down
SELECT relation_typeID FROM RelationTypes;

--create a new relation type
INSERT INTO RelationTypes (relationship) 
   VALUES (:relationshipInput);

--delete a relation type
DELETE FROM RelationTypes WHERE relation_typeID = :relation_typeID_selected;


--Dog-Human Relations Admin Page
--read operation for Dog-Human Relations
SELECT relationID, RelationTypes.relationship AS relation_type, Dogs.dog_name AS dog, Humans.human_name AS human
    FROM DogHumanRelations 
        INNER JOIN RelationTypes
        ON DogHumanRelations.relation_typeID = RelationTypes.relation_typeID
        INNER JOIN Dogs
        ON DogHumanRelations.dogID = Dogs.dogID
        INNER JOIN Humans
        ON DogHumanRelations.humanID = Humans.humanID;
    ORDER BY relationID ASC;

--prepopulate relation type drop down
SELECT relation_typeID, relationship FROM RelationTypes;
--prepopulate dog drop down
SELECT dogID, dog_name FROM Dogs;
--prepopulate human drop down
SELECT humanID, human_name FROM Humans;
--prepopulate relationID drop down 
SELECT relationID FROM DogHumanRelations;

-- update a dog-human relation data based on submission of the Update DogHumanRelations Form 
UPDATE DogHumanRelations
   SET relation_typeID = :relation_typeID_from_dropwdownInput, dogID = :dogID_from_dropdownInput, 
       humanID = :humanID_from_dropdownInput
   WHERE relationID = :relationID_from_update_dog_human_relations_form;

--create a new dog-human relation
INSERT INTO DogHumanRelations (relation_typeID, dogID, humanID) 
   VALUES (:relation_typeID_from_dropdownInput, :dogID_from_dropdownInput, :humanID_from_dropdownInput);

--delete a dog-human relation
DELETE FROM DogHumanRelations WHERE relationID = :relationID_selected;


--Visits Admin Page
--read operation for Visits
SELECT visitID, entry_time, exit_time, relationID FROM Visits;

--prepopulate visitID drop down
SELECT visitID FROM Visits;

--create a new visit
INSERT INTO Visits (entry_time, exit_time, relationID) 
   VALUES (:entry_timeInput, :exit_timeInput, :relationID);

--delete a visit
DELETE FROM Visits WHERE visitID = :visitID_selected;



