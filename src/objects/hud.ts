export class HUD {
    public group: any = {
        life: null,
        score: null,
        highscore: null,
        level: null,
    };

    constructor(params) {
        this.addText("life", params);
        this.addText("score", params);
        this.addText("highscore", params);
        this.addText("level", params);
    }

    getSpecs(key) {
        switch (key) {
            case "life": return { x: 10, y: 20, text: "Life: 0" }
            case "score": return { x: 10, y: 60, text: "Score: 0" }
            case "highscore": return { x: 10, y: 100, text: "Highscore: 0" }
            case "level": return { x: 10, y: 140, text: "Level: 0" }
        }
    }

    addText(key, params) {
        var newparams = Object.assign(params, this.getSpecs(key));
        this.group[key] = params.scene.add.text(
            newparams.x,
            newparams.y,
            newparams.text,
            this.getStyle()
        );
    }

    getStyle() {
        return { fontSize: "20px", color: "#111" };
    }

    setText(key, value) {
        let text = "";

        switch (key) {
            case "life": text = "Life: " + value; break;
            case "score": text = "Score: " + value; break;
            case "highscore": text = "High Score: " + value; break;
            case "level": text = "Level: " + value; break;
        }
        this.group[key].setText(text);
    }
}