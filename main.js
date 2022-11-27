var room = Math.floor(Math.random() * 100) + 1;
var defaultName = navigator.platform + room;
var userName;
var currentUploadPercentage;
var currentUploadProgressbar;
var currentDownloadName;
var currentDownloadPercentage;
var currentDownloadProgressbar;
var currentNoNameDiv;
var downloadTotalSize;
const hostButton = document.querySelector('#hostButton');
const joinButton = document.querySelector('#joinButton');
const connectionStatus = document.querySelector('#connectionStatus');
const helloUser = document.querySelector('#helloUser');
helloUser.style.display="none";
const nav = document.querySelector('#navigationBar');
const inputNameDiv = document.querySelector('#inputNameDiv');
const messageContainerOuter = document.querySelector('#messageContainerOuter');
const chatboxContainer = document.querySelector('#chatboxContainer');
const inputNameSuperForm = document.querySelector('#inputNameSuperForm');
const message = document.querySelector('.message');
const sendButton = document.querySelector('#sendButton');
const upload = document.getElementById("upload");
const fileSelect = document.getElementById("fileSelect");
//do not use this API_URL ,its only for demo , if u want one go to https://www.piesocket.in/ 
var API_URL = "oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm"//"fHCjeFDqqxXH2ztpCiiNBVI9ECYq6BFcATyhGy9keLThkwMNdf0pABdIzWhJ";
var socket;
var start;
var peer;
window.onload = (event)=>{
    let h1 = nav.offsetHeight;
    let h2 = inputNameDiv.offsetHeight;
    let h3 = chatboxContainer.offsetHeight;
    let h4 = window.innerHeight;
    const h = h4 -(h1 + h2 + h3 + 40);
    console.log(h);
    messageContainerOuter.style.maxHeight=`${h}px`;
}
//getting user name
document.querySelector('#inputName').addEventListener('click',(evt)=>{
      evt.preventDefault();
      userName = document.querySelector('#inputNameForm').value;
      console.log(userName);
      helloUser.textContent = `Hola ${userName} !!`;
      helloUser.style.display="";
      inputNameSuperForm.style.display= "none";
 });


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

