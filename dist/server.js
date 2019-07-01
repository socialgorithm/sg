"use strict";
exports.__esModule = true;
var debug = require("debug")("sg:tournament-server");
var banner_1 = require("./banner");
var GameServerInfoConnection_1 = require("./game-server/GameServerInfoConnection");
var LobbyManager_1 = require("./lobby/LobbyManager");
var PubSub_1 = require("./PubSub");
var SocketServer_1 = require("./socket/SocketServer");
var TournamentServer = (function () {
    function TournamentServer(options) {
        console.log(banner_1.banner);
        debug("Initialising PubSub system");
        this.pubSub = new PubSub_1["default"]();
        debug("Initialising game server connections");
        var gameServers = options.game.map(function (gameServerAddress) { return new GameServerInfoConnection_1.GameServerInfoConnection(gameServerAddress); });
        debug("Initialising socket");
        this.socketServer = new SocketServer_1.SocketServer(options.port, gameServers);
        this.socketServer.start();
        this.LobbyManager = new LobbyManager_1.LobbyManager();
    }
    return TournamentServer;
}());
exports["default"] = TournamentServer;
//# sourceMappingURL=Server.js.map