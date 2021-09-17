// app.js
const { Console } = require('console');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const axios = require('axios').default;

var mysql = require('mysql');

// Reserved Events
let ON_CONNECTION = 'connection';
let ON_DISCONNECT = 'disconnect';

// Main Events
let EVENT_IS_USER_ONLINE = 'check_online';
let EVENT_SINGLE_CHAT_MESSAGE = 'single_chat_message';
let EVENT_LOGIN = "otp";

// Sub Events
let SUB_EVENT_RECEIVE_MESSAGE = 'receive_message';
let SUB_EVENT_MESSAGE_FROM_SERVER = 'message_from_server';
let SUB_EVENT_IS_USER_CONNECTED = 'is_user_connected';



let EVENT_DOCTOR_STATUS = 'doctorApproval';
let EVENT_MSG = 'SEND_MSG';
let EVENT_ONLINE = 'ONLINE';
let EVENT_SEND_NUMBER = 'SEND_NUMBER';
let EVENT_LOGOUT = 'LOGOUT';
let EVENT_CHECK_CONNECT = 'EVENT_CHECK_CONNECT';
let EVENT_ADD_NUMBER = 'EVENT_ADD_NUMBER';


let current_users = [];
let listen_port = 3000;


io.sockets.on(ON_CONNECTION, function(socket) {

        
     
    console.log("\n\n => COnnected => users", current_users.length);


    socket.on('check_is_toonline', function(d) {

    });

    socket.on("allowccd" , function(d){
       
    });

    socket.on(EVENT_CHECK_CONNECT, function(check_num) {
        console.log("OnCheck ", check_num);
        let find = false;
        current_users.forEach(element => {
            if (element[2] == check_num) {
                find = true;
            }
        });
        if (!find) {
            console.log("OnCheck FOR Add Number");
            socket.broadcast.emit(EVENT_ADD_NUMBER, ['add number']);
        } else
            console.log("Already Connect");
    });

    socket.on(EVENT_MSG, function(chat_message) {
        onMessage(socket, chat_message);
    });
    socket.on(EVENT_LOGIN, function(chat_message) {
        console.log("\n\n");
        console.log(chat_message);

        console.log("\n\n");
    });


    socket.on(EVENT_SEND_NUMBER, function(num) {
        console.log("Fetch User ");
        let check = true;
        current_users.forEach(element => {
            if (element[2] == num) {
                //socket.broadcast.emit();
                check = false;
            }
        });
        if (check)
            current_users.push([
                "status",
                socket.id,
                num,

            ]);
        for (var i = 0; i < current_users.length; ++i) {
            //if (current_users[i][0] == "0315")
            console.log(current_users[i]);

        }
        if (current_users.length == 0)
            console.log("Empty Fetch");

        console.log('sending');

        socket.broadcast.emit("online", current_users);

    });

    // socket.on("online", function(d) {
    //     //console.log("online");
    //     // console.log(current_users);
    //     socket.emit("online", current_users);
    // });
    socket.on(EVENT_DOCTOR_STATUS, function(chat_message) {
        console.log(chat_message);
        socket.emit(EVENT_DOCTOR_STATUS, chat_message);
    });

    socket.on(EVENT_LOGOUT, (reason) => {
        console.log("Logout");
        let dlt;
        for (var i = 0; i < current_users.length; ++i) {
            if (current_users[i][1] == socket.id) {
                dlt = current_users[i];
                current_users.splice(i, 1);
            }

        }


        console.log("logout => ", dlt);
//         if (current_users.length != 0)
// {
//         //console.log("logout => ", dlt[2] + "");
        
//         ondisasync(dlt[2]);
// }
        

        //socket.emit("online", current_users);
        
        socket.broadcast.emit("online", current_users);

        if (current_users.length == 0)
            console.log("empty Logout");


        // socket.disconnect();

    });

    socket.on("onGroupCreate" , (data)=>{
        
        socket.broadcast.emit("onGroupCreate", ['current_users']);
        
        socket.broadcast.emit("online", current_users);
    });


    socket.on("close", async function(num) {

        console.log("Delete =>", num);
        
        let dlt;
        for (var i = 0; i < current_users.length; ++i) {
            if (current_users[i][2] == num) {
                dlt = current_users[i];
                current_users.splice(i, 1);

            }
        }
        console.log(dlt);

       
        console.log("DISCONNECTED");
        
        socket.broadcast.emit("online", current_users);
        //socket.disconnect();
    });


    socket.on('disconnect', async (reason) => {
        console.log("Disconnected");
            
        let dlt;
        for (var i = 0; i < current_users.length; ++i) {
            if (current_users[i][1] == socket.id) {
                current_users.splice(i, 1);
                dlt = current_users[i];
            }

        }


        console.log("Disconnected  ... => ", dlt);
        socket.broadcast.emit("online", current_users);

        if (current_users.length == 0)
            console.log("empty");

           

        socket.disconnect();


    });

     

    
    socket.on('home', (reason) => {
        console.log("Home");

        // let dlt;
        // for (var i = 0; i < current_users.length; ++i) {
        //     if (current_users[i][1] == socket.id) {
        //         current_users.splice(i, 1);
        //         dlt = current_users[i];
        //     }

        // }


        //console.log("Disconnected => ", dlt);
        socket.emit("online", current_users);

        // if (current_users.length == 0)
        //     console.log("empty");

       // socket.disconnect();


    });
     



    console.log('\n\nUsers');
    for (var i = 0; i < current_users.length; ++i) {
        console.log(current_users[i]);
    }
    console.log('\n\nUsers');

    socket.broadcast.emit("online" , current_users);
});
   