function createMeChat(msg){
    const me = document.createElement('div')
    me.classList.add('me');
    const textMessageMe = document.createElement('div');
    textMessageMe.classList.add('textMessageMe');
    const userNameMsg = document.createElement('div');
    userNameMsg.classList.add('userName');
    userNameMsg.textContent = userName;
    const actualMessage = document.createElement('div');
    actualMessage.classList.add('actualMessage');
    actualMessage.textContent  = msg;
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = new Date().toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'});
    textMessageMe.append(userNameMsg,actualMessage,time);
    me.append(textMessageMe);
    message.append(me);
}
function createOtherChat(text){
    const other = document.createElement('div')
    other.classList.add('other');
    const textMessageOther = document.createElement('div');
    textMessageOther.classList.add('textMessageOther');
    const userNameMsg = document.createElement('div');
    userNameMsg.classList.add('userName');
    userNameMsg.textContent = text.userName;
    const actualMessage = document.createElement('div');
    actualMessage.classList.add('actualMessage');
    actualMessage.textContent  = text.msg;
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = new Date().toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'});
    textMessageOther.append(userNameMsg,actualMessage,time);
    other.append(textMessageOther);
    message.append(other);
}
function downloadProgressBar(s){
    const download = document.createElement('div')
    download.classList.add('download');
    download.setAttribute('id',s);
    const downloadProgressBar = document.createElement('div');
    downloadProgressBar.classList.add('downloadProgressBar');
    currentDownloadProgressbar = downloadProgressBar;
    const downloadContainer = document.createElement('div');
    downloadContainer.classList.add('downloadContainer');
    const userNameMsg = document.createElement('div');
    userNameMsg.classList.add('userName');
    userNameMsg.textContent = userName;
    const noNameDiv = document.createElement('div');
    currentNoNameDiv = noNameDiv;
    const downloadName = document.createElement('span');
    downloadName.classList.add('downloadName');
    downloadName.textContent= s;
    currentDownloadName = downloadName;
    const downloadPercentage = document.createElement('span');
    downloadPercentage.classList.add('downloadPercentage');
    downloadPercentage.textContent=`(0%)`;
    currentDownloadPercentage = downloadPercentage;
    noNameDiv.append(downloadName,downloadPercentage);
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = new Date().toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'});
    downloadContainer.append(userNameMsg,noNameDiv,time);
     downloadProgressBar.appendChild(downloadContainer);
     download.appendChild(downloadProgressBar);
     message.appendChild(download); 
}
function updateDownloadProgressBar(value){
    currentDownloadPercentage.textContent = `${value}%`;
    currentDownloadProgressbar.style.background = `linear-gradient(90deg, #34d39986 ${value}%, #202124 0%)`;
}
function uploadProgressBar(s){
    const upload = document.createElement('div')
    upload.classList.add('upload');
    upload.setAttribute('id',s);
    const uploadProgressBar = document.createElement('div');
    uploadProgressBar.classList.add('uploadProgressBar');
    currentUploadProgressbar = uploadProgressBar;
    const uploadContainer = document.createElement('div');
    uploadContainer.classList.add('uploadContainer');
    const userNameMsg = document.createElement('div');
    userNameMsg.classList.add('userName');
    userNameMsg.textContent = userName;
    const noNameDiv = document.createElement('div');
    const uploadName = document.createElement('span');
    uploadName.classList.add('uploadName');
    uploadName.textContent= s;
    const uploadPercentage = document.createElement('span');
    uploadPercentage.classList.add('uploadPercentage');
    uploadPercentage.textContent=`(0%)`;
    currentUploadPercentage = uploadPercentage;
    noNameDiv.append(uploadName,uploadPercentage);
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = new Date().toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'});
    uploadContainer.append(userNameMsg,noNameDiv,time);
     uploadProgressBar.appendChild(uploadContainer);
     upload.appendChild(uploadProgressBar);
     message.appendChild(upload);
}
function updateUploadProgress(value){
    currentUploadPercentage.textContent = `(${value}%)`;
    currentUploadProgressbar.style.background = `linear-gradient(90deg, #34d39986 ${value}%, #202124 0%)`;
}
  hostButton.addEventListener('click',(evt)=>{
      start = 'host';
      if(!userName){
         userName = defaultName;
      }
      document.querySelector('#hostButtonSpan').textContent = room;
      helloUser.textContent = `Hola ${userName} !!`;
      helloUser.style.display="";
      inputNameSuperForm.style.display= "none";
      init();
      })

joinButton.addEventListener('click',evt=>{
    start='join';
    if(!userName){
        userName = defaultName;
    }
    document.querySelector('#inputCodeButton').addEventListener('click',evt=>{
        const inputCode = document.querySelector('#inputCode').value;
        if(inputCode == "" || inputCode == " " || !inputCode){
            window.alert("please enter room id to proceeed");
        }else{
            room = inputCode;
            document.querySelector('#hostButtonSpan').textContent = room;
            helloUser.textContent = `Hola ${userName} !!`;
            helloUser.style.display="";
            inputNameSuperForm.style.display= "none";
            init();
        }
    })
})

