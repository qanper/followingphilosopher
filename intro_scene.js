function Pre_intro_scene(pixi) {
    let scene = new Container();

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);


    {
        let message = new Text("Click to begin", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - 100, pixi.screen.height/2);
        scene.addChild(message);
    }

    scene.interactive = true;
    scene.click = function(e) {
        console.log("click");
        select_scene(intro_scene);
    }

    scene.update = (delta, now) => {

    };

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
    };

    return scene;
}

function Intro_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);


    {
        let message = new Text("FOLLOWING PHILOSOPHER", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }

    {
        let message = new Text("1. every birth take you away from win", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 100, 150);
        scene.addChild(message);
    }
    {
        let message = new Text("3. every kill makes you more deliberate", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 100, 200);
        scene.addChild(message);
    }
    {
        let message = new Text("*. touch semaphore for change trolley direction", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 100, 240);
        scene.addChild(message);
    }
    {
        let message = new Text("8. trolley is not your friend", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 100, 280);
        scene.addChild(message);
    }

    {
        let message = new Text("[WASD or arrw key to m0ve]", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 50, 320);
        scene.addChild(message);
    }
    {
        let message = new Text("[press ENter for begin/restart]", WHITE_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left - 64, 360);
        scene.addChild(message);
    }

    {
        let message = new Text("Happiness is not an ideal of reason but of imagination", RED_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 540);
        scene.addChild(message);
    }
    {
        let message = new Text("(Emmanuel Kant)", RED_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left + 500, 580);
        scene.addChild(message);
    }

    let cursor = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(10, 210, 20, 34)
        .endFill();

    // scene.addChild(cursor);

    let code_text = [];
    function add_letter(letter) {
        let message = new Text(letter, RED_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left + code_text.length * 40, 200);
        message.letter = letter;
        
        scene.addChild(message);

        code_text.push(message);
    };
    function remove_letter() {
        let letter = code_text.pop();
        scene.removeChild(letter);
    }

    function clear_letter() {
        let code_length = code_text.length;
        for(let i = 0; i < code_length; i++) {
            remove_letter();
        }
    }

    scene.update = (delta, now) => {
        // console.log(Math.floor(now) % 2);
        cursor.visible = (Math.floor(now/500) % 2 > 0);
        cursor.x = code_text.length * 40 + pixi.screen.width/2 - margin_left;
        /*if(cursor.visible === true) {
             false;
        } else {
            cursor.visible = true;
        }*/
    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                select_scene(game_scene);
            }
        }
    };

    scene.select = () => {
        music.volume = 0.5;
        music.loop = true;
        music.play();
    };

    return scene;
}