import { EVENTS } from "../Events";
import PubSub from "../PubSub";
import { GameServerStatus } from "./GameServerInfoConnection";

interface IGameList { [s: string]: GameServerStatus; }

export class GameServerListPublisher {
  private pubSub = new PubSub();
  private gameList: IGameList = { };

  constructor() {
    this.pubSub.subscribe(EVENTS.GAME_SERVER_UPDATE, (status: GameServerStatus) => {
      this.gameList[status.address] = status;
      this.publishGameList();
    });
  }

  public publishGameList() {
    this.pubSub.publish(EVENTS.GAME_LIST, Object.values(this.gameList));
  }
}
