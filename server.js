var nodemailer=require('nodemailer')
var http=require('http')
const request = require('request');
var {vocabularyWords}=require('./vocabulary')
var word="";
var meaning="";

function meaningGet()
{
    



     
    var i=Math.floor(Math.random()*vocabularyWords.length);
    word=vocabularyWords[i];
    console.log(word);

request.get({
url: `https://api.dictionaryapi.dev/api/v2/entries/en/${vocabularyWords[i]}`,
headers: {
  'X-Api-Key': 'YOUR_API_KEY'
},
}, function(error, response, body) {
if(error) return console.error('Request failed:', error);
else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
else{ 
  
    
  const mean=JSON.parse(body);
  console.log(mean);
  meaning=mean[0]["meanings"][0]["definitions"][0]["definition"]
  console.log(meaning);

    const audio=mean[0]["phonetics"][0]["audio"];
const mailTranfer=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"amlendu786.562@gmail.com",
        pass:"dtqn nwht uvhd lvub"
    }
    })
    
    const mailoption={
        from:'amlendu786.562@gmail.com',
        to:'amlendu786@gmail.com',
        subject:word,
        text:meaning,
        attachments: [
            {
                filename: 'mailtrap.mp3',
                path: audio,
                cid: 'uniq-mailtrap.mp3'
            }
        ]
    }
    

mailTranfer.sendMail(mailoption,(error,info)=>{
        try{
            
            console.log(info);
        }
    
        catch(error){
            console.log(error);
        }
    })
}
});


}





    const server=http.createServer((req,res)=>{

   
        meaningGet();
        res.end("Mail Sended");
    
    
    });





server.listen(5000,()=>{console.log("server is listening at 5000")});