sendButton.addEventListener('click', event => {
    event.preventDefault();
    const msg = document.querySelector('#messageInput').value;
    let type = "chat";
    const data = {
        userName,
        msg,
        type
    };
    peer.send(JSON.stringify(data));
    createMeChat(msg);
    messageContainerOuter.scrollTop = messageContainerOuter.scrollHeight;
    document.querySelector('#messageInput').value="";
    document.querySelector('#messageInput').focus();
});
//websocket is set
function init() {
    socket = new simpleWebsocket("wss://demo.piesocket.com/v3/" + room + "?api_key=" + API_URL);
    socket.on("connect", () => {
        if(start=="join"){
         connectionStatus.textContent='connection ready';
         connectionStatus.style.backgroundColor = '#f5b74c';
         connectionStatus.style.marginLeft="5px";
         connectionStatus.style.color="black";
         createPeer();
        }else{
         connectionStatus.textContent='connecting';
         connectionStatus.style.backgroundColor = '#f5b74c';
         connectionStatus.style.marginLeft="5px";
         connectionStatus.style.color="black";
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
         connectionStatus.textContent='connected';
         connectionStatus.style.backgroundColor = '#34d399';
         connectionStatus.style.marginLeft="5px";
         connectionStatus.style.color="black";
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
        if (text.type == "first data") {
            downloadProgressBar(text.s);
            downloadTotalSize = text.size;
            messageContainerOuter.scrollTop = messageContainerOuter.scrollHeight;
         }else if(text.type =="chat") {
             createOtherChat(text);
             messageContainerOuter.scrollTop = messageContainerOuter.scrollHeight;
         }else if(text.type == "finish"){
            var file = new Blob(filechunks);
            console.log('blob',file);
            file = new File([file],text.name,{lastModified: new Date().getTime(),type:text.ext});
            console.log(text.ext);
            console.log('received',file);
                const a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.textContent = text.name;
                a.download = text.name;
                a.style.overflowWrap="break-word";
                currentDownloadName.textContent="";
                currentNoNameDiv.append(a);
             filechunks = [];
             file='';
             currentDownloadName = null;
             currentDownloadPercentage = null;
             currentDownloadProgressbar = null;
             currentNoNameDiv=null;
         }
        }else {
            filechunks.push(data);
            let percentage = Math.floor(((filechunks.length*1024*16)/downloadTotalSize)*100);
            updateDownloadProgressBar(percentage);

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
        connectionStatus.textContent='connected';
         connectionStatus.style.backgroundColor = '#34d399';
         connectionStatus.style.marginLeft="5px";
         connectionStatus.style.color="black";
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
          if (text.type == "first data") {
              downloadProgressBar(text.s);
              downloadTotalSize = text.size;
              messageContainerOuter.scrollTop = messageContainerOuter.scrollHeight;
           }else if(text.type =="chat") {
               createOtherChat(text);
               messageContainerOuter.scrollTop = messageContainerOuter.scrollHeight;
           }else if(text.type == "finish"){
              var file = new Blob(filechunks);
              console.log('blob',file);
              file = new File([file],text.name,{lastModified: new Date().getTime(),type:text.ext});
              console.log(text.ext);
              console.log('received',file);
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(file);
                  a.textContent = text.name;
                  a.download = text.name;
                  a.style.overflowWrap='break-word';
                  currentDownloadName.textContent="";
                  currentNoNameDiv.append(a);
               filechunks = [];
               file='';
               currentDownloadName = null;
                currentDownloadPercentage = null;
                currentDownloadProgressbar = null;
                currentNoNameDiv = null;
          }
          }else {
              filechunks.push(data);
              let percentage = Math.floor(((filechunks.length*1024*16)/downloadTotalSize)*100);
               updateDownloadProgressBar(percentage);
          }
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
        s= FilesList[i].name + "_" +size.toFixed(2)+ "_" +prettySize[count];
    }
        console.log(FilesList[0]);
        let name = FilesList[0].name;
        const ext = FilesList[0].type;
         let type = "first data";
         let first ={
             type,
             s,
             size:FilesList[0].size
         };
         peer.send(JSON.stringify(first));
         uploadProgressBar(s);
         chopAndSend(FilesList[0])
         .then(data =>{
             console.log(data);
                type ="finish";
                let finish={
                    type,
                    name,
                    ext
                }
            peer.send(JSON.stringify(finish));
            currentUploadPercentage = null;
            currentUploadProgressbar = null; 
         })
            
},false);

async function chopAndSend(data){
    var val = 0;
    var number = Math.floor(data.size/(16*1024));
    for(let i = 0; i<=number;i++){
       const chunk = data.slice(val,val+16*1024);
       const buffer = await chunk.arrayBuffer();
       console.log(`${i}`,buffer);
       peer.send(buffer);
       var percentage = Math.floor((i/number)*100);
       updateUploadProgress(percentage);
       val += 16*1024;
    }
    return 'done';
 }
