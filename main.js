var room = Math.floor(Math.random() * 100) + 1;
var name = navigator.platform + room;
var message = document.querySelector('.message');
var hostForm = document.querySelector('.host');
var chatboxForm = document.querySelector('.chatbox');
var joinForm = document.getElementById("join");
var upload = document.getElementById("upload");
const fileSelect = document.getElementById("fileSelect");
//do not use this API_URL ,its only for demo , if u want one go to https://www.piesocket.in/ 
var API_URL = "fHCjeFDqqxXH2ztpCiiNBVI9ECYq6BFcATyhGy9keLThkwMNdf0pABdIzWhJ";
var socket;
var start;
var peer;

function log(message) {
    const log = document.querySelector('#log');
    const p = document.createElement('p');
    p.textContent = message;
    log.appendChild(p);
}

function logError(err) {
    const log = document.querySelector('#log');
    const p = document.createElement('p');
    p.textContent = err.message;
    p.style.color = 'red';
    log.appendChild(p);
}

function logElement(elm) {
    const log = document.querySelector('#log');
    log.appendChild(elm);
}

 hostForm.addEventListener('submit', event => {
     start="host";
    event.preventDefault();
    const formdata = new FormData (hostForm);
    if (formdata.get('name') != "") {
        name = formdata.get('name');
    }
    document.getElementById("roomid").innerHTML = room;
    init();
    joinForm.style.display = "none";
});
joinForm.addEventListener('submit', event => {
    start ="join";
    event.preventDefault();
    const formdata = new FormData(joinForm);
    if (formdata.get('join') == "" || formdata.get('join') == " ") {
        window.alert("enter room id");
    } else {
       room = formdata.get('join');
        init();
        joinForm.reset();
    }
});
chatboxForm.addEventListener('submit', event => {
    event.preventDefault();
    const formdata = new FormData(chatboxForm);
    const msg = formdata.get('message');
    let type = "chat";
    const data = {
        name,
        msg,
        type
    };
    peer.send(JSON.stringify(data));
    const p = document.createElement('p');
    p.textContent = "me : " + msg;
    message.appendChild(p);
    chatboxForm.reset();
});
//websocket is set
function init() {
    socket = new simpleWebsocket("wss://us-nyc-1.websocket.me/v3/" + room + "?apiKey=" + API_URL);
    socket.on("connect", () => {
        log(`connection established`);
        if(start=="join"){
         createPeer();
        }else{
         addPeer();
        }
    });
    socket.on("data", (evt) => {
        evt = JSON.parse(evt);

        peer.signal(evt);
    });
    socket.on('close', () => {
        log(`some connection closed`);
    });
    socket.on("error", (err) => {
        log(`error:${err}`);
    });
}

