var express = require('express');
var dbus = require('node-dbus');

var app = express();

app.listen(process.env.PORT || 3412);

app.get('/', function(req, res) {
	var msg = Object.create(dbus.DBusMessage, {
		destination: {
			value: 'org.freedesktop.DBus'
		},
		path: {
			value: '/'
		},
		iface: {
			value: 'org.freedesktop.DBus'
		},
		member: {
			value: 'ListNames'
		},
		type: {
			value: dbus.DBUS_MESSAGE_TYPE_METHOD_CALL	
		},
		bus: {
			value: dbus.DBUS_BUS_SYSTEM
		}
	});
	msg.on ("error", function (error) {
  		console.log ("[FAILED] ERROR -- ");
  		console.log(error);
  	});

	msg.on ("methodResponse", function (result) {
	  console.log ("[PASSED] Got method response with data ::");
	  res.json(result);
	});

	msg.send();
});
