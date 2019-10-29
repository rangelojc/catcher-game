class BaseText extends Phaser.GameObjects.Text {
    constructor(params) {
        super(
            params.scene,
            params.x,
            params.y,
            params.text,
            { fontFamily: "Segoe UI, Verdana", fontSize: "20px", color: "#111" }
        );
    }

    getStyle() {
        return;
    }

    set(value) {
        this.setText(value);
    }
}

export class HUD {
    public life: BaseText;
    public score: BaseText;
    public highscore: BaseText;

    constructor(params) {
        var lifeparams = this.getSpecs("life");
        this.life = new BaseText(lifeparams);

        var scoreparams = this.getSpecs("score");
        this.score = new BaseText(scoreparams);

        var highscoreparams = this.getSpecs("highscore");
        this.highscore = new BaseText(highscoreparams);
    }

    getSpecs(type) {
        switch (type) {
            case "life":
                return {
                    x: 10,
                    y: 20,
                    text: "Life: 3"
                }
            case "score":
                return {
                    x: 10,
                    y: 60,
                    text: "Score: 0"
                }
            case "highscore":
                return {
                    x: 10,
                    y: 100,
                    text: "Highscore: 0"
                }
        }
    }
}