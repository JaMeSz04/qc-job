import axios from 'axios';

module.exports = {
    getList : function(){
        return ['red','brown','custom1','custom2','custom3','custom4','custom5'];
    },
    getColor : function(color){
        console.log("invoked!");
        
    },
    trumpCard : function(color){
        var temp = [];
        var name = color;
        if (color == 'red'){
        
            var counter = 0;
            for (var i = 187 ; i < 255 ; i += 3){
               
                temp.push({ id : counter , value : "rgb(" + i + ",0,0)"});
                counter++;
            }
            
        } else if (color == 'brown'){
            
            var counter = 0;
            for (var i = 165; i > 128; i-= 2){
                temp.push({id : counter , value : "rgb(" + i + ",42,42)"});
                counter++;
            }
            temp.reverse();
          
        } else if (color == "custom1"){
            temp.push({id : 0 , value : "rgb(210,161,155)"});
            temp.push({id : 1 , value : "rgb(208, 158, 150)"});
            temp.push({id : 2 , value : "rgb(209, 161, 157)"});
            temp.push({id : 3 , value : "rgb(209, 153, 136)"});
            temp.push({id : 4 , value : "rgb(209, 158, 138)"});

            temp.push({id : 5 , value : "rgb(205, 154, 125)"});
            temp.push({id : 6 , value : "rgb(199, 157, 124)"});
            temp.push({id : 7 , value : "rgb(206, 161, 121)"});
            temp.push({id : 8 , value : "rgb(202, 157, 112)"});
            temp.push({id : 9 , value : "rgb(193, 157, 114)"});

            temp.push({id : 10 , value : "rgb(210, 174, 127)"});
            temp.push({id : 11 , value : "rgb(210, 179, 123)"});
            temp.push({id : 12 , value : "rgb(209, 179, 119)"});
            temp.push({id : 13 , value : "rgb(203, 175, 107)"});
            temp.push({id : 14 , value : "rgb(211, 180, 106)"});

            temp.push({id : 15 , value : "rgb(207, 183, 102)"});
            temp.push({id : 16 , value : "rgb(203, 184, 103)"});
            temp.push({id : 17 , value : "rgb(194, 180, 94)"});
            temp.push({id : 18 , value : "rgb(174, 164, 83)"});
            temp.push({id : 19 , value : "rgb(173, 168, 89)"});

            temp.push({id : 20 , value : "rgb(167, 166, 89)"});
            temp.push({id : 21 , value : "rgb(162, 166, 88)"});
         
        } else if (color == 'custom2'){
            temp.push({id : 0 , value : "rgb(179,174,92)"});
            temp.push({id : 1 , value : "rgb(170,173,93)"});
            temp.push({id : 2 , value : "rgb(164,171,104)"});
            temp.push({id : 3 , value : "rgb(166,171,112)"});
           
            temp.push({id : 4 , value : "rgb(174,194,132)"});
            temp.push({id : 5 , value : "rgb(171,194,139)"});
            temp.push({id : 6 , value : "rgb(169,195,143)"});
            temp.push({id : 7 , value : "rgb(168,193,149)"});
        
            temp.push({id : 8 , value : "rgb(180,211,164)"});
            temp.push({id : 9 , value : "rgb(176,206,174)"});
            temp.push({id : 10 , value : "rgb(170,205,178)"});
            temp.push({id : 11 , value : "rgb(171,209,176)"});
            
            temp.push({id : 12 , value : "rgb(152,189,160)"});
            temp.push({id : 13 , value : "rgb(152,190,167)"});
            temp.push({id : 14 , value : "rgb(147,190,162)"});
            temp.push({id : 15 , value : "rgb(140,186,168)"});

            temp.push({id : 16 , value : "rgb(158,203,189)"});
            temp.push({id : 17 , value : "rgb(160,206,194)"});
            temp.push({id : 18 , value : "rgb(158,201,199)"});
            temp.push({id : 19 , value : "rgb(152,199,197)"});

            temp.push({id : 20 , value : "rgb(134,183,181)"});
            temp.push({id : 21 , value : "rgb(137,183,183)"});
            temp.push({id : 22 , value : "rgb(127,182,183)"});     

            
        }
        else if (color == "custom3"){
            temp.push({id : 0 , value : "rgb(148,201,200)"});
            temp.push({id : 1 , value : "rgb(144,198,198)"});
            temp.push({id : 2 , value : "rgb(145,195,200)"});
            temp.push({id : 3 , value : "rgb(139,193,203)"});
            
            temp.push({id : 4 , value : "rgb(132,193,210)"});
            temp.push({id : 5 , value : "rgb(141,198,218)"});
            temp.push({id : 6 , value : "rgb(142,202,218)"});
            temp.push({id : 7 , value : "rgb(137,199,210)"});
            
            temp.push({id : 8 , value : "rgb(135,193,211)"});
            temp.push({id : 9 , value : "rgb(146,197,220)"});
            temp.push({id : 10 , value : "rgb(149,197,220)"});
            temp.push({id : 11 , value : "rgb(144,192,223)"});
            
            temp.push({id : 12 , value : "rgb(158,182,214)"});
            temp.push({id : 13 , value : "rgb(154,183,212)"});
            temp.push({id : 14 , value : "rgb(146,184,215)"});
            temp.push({id : 15 , value : "rgb(138,188,219)"});

            temp.push({id : 16 , value : "rgb(157,180,211)"});
            temp.push({id : 17 , value : "rgb(155,182,222)"});
            temp.push({id : 18 , value : "rgb(164,185,222)"});
            temp.push({id : 19 , value : "rgb(161,180,221)"});

            temp.push({id : 20 , value : "rgb(165,180,219)"});
            temp.push({id : 21 , value : "rgb(169,182,219)"});
            temp.push({id : 22 , value : "rgb(173,178,217)"});  

           
            
        } else if (color == "custom4"){

            temp.push({id : 0 , value : "rgb(165,167,206)"});
            temp.push({id : 1 , value : "rgb(166,165,202)"});
            temp.push({id : 2 , value : "rgb(167,165,200)"});
            temp.push({id : 3 , value : "rgb(170,164,200)"});

            temp.push({id : 4 , value : "rgb(168,161,196)"});
            temp.push({id : 5 , value : "rgb(179,169,201)"});
            temp.push({id : 6 , value : "rgb(180,164,195)"});
            temp.push({id : 7 , value : "rgb(175,157,187)"});
            
            temp.push({id : 8 , value : "rgb(179,159,188)"});
            temp.push({id : 9 , value : "rgb(187,162,190)"});
            temp.push({id : 10 , value : "rgb(189,161,191)"});
            temp.push({id : 11 , value : "rgb(189,157,182)"});

            temp.push({id : 12 , value : "rgb(195,167,194)"});
            temp.push({id : 13 , value : "rgb(205,167,193)"});
            temp.push({id : 14 , value : "rgb(208,168,192)"});
            temp.push({id : 15 , value : "rgb(202,162,183)"});
             
            temp.push({id : 16 , value : "rgb(200,149,165)"});
            temp.push({id : 17 , value : "rgb(203,151,165)"});
            temp.push({id : 18 , value : "rgb(199,145,153)"});
            temp.push({id : 19 , value : "rgb(206,156,163)"});
 
            temp.push({id : 20 , value : "rgb(211,160,168)"});
            temp.push({id : 21 , value : "rgb(208,156,158)"});
            temp.push({id : 22 , value : "rgb(209,161,159)"});  

       

        } else if (color == "custom5"){
            temp.push({id : 1 , value : "rgb(210,161,155)"});
            temp.push({id : 2 , value : "rgb(208, 158, 150)"});
            temp.push({id : 3 , value : "rgb(208, 158, 150)"});
            temp.push({id : 4 , value : "rgb(209, 153, 136)"});
            temp.push({id : 5 , value : "rgb(209, 158, 138)"});

            temp.push({id : 6 , value : "rgb(205, 154, 125)"});
            temp.push({id : 7 , value : "rgb(199, 157, 124)"});
            temp.push({id : 8 , value : "rgb(206, 161, 121)"});
            temp.push({id : 9 , value : "rgb(202, 157, 112)"});
            temp.push({id : 10 , value : "rgb(193, 157, 114)"});

            temp.push({id : 11 , value : "rgb(210, 174, 127)"});
            temp.push({id : 12 , value : "rgb(210, 179, 123)"});
            temp.push({id : 13 , value : "rgb(209, 179, 119)"});
            temp.push({id : 14 , value : "rgb(203, 175, 107)"});
            temp.push({id : 15 , value : "rgb(211, 180, 106)"});

            temp.push({id : 16 , value : "rgb(207, 183, 102)"});
            temp.push({id : 17 , value : "rgb(203, 184, 103)"});
            temp.push({id : 18 , value : "rgb(194, 180, 94)"});
            temp.push({id : 19 , value : "rgb(174, 164, 83)"});
            temp.push({id : 20 , value : "rgb(173, 168, 89)"});

            temp.push({id : 21 , value : "rgb(167, 166, 89)"});
            temp.push({id : 22 , value : "rgb(162, 166, 88)"});


            //custom 2

            temp.push({id : 23 , value : "rgb(179,174,92)"});
            temp.push({id : 24 , value : "rgb(170,173,93)"});
            temp.push({id : 25 , value : "rgb(164,171,104)"});
            temp.push({id : 26 , value : "rgb(166,171,112)"});
           
            temp.push({id : 27 , value : "rgb(174,194,132)"});
            temp.push({id : 28 , value : "rgb(171,194,139)"});
            temp.push({id : 29 , value : "rgb(169,195,143)"});
            temp.push({id : 30 , value : "rgb(168,193,149)"});
            
            temp.push({id : 31 , value : "rgb(180,211,164)"});
            temp.push({id : 32 , value : "rgb(176,206,174)"});
            temp.push({id : 33 , value : "rgb(170,205,178)"});
            temp.push({id : 34 , value : "rgb(171,209,176)"});
            
            temp.push({id : 35 , value : "rgb(152,189,160)"});
            temp.push({id : 36 , value : "rgb(152,190,167)"});
            temp.push({id : 37 , value : "rgb(147,190,162)"});
            temp.push({id : 38 , value : "rgb(140,186,168)"});

            temp.push({id : 39 , value : "rgb(158,203,189)"});
            temp.push({id : 40 , value : "rgb(160,206,194)"});
            temp.push({id : 41 , value : "rgb(158,201,199)"});
            temp.push({id : 42 , value : "rgb(152,199,197)"});

            temp.push({id : 43 , value : "rgb(134,183,181)"});
            temp.push({id : 44 , value : "rgb(137,183,183)"});
            temp.push({id : 45 , value : "rgb(127,182,183)"}); 

            //custom3

            temp.push({id : 46 , value : "rgb(148,201,200)"});
            temp.push({id : 47 , value : "rgb(144,198,198)"});
            temp.push({id : 48 , value : "rgb(145,195,200)"});
            temp.push({id : 49 , value : "rgb(139,193,203)"});
            
           
            temp.push({id : 50 , value : "rgb(132,193,210)"});
            temp.push({id : 51 , value : "rgb(141,198,218)"});
            temp.push({id : 52 , value : "rgb(142,202,218)"});
            temp.push({id : 53 , value : "rgb(137,199,210)"});
            
            
            temp.push({id : 54 , value : "rgb(135,193,211)"});
            temp.push({id : 55 , value : "rgb(146,197,220)"});
            temp.push({id : 56 , value : "rgb(149,197,220)"});
            temp.push({id : 57 , value : "rgb(144,192,223)"});
            
            
            temp.push({id : 58 , value : "rgb(158,182,214)"});
            temp.push({id : 59 , value : "rgb(154,183,212)"});
            temp.push({id : 60 , value : "rgb(146,184,215)"});
            temp.push({id : 61 , value : "rgb(138,188,219)"});


            temp.push({id : 62 , value : "rgb(157,180,211)"});
            temp.push({id : 63 , value : "rgb(155,182,222)"});
            temp.push({id : 64 , value : "rgb(164,185,222)"});
            temp.push({id : 65 , value : "rgb(161,180,221)"});

            temp.push({id : 66 , value : "rgb(165,180,219)"});
            temp.push({id : 67 , value : "rgb(169,182,219)"});
            temp.push({id : 68 , value : "rgb(173,178,217)"});  

            //custom4
            temp.push({id : 69 , value : "rgb(165,167,206)"});
            temp.push({id : 70 , value : "rgb(166,165,202)"});
            temp.push({id : 71 , value : "rgb(167,165,200)"});
            temp.push({id : 72 , value : "rgb(170,164,200)"});

            temp.push({id : 73 , value : "rgb(168,161,196)"});
            temp.push({id : 74 , value : "rgb(179,169,201)"});
            temp.push({id : 75 , value : "rgb(180,164,195)"});
            temp.push({id : 76 , value : "rgb(175,157,187)"});
            
            temp.push({id : 77 , value : "rgb(179,159,188)"});
            temp.push({id : 78 , value : "rgb(187,162,190)"});
            temp.push({id : 79 , value : "rgb(189,161,191)"});
            temp.push({id : 80 , value : "rgb(189,157,182)"});

            temp.push({id : 81 , value : "rgb(195,167,194)"});
            temp.push({id : 82 , value : "rgb(205,167,193)"});
            temp.push({id : 83 , value : "rgb(208,168,192)"});
            temp.push({id : 84 , value : "rgb(202,162,183)"});
             
            temp.push({id : 85 , value : "rgb(200,149,165)"});
            temp.push({id : 86 , value : "rgb(203,151,165)"});
            temp.push({id : 87 , value : "rgb(199,145,153)"});
            temp.push({id : 88 , value : "rgb(206,156,163)"});
 
            temp.push({id : 89 , value : "rgb(211,160,168)"});
            temp.push({id : 90 , value : "rgb(208,156,158)"});
            temp.push({id : 91 , value : "rgb(209,161,159)"});  

        }

        axios.post("/createColor", {name : name, colorList : temp}).catch( function(error){
                console.log("error create color : " + error);
        });
          
    }

}