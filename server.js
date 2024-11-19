var nodemailer=require('nodemailer')
var http=require('http')
const request = require('request');

var word="";
var meaning="";

function meaningGet()
{
    

var vocabularyWords = [
    "Abstract",    // Existing in thought but not in physical form
    "Ambiguous",   // Open to more than one interpretation
    "Analyze",     // Examine methodically for explanation
    "Anomaly",     // Something different from the norm
    "Arbitrary",   // Based on random choice or personal whim
    "Candid",      // Truthful and straightforward
    "Conundrum",   // A confusing or difficult problem
    "Daunting",    // Intimidating or seemingly difficult
    "Diligent",    // Showing care in one's work or duties
    "Eloquent",    // Fluent or persuasive in speaking or writing
    "Ephemeral",   // Lasting for a very short time
    "Fortuitous",  // Happening by chance; lucky
    "Inevitable",  // Certain to happen; unavoidable
    "Innovate",    // To introduce new ideas or methods
    "Lucid",       // Expressed clearly; easy to understand
    "Ostentatious",// Designed to impress or attract notice
    "Paradigm",    // A typical example or pattern of something
    "Pragmatic",   // Dealing with things sensibly and realistically
    "Proficient",  // Competent or skilled in doing something
    "Resilient",   // Able to recover quickly from difficulties
    "Scrutinize",  // To examine closely and thoroughly
    "Substantiate",// Provide evidence to support or prove
    "Tenacious",   // Persistent and determined
    "Vindicate"    // Clear someone of blame or suspicion
  ];

     
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