ondisasync=async(num)=>{
        console.log("Enter ",num);
        var ipAddress="http://192.168.3.102/chat_app/pages/uploader.php?from="+num;
        //var bodyFormData = new FormData();
       // bodyFormData.append('from', num);
       // "Content-Type": "multipart/form-data"
      // 'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
     // var formData = new FormData();
      //formData.append("from" , num);
      const formUrlEncoded = x =>
      Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
        var querystring = require('querystring');
        const config = {
            method: 'GET',
            url: ipAddress,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            
            //data: formUrlEncoded({'from' : num}),
          };
          try {

           
            const response = await axios(config)
              .then((res) => console.log( " res = ",res.data))
              .catch((error) => console.log(" Error = " , error));

              
            console.log('response from api in server:::::::::',response);
              
            
          } catch (err) {
            console.log('response from api in server:::::::::',err);
          }
    }

 
function onMessage(socket, chat_message) {
    console.log("On mshg users=>", current_users.length);
    console.log(chat_message);

    var findReciever = false;
    // socket.broadcast.emit(EVENT_MSG, chat_message);


    // if (current_users.length == 0) {
    //     current_users.push([
    //         "status",
    //         socket.id,
    //         chat_message.split('_')[0],

    //     ]);
    // }
    var numFound = false;
    for (let i = 0; i < current_users.length; ++i) {
        console.log(chat_message.split('_dif123dif_')[0]);
        // console.log('\n 11 \n', current_users[i][2] == chat_message.split('_')[0]);
        if (current_users[i][2] == chat_message.split('_')[0]) {
            numFound = true;
        }
    }
    if (!numFound) {
        current_users.push([
            "status",
            socket.id,
            chat_message.split('_')[0],

        ]);
    }

    console.log('\nspace\n');

    for (let i = 0; i < current_users.length; ++i) {
        //console.log(chat_message.split('_')[1]);
        if (current_users[i][2] == chat_message.split('_dif123dif_')[1]) {
            findReciever = true;
            console.log("online", current_users[i][2]);
        }

    }


    if (!findReciever) {
        console.log("Not Online");
        socket.broadcast.emit("check_is_toonline", "offline_" + chat_message.split('_')[1]);
        //socket.broadcast.emit(EVENT_MSG, chat_message);
        //send data to server
        //  database("insert");
    } else {

        socket.broadcast.emit("check_is_to_online", "online");
    }
    socket.broadcast.emit("online", current_users);
    for (let i = 0; i < current_users.length; ++i) {
        console.log(current_users[i])

    }

    
    socket.broadcast.emit(EVENT_MSG, chat_message);

}



function database(qry) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "chat"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected! DB");

        // 	  //LOGIN
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            con.query(qry, function(err, result) {
                if (err) throw err;
                console.log("ok");
            });
        });


        con.destroy(function(err) {
            if (err) throw err;
            console.log(" Dis Connected! DB");
        });

    });
}



function onEachUserConnection(socket, chat_message) {


    // var con = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "chat"
    // });

    // con.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected! DB");

    //   // 	  //LOGIN
    //   con.connect(function (err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    //     con.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log("ok");
    //     });
    //   });


    //   con.destroy(function (err) {
    //     if (err) throw err;
    //     console.log(" Dis Connected! DB");
    //   });

    // });



    ///


    socket.emit('single_chat_message', chat_message);

}


server.listen(listen_port, '192.168.0.108', () => {
    console.log(' => server is running on port ', server.address());
});