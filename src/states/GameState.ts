import Levels from "./Levels";

export class State {
    public gameOver: boolean;
    public score: number;
    public highscore: number;
    public life: number;

    public levelTiers: any = Levels;
    public level: any;

    public log: any;

    constructor() {
    }

    public init() {
        this.gameOver = false;
        this.score = 0;
        this.highscore = 0;
        this.life = 3;

        this.level = {};

        this.log = [];
    }

    public get(key) {
        const value = this[key];
        //this.logEntry(key, value, "Get");
        return value;
    }

    public set(key, value) {
        //this.logEntry(key, value, "Set");
        this[key] = value;
    }

    private logEntry(key, value, type) {
        this.log.push({
            timestamp: Date.now(),
            content: `${type} ${key} with value ${value}`
        });
    }
}