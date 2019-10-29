export class State {
    public gameOver: boolean = false;
    public starSpawnRate: number = 2000;

    public score: number = 0;
    public highScore: number = 0;
    public life: number = 0;

    public get(key) {
        return this[key];
    }

    public set(key, value) {
        this[key] = value;
    }
}