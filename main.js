var room = Math.floor(Math.random() * 100) + 1;
var name = navigator.platform + room;
var message = document.querySelector('.message');
var form1 = document.querySelector('.login');
var form2 = document.querySelector('.chatbox');
var form3 = document.getElementById("join");
document.getElementById("connect").style.display="none";
var peer ;
//do not use this API_URL ,its only for demo , if u want one go to https://www.websocket.in/ 
var API_URL = "fHCjeFDqqxXH2ztpCiiNBVI9ECYq6BFcATyhGy9keLThkwMNdf0pABdIzWhJ";
var socket;
//torrent starts
var client;
var start = 0;

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


form1.addEventListener('submit', event => {
    event.preventDefault();
    const formdata = new FormData(form1);
    if (formdata.get('name') != "") {
        name = formdata.get('name');
    }
    document.getElementById("roomid").innerHTML = room;
    addPeer();
    init();
    form3.style.display = "none";
});
form2.addEventListener('submit', event => {
    event.preventDefault();
    const formdata = new FormData(form2);
    const msg = formdata.get('message');
    const data = {
        name,
        msg
    };
    peer.send(JSON.stringify(data));
    const p = document.createElement('p');
    p.textContent = "me : " + msg;
    message.appendChild(p);
    form2.reset();
});
form3.addEventListener('submit', event => {
    start = 1;
    event.preventDefault();
    const formdata = new FormData(form3);
    if (formdata.get('join') == "" || formdata.get('join') == " ") {
        window.alert("enter room id");
    } else {
       room = formdata.get('join');
        init();
        form3.reset();
    }
});
document.getElementById("connect").addEventListener('click',event=>{
    event.preventDefault();
    createPeer();
});
//websocket is set
function init() {
    socket = new simpleWebsocket("wss://connect.websocket.in/v3/" + room + "?apiKey=" + API_URL);
    socket.on("connect", () => {
        log(`connection established`);
        if(start == 1){
           form3.style.display="none";
           document.getElementById("connect").style.display="";
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

    peer.on('data', data => {
        var text = JSON.parse(data);
        console.log(text);
        const p = document.createElement('li');
        if (text.infohash) {
            p.textContent = text.name + ' : ' + text.infohash;
            text.infohash = text.infohash.trim();
        } else {
            p.textContent = text.name + ' : ' + text.msg;
        }
        
        message.appendChild(p);
    });
}
function addPeer(){
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
    peer.on('data', data => {
        var text = JSON.parse(data);
            console.log(text);
            //const div = document.createElement('div');
            const p = document.createElement('li');
            if (text.infohash) {
                p.textContent = text.name + ' : ' + text.infohash;
                text.infohash = text.infohash.trim();
            } else {
                p.textContent = text.name + ' : ' + text.msg;
            }
            //div.appendChild(p);
            message.appendChild(p);
    });
}


//torrent starts

function inittorrent() {
    client = new WebTorrent();
    client.on("warning", logError);
    client.on("error", logError);
    const download = document.getElementById('download');
    download.addEventListener('click',event=>{
       event.preventDefault();
       const torrentId=document.querySelector('#message').value.trim();
       addTorrent(torrentId);
    });
    const upload = document.querySelector('#upload');
    uploadElement(upload, (err, results) => {
        if (err) logError(err);

        const files = results.map(result => result.file);
        seedFiles(files);
    });
    const body = document.querySelector('body');
    dragDrop(body, seedFiles);
}

function seedFiles(files) {
    client.seed(files, handleSeedTorrent);
    log(`seeding new torrent with ${files.length} files`);

}

function addTorrent(infohash) {
    console.log("in addTorrent");
    const announce = createTorrent.announceList.map(arr => arr[0]).filter(url => url.startsWith('wss://') || url.startsWith('ws://'));
    client.add(infohash, {announce}, handleAdd);
    // log("adding torrent!");
}

function updateSpeed(torrent) {
    const progress = (100 * torrent.progress).toFixed(1);
    const speed = `
    <b>Progress:</b> ${progress}%
    <b>Peer:</b>${torrent.numPeers}
    <b>Download speed:</b>${prettierBytes(client.downloadSpeed)}/s
    <b>Upload speed:</b>${prettierBytes(client.uploadSpeed)}/s`;

    document.querySelector('#speed').innerHTML = speed;
}

function handleSeedTorrent(torrent) {
    torrent.on('warning', logError);
    torrent.on('error', logError);
    updateSpeed(torrent);
    var infohash = torrent.infoHash;
    var data = {
        name,
        infohash
    };
    peer.send(JSON.stringify(data));
    console.log("found info hash:", infohash);
    const interval = setInterval(() => {
        updateSpeed(torrent)
    }, 1000);

    torrent.on('done', () => {
        updateSpeed(torrent);
        clearInterval(interval);
    });
    log(`torrent name:${torrent.name}`);
    log(`Number of files:${torrent.files.length}`);
    log(`info hash:${torrent.infoHash}`);
    // log(`Files:`);
    // torrent.files.forEach(file => {
    //     file.getBlobURL((err, url) => {
    //         if (err) logError(err);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         console.log("url", url);
    //         a.textContent = 'Download' + file.name + '-' + prettierBytes(file.length);
    //         a.style.display = "block";
    //         a.download = file.name;
    //         logElement(a);
    //     });
    // });
    // torrent.files.forEach( file=>{
    // log(`-${file.name}(${prettierBytes(file.length)})`);
    //    file.appendTo('#log',{autoplay:true,muted:true},err=>{
    //        if(err) logError(err);
    //    }); 

    // });

}
function handleAdd(torrent){
    console.log("inside handleAdd");
    torrent.on('warning', logError);
    torrent.on('error', logError);
    updateSpeed(torrent);
    // peer.send(JSON.stringify(data));
    console.log("found infohash :", torrent.infoHash);
    const interval = setInterval(() => {
        updateSpeed(torrent)
    }, 1000);

    torrent.on('done', () => {
        updateSpeed(torrent);
        clearInterval(interval);
    });
    log(`torrent name:${torrent.name}`);
    log(`Number of files:${torrent.files.length}`);
    log(`info hash:${torrent.infoHash}`);
    log(`Files:`);
    torrent.files.forEach(file => {
        file.getBlobURL((err, url) => {
            if (err) logError(err);
            const a = document.createElement('a');
            a.href = url;
            console.log("url", url);
            a.textContent = 'Download' + file.name + '-' + prettierBytes(file.length);
            a.style.display = "block";
            a.download = file.name;
            logElement(a);
        });
    });
    // torrent.files.forEach( file=>{
    // log(`-${file.name}(${prettierBytes(file.length)})`);
    //    file.appendTo('#log',{autoplay:true,muted:true},err=>{
    //        if(err) logError(err);
    //    }); 

    // });

}

//ends

inittorrent();
