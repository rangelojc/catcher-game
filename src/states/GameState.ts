export class State {
    public gameOver: boolean;
    public score: number;
    public highscore: number;
    public life: number;

    public level: number;
    public starSpawnRate: number;
    public starDropSpeed: number;

    public originalStarSpawnRate: number = 1000;
    public originalStarDropSpeed: number = 550;

    public scoreTier: number[] = [
        0, 5, 10, 15, 20, 30, 50, 60, 70, 80,
        100, 120, 150
    ]

    public log: any;

    constructor() {
        this.init();
    }

    public init() {
        this.gameOver = false;
        this.score = 0;
        this.highscore = 0;
        this.life = 3;

        this.level = 1;
        this.starSpawnRate = 1000;
        this.starDropSpeed = 550;

        this.log = [];
    }

    public get(key) {
        const value = this[key];
        this.logEntry(key, value, "Get");
        return value;
    }

    public set(key, value) {
        this.logEntry(key, value, "Set");
        this[key] = value;
    }

    private logEntry(key, value, type) {
        this.log.push({
            timestamp: Date.now(),
            content: `${type} ${key} with value ${value}`
        });
    }
}