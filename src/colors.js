




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
        }
        
    }

}