function createPeer(){
    //u can use google stun , but cant use the turn its only for demo and don't work for you 
    //u can get turn server from https://xirsys.com/
    peer = new simplePeer({
        initiator: true,
        config:{ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },{
   urls: [ "stun:bn-turn1.xirsys.com" ]
},{
   username: "DizWDRVNR_YztfyU5maWHrBL0oBh4Tf85x13P3wXo9MfA6n6mkCOSUcn2i2NgSlvAAAAAF9JMNljYXBjb2Rl",
   credential: "9bce68ac-e94b-11ea-9b7e-0242ac140004",
   urls: [
       "turn:bn-turn1.xirsys.com:80?transport=udp",
       "turn:bn-turn1.xirsys.com:3478?transport=udp",
       "turn:bn-turn1.xirsys.com:80?transport=tcp",
       "turn:bn-turn1.xirsys.com:3478?transport=tcp",
       "turns:bn-turn1.xirsys.com:443?transport=tcp",
       "turns:bn-turn1.xirsys.com:5349?transport=tcp"]}
      ] }
                        });
    peer.on("error", (err) => {
        log(`error on peer : ${err}`);
    });

    peer.on("signal", data => {
        //log(`${JSON.stringify(data)}`);
        socket.send(JSON.stringify(data));
    });

    peer.on('connect', () => {
        log(`peer connection established`);
    });
    var filechunks = [];
    peer.on('data', data => {
        var flag;
        //console.log(typeof(data));
        try{
            JSON.parse(data);
            flag = true;
          } catch(e){
              flag = false;
          }
        console.log(text);
        if(flag){
            var text = JSON.parse(data);
          const p = document.createElement('li');
        if (text.type == "first data") {
            p.textContent = text.s;
            message.appendChild(p);
         }else if(text.type =="chat") {
             p.textContent = text.name + ' : ' + text.msg;
             message.appendChild(p);
         }else if(text.type == "finish"){
            var file = new Blob(filechunks);
            console.log('blob',file);
            file = new File([file],text.name,{lastModified: new Date().getTime(),type:text.ext});
            console.log(text.ext);
            console.log('received',file);
                const p =document.createElement('p');
                const a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.textContent = "download";
                a.download = text.name;
                p.appendChild(a);
                logElement(p);
             filechunks = [];
             file='';
         }
        }else {
            filechunks.push(data);
        }
        //console.log(text);
        
        
    });
}
function addPeer(){
     //u can use google stun , but cant use the turn its only for demo and don't work for you 
    //u can get turn server from https://xirsys.com/
    peer= new simplePeer({
    config:{ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },{
   urls: [ "stun:bn-turn1.xirsys.com" ]
},{
   username: "DizWDRVNR_YztfyU5maWHrBL0oBh4Tf85x13P3wXo9MfA6n6mkCOSUcn2i2NgSlvAAAAAF9JMNljYXBjb2Rl",
   credential: "9bce68ac-e94b-11ea-9b7e-0242ac140004",
   urls: [
       "turn:bn-turn1.xirsys.com:80?transport=udp",
       "turn:bn-turn1.xirsys.com:3478?transport=udp",
       "turn:bn-turn1.xirsys.com:80?transport=tcp",
       "turn:bn-turn1.xirsys.com:3478?transport=tcp",
       "turns:bn-turn1.xirsys.com:443?transport=tcp",
       "turns:bn-turn1.xirsys.com:5349?transport=tcp"]}
      ] }
    });
    
    peer.on("error", (err) => {
        log(`error on peer:${err}`);
    });
    
    peer.on("signal", data => {
        //log(`${JSON.stringify(data)}`);
        socket.send(JSON.stringify(data));
    });
    peer.on('connect', () => {
        log(`peer connection established`);
    });
    var filechunks = [];
    peer.on('data', data => {
        var flag;
      // console.log(typeof(data));
      try{
        JSON.parse(data);
        flag = true;
      } catch(e){
          flag = false;
      }
        if(flag){
            var text = JSON.parse(data);
            const p = document.createElement('li');
          if (text.type == "first data") {
              p.textContent = text.s;
              message.appendChild(p);
           }else if(text.type =="chat") {
               p.textContent = text.name + ' : ' + text.msg;
               message.appendChild(p);
           }else if(text.type == "finish"){
              var file = new Blob(filechunks);
              console.log('blob',file);
              file = new File([file],text.name,{lastModified: new Date().getTime(),type:text.ext});
              console.log(text.ext);
              console.log('received',file);
                  const p = document.createElement('p');
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(file);
                  a.textContent = "download";
                  a.download = text.name;
                  p.appendChild(a);
                  logElement(p);
               filechunks = [];
               file='';
          }
          }else {
              filechunks.push(data);
          }
            //div.appendChild(p);
    });
}
fileSelect.addEventListener("click", function (e) {
    if (upload) {
      upload.click();
    }
  }, false);

upload.addEventListener("change",(event)=>{
    const FilesList = upload.files;
    //to show the size in human readable form 
    let prettySize = ["KB","MB","GB"]; 
    var s;
    for(var i=0;i<FilesList.length;i++){
        let size = FilesList[i].size;
        let count = 0;
        for(let i=0;size/1024>1&&i<3;i++,size/=1024){
            count =i;   
        }
        s= FilesList[i].name + " " +size.toFixed(2)+ " " +prettySize[count];
    }
        // let file = [];
        //  for(var i=0 ;i<FilesList.length;i++){
        //      file[i] =FilesList[i];
        //  }
        console.log(FilesList[0]);
        let name = FilesList[0].name;
        const lastDote = name.lastIndexOf('.');
        const ext = FilesList[0].type;
         let type = "first data";
         let first ={
             type,
             s,
         };
         peer.send(JSON.stringify(first));
         const reader = new FileReader();
         reader.readAsArrayBuffer(FilesList[0]);
         reader.onload = function(){
             let buffer = reader.result;
             const chunksize = 16*1024;
             var number = 1;
             while(buffer.byteLength){
                 const chunk = buffer.slice(0,chunksize);
                 buffer = buffer.slice(chunksize,buffer.byteLength);
                 console.log(`chunks ${number}:`,chunk);
                 peer.send(chunk);
                 number++;
             }
             type ="finish";
             let finish={
                type,
                name,
                ext
             }
             const p = document.createElement('p');
             p.textContent = "me : " + name + "  uploaded";
             message.appendChild(p);
             peer.send(JSON.stringify(finish));
         }
        // end of convert size to human readable code 
},false);




