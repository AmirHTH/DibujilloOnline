/* INICIO BLOQUE gALERIA */ 

function on(imgen) {

    document.getElementById("picplace").src=imgen.src;
    document.getElementById("picasa").style.display = "block";


}

function off() {

    document.getElementById("picasa").style.display = "none";

}
/* FIN BLOQUE GaLERIA */ 

/* INI bloque js videos */

function verVideo(divisor){

    var videoID = divisor.id;
    var platformURL0='https://www.googleapis.com/youtube/v3/videos?id='+videoID+'&key=AIzaSyBptOWEMwPcLKhqJQTVPARQUIXmdUR4MkY&part=snippet&callback=?';
    var platformURL1='https://vimeo.com/api/oembed.json?url=https://vimeo.com/'+videoID;
    var platformURL2='https://api.dailymotion.com/video/'+videoID;
    var platformURL_COL=[];
    platformURL_COL.push(platformURL0);
    platformURL_COL.push(platformURL1);
    platformURL_COL.push(platformURL2);

  

    for(var i=0; i<platformURL_COL.length; i++) { 
        console.log("div id= "+ i);
        var platform = platformURL_COL[i];
        console.log("plataforma="+ platform);

        if (platform.includes('googleapis')) {
            console.log("google (youtube)");
            $.getJSON(platform,
            function(data){
                if (typeof(data.items[0]) != "undefined") {
                    console.log('video exists ' + data.items[0].snippet.title);
                    
                    $('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
                    .appendTo("#" + videoID);
                
                } else {
                    console.log('video not exists in '+ platform );
                    
                }   
            });
        } else  if (platform.includes('dailymotion')) {
            console.log("dailymotion");
            $.getJSON(platform,        
            function(data){
                if (typeof(data != "undefined")) {

                        $('<iframe frameborder="0" width="480" height="270" src="https://www.dailymotion.com/embed/video/'+videoID+'" allowfullscreen allow="autoplay"></iframe>')
                        .appendTo("#" + videoID);
                  
                   } else {
                     console.log('video not exists in '+platform);
                }   
            });

        }  else  {
            console.log("vimeo");
            $.getJSON(platform,            
            function(data){
                if (typeof(data != "undefined")) {
                   
                        $('<iframe src="https://player.vimeo.com/video/'+videoID+'" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                        .appendTo("#" + videoID);
                     
                   } else {
                     console.log('video not exists in '+platform);
                }   
            });

        }
    }
}

/* fin bloque js videos */