export class State {
    public gameOver: boolean;
    public score: number;
    public highscore: number;
    public life: number;

    public level: number;
    public spawnRate: number;
    public dropSpeed: number;

    public originalSpawnRate: number = 1000;
    public originalDropSpeed: number = 550;
    public spawnRateChg: number = 72;
    public dropRateChg: number = 70;

    public scoreTier: number[] = [
        0, 5, 10, 15, 20, 30, 50, 60, 70, 80,
        100, 120, 150, 200
    ]

    public log: any;

    constructor() {
    }

    public init() {
        this.gameOver = false;
        this.score = 200;
        this.highscore = 0;
        this.life = 3;

        this.level = 1;
        this.spawnRate = 1000;
        this.dropSpeed = 550;

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