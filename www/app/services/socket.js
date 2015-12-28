app.factory('socket', function ($rootScope) {

    console.log('socketSvc:ctor');

    var socket = io.connect();

    socket.on('connection', function (socket) {
        console.log('socketSvc:connection');
    });

    return {
        io: socket,
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});