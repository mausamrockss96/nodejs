//mongo ===> ths command will connect to mongo server and give you interface to work with mongo database
//proceed only if arrow head is availabe
//show dbs ===> show all the available databases
//use <db_name> ===> if (db_name exists it will select existing db or create new one);
//db ===> show selected db
// show collections ===> shows the collection of selectd db

//to insert or create new collections 
//==>> db.<coll_name>.insert({valid_json});
// it will give us id_property having ObjectID
//recommended not to modify or _id property 

//db.<coll_name>.find({query builder})  //empty query bata kaam gardai gara
//db.<coll_name>.find().pretty() ===> pretty the content
//db.<coll_name>.count()  ====> returns the no of documents


//#####################BACKUP AND RESTORE ###################
//mongorestore mongodump mongoimport mongoexport
//back and restore can be done in two formats

// bson format(binary json) and human readable format
//backup
//command
// mongodump ===> it will backup all the database into the default dump folder
//mongodump --db <db_name> ===> it will backup selected database in default dump folder
//mongodump --db <db_name> --out <output_directory_path>

//restore
//mongorestore ===> It will search for default dump folder and then tries to backup all the database existing in dump folder
//mongorestore path to backedup folder ===> restore from other than dump folder


//HUMAN READABLE FORMAT
//backup
//mongoexport

//mongoexport --db <db_name> --collection <coll_name> --out <output directory with .json extension)
//mongoexport --db <db_name> --c <coll_name> --o <output directory with .json extension) //can be written in short form too


//restore command
//mongoimport
//mongoimport --db <db_name> --collection <coll_name> path to json file



//CSV FORMAT(COMMA SEPARATED VALUE)
//backup
//mongoexport --db <db_name> --collection <coll_name> --type=csv query = "{username:'Mausam'}" --fileds 'comma separated name to be exported'
//--out <output_directory with .csv extension....

//import from csv
//mongoimport --db <db_name> --collection <coll_name> ==type=csv location of csv file --headerline

 
//NOTE:
//export and mongoimport always comes in pair...
//mongodump and mongorestore always comes in pair...


 
