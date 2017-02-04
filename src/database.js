var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('qc-db.db');


module.exports = {

 addPattern : function (name,cellList){
        var query = "INSERT INTO pattern_list(pattern_name) VALUES ('" + name + "')" ;
        db.run(query, function (error){
            if (error){
                console.log(error);
                console.log("insert error");
                return null;
            }
        });

        query = "CREATE TABLE '" + name +  "' ( 'order'	INTEGER PRIMARY KEY AUTOINCREMENT, 'xPos'	INTEGER, 'yPos'	INTEGER); ";
        db.run(query, function(error){
            if (error){
                console.log(error);
                console.log("create error");
                return null;
            }
        });

      
        for (var i = 0 ; i < cellList.length ; i++ ){
            query = "INSERT INTO '" + name + "' (xPos,yPos) VALUES ('" + cellList[i].xPos + "', '" + cellList[i].yPos + "');";
            db.run(query, function(error){
              
                if (error){
                    console.log(error);
                    console.log("INSERT ERROR");
                }
            });
        }
    },

    

};




