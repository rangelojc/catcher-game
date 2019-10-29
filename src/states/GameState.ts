export class State {
    public gameOver: boolean = false;
    public score: number = 0;
    public highscore: number = 0;
    public life: number = 3;

    public level: number = 1;
    public originalStarSpawnRate: number = 1000;
    public originalStarDropSpeed: number = 550;
    public starSpawnRate: number = 1000;
    public starDropSpeed: number = 550;

    public scoreTier: number[] = [
        0, 5, 10, 15, 20, 30, 50, 60, 70, 80,
        100, 120, 150
    ]

    public get(key) {
        return this[key];
    }

    public set(key, value) {
        this[key] = value;
    }
}