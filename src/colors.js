




module.exports = {
    getColor : function(color){
        if (color == 'red'){
            var temp = [];
            var counter = 0;
            for (var i = 187 ; i < 255 ; i += 3){
               
                temp.push({ id : counter , value : "rgb(" + i + ",0,0)"});
                counter++;
            }
            return temp;
        } else if (color == 'brown'){
            var temp = [];
            var counter = 0;
            for (var i = 165; i > 128; i-= 2){
                temp.push({id : counter , value : "rgb(" + i + ",42,42)"});
                counter++;
            }
            console.dir(temp);
            return temp;
        }
        
    }

}