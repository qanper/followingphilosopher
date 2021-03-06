/*
const stations = [
    {x:10, y:20, type:"bend", next:1},
    {x:210, y:20, type:"bend", next:2},
    {x:210, y:220, type:"bend", next:3},
    {x:100, y:220, type:"bend", next:false},
];
*/


function Game_scene(pixi) {
    let scene = new Container();

    scene.width = pixi.screen.width;
    scene.height = pixi.screen.height;

    const stations = [
        {x: 41, y: 172, state:0, next:[1]},
        {x: 134, y: 41, state:0, next:[2]},
        {x: 292, y: 39, state:0, next:[3]},
        {x: 435, y: 101, state:0, next:[4]},
        {x: 577, y: 80, state:1, next:[5, 16]},
        {x: 672, y: 55, state:0, next:[6]},
        {x: 817, y: 48, state:0, next:[7]},
        {x: 938, y: 131, state:0, next:[8]},
        {x: 1039, y: 224, state:0, next:[9]},
        {x: 1049, y: 327, state:0, next:[10]},
        {x: 1013, y: 496, state:0, next:[30, 11]},
        {x: 902, y: 548, state:0, next:[12]},
        {x: 591, y: 610, state:0, next:[13]},
        {x: 328, y: 567, state:0, next:[14]},
        {x: 161, y: 495, state:0, next:[15]},
        {x: 81, y: 346, state:0, next:[0]},
        {x: 680, y: 144, state:0, next:[17]},
        {x: 797, y: 152, state:0, next:[18]},
        {x: 880, y: 231, state:0, next:[19]},
        {x: 915, y: 308, state:0, next:[20]},
        {x: 881, y: 410, state:0, next:[21]},
        {x: 725, y: 467, state:0, next:[22, 24]},
        {x: 592, y: 497, state:0, next:[23]},
        {x: 452, y: 516, state:0, next:[13]},
        {x: 527, y: 403, state:0, next:[25]},
        {x: 361, y: 432, state:0, next:[26]},
        {x: 270, y: 326, state:0, next:[27]},
        {x: 306, y: 235, state:0, next:[28]},
        {x: 245, y: 103, state:0, next:[29]},
        {x: 140, y: 231, state:0, next:[0]},
        {x: 1018, y: 622, state:0, next:[31]},
        {x: 887, y: 648, state:0, next:[32]},
        {x: 811, y: 537, state:0, next:[33]},
        {x: 787, y: 381, state:0, next:[34]},
        {x: 673, y: 311, state:0, next:[35]},
        {x: 547, y: 275, state:0, next:[36]},
        {x: 434, y: 257, state:0, next:[27]}
    ];

    scene.interactive = true;

    scene.click = function(e) {
        console.log("click!", e.data.global);
    }

    let mans = [];

    const margin_left = 250;

    for (let x = 0; x < pixi.screen.width; x += 30) {
        for (let y = 0; y < pixi.screen.height; y += 30) {
            let sq_block = create_geometry(
                pixi.renderer.generateTexture(new Graphics()
                    .beginFill(0x333333)
                    .drawRect(0, 0, 3, 3)
                    .endFill()
                ),
                pixi.renderer.generateTexture(new Graphics()
                    .beginFill(0x8080ff)
                    .drawRect(0, 0, 3, 3)
                    .endFill()
                )
            );

            scene.addChild(sq_block);

            sq_block.x = x;
            sq_block.y = y;
        }
    }

    const RAIL_DISTANCE = 10;
    const SLEEPER_SIZE = 14;
    const SLEEPER_INTERVAL = 20;

    let route_stations = [];

    let murders = 10;

    let statistics = new Text("kill " + murders + " to win", RED_STYLE_H2);
    statistics.position.set(pixi.screen.width - 200, 10);
    scene.addChild(statistics);

    stations.forEach((station, idx) => {
        station.next.forEach(next_station => {
            const rail_angle = Math.atan2(
                stations[next_station].x - station.x,
                stations[next_station].y - station.y
            ) + Math.PI/2;

            const rail_length = Math.sqrt(
                Math.pow(stations[next_station].x - station.x, 2) + 
                Math.pow(stations[next_station].y - station.y, 2)
            );

            for(let t = 0; t < 1; t += SLEEPER_INTERVAL / rail_length) {
                let sleeper = create_geometry(
                    pixi.renderer.generateTexture(new Graphics()
                        .lineStyle(5, 0x999999, 1)
                        .moveTo(0, 0)
                        .lineTo(0, SLEEPER_SIZE * 2)
                    ),
                    pixi.renderer.generateTexture(new Graphics()
                        .lineStyle(5, 0x8080ff, 1)
                        .moveTo(0, 0)
                        .lineTo(0, SLEEPER_SIZE * 2)
                    )
                );
                scene.addChild(sleeper);

                sleeper.x = station.x + (
                    stations[next_station].x - station.x
                ) * t + SLEEPER_SIZE * 1 * Math.sin(rail_angle + Math.PI);
                sleeper.y = station.y + (
                    stations[next_station].y - station.y
                ) * t + SLEEPER_SIZE * 1 * Math.cos(rail_angle + Math.PI);

                sleeper.rotation = -rail_angle;// + Math.PI;
            }


            let rail_0 = create_geometry(
                pixi.renderer.generateTexture(new Graphics()
                    .lineStyle(3, 0xFFFFFF, 1)
                    .moveTo(0, 0)
                    .lineTo(
                        (stations[next_station].x - station.x),
                        (stations[next_station].y - station.y)
                    )
                ),
                pixi.renderer.generateTexture(new Graphics()
                    .lineStyle(3, 0x8080ff, 1)
                    .moveTo(0, 0)
                    .lineTo(
                        (stations[next_station].x - station.x),
                        (stations[next_station].y - station.y)
                    )
                )
            );

            let rail_1 = create_geometry(
                pixi.renderer.generateTexture(new Graphics()
                    .lineStyle(3, 0xFFFFFF, 1)
                    .moveTo(0, 0)
                    .lineTo(
                        (stations[next_station].x - station.x),
                        (stations[next_station].y - station.y)
                    )
                ),
                pixi.renderer.generateTexture(new Graphics()
                    .lineStyle(5, 0x8080ff, 1)
                    .moveTo(0, 0)
                    .lineTo(
                        (stations[next_station].x - station.x),
                        (stations[next_station].y - station.y)
                    )
                )
            );

            if(stations[next_station].x - station.x >= 0) {
                rail_0.x = station.x - RAIL_DISTANCE * Math.sin(rail_angle);
                rail_1.x = station.x + RAIL_DISTANCE * Math.sin(rail_angle);
            } else {
                rail_0.x = stations[next_station].x - RAIL_DISTANCE * Math.sin(rail_angle);
                rail_1.x = stations[next_station].x + RAIL_DISTANCE * Math.sin(rail_angle);
            }

            if(stations[next_station].y - station.y >= 0) {
                rail_0.y = station.y - RAIL_DISTANCE * Math.cos(rail_angle);
                rail_1.y = station.y + RAIL_DISTANCE * Math.cos(rail_angle);
            } else {
                rail_0.y = stations[next_station].y - RAIL_DISTANCE * Math.cos(rail_angle);
                rail_1.y = stations[next_station].y + RAIL_DISTANCE * Math.cos(rail_angle);
            }

            scene.addChild(rail_0);
            scene.addChild(rail_1);
        });

        if(station.next.length > 1) {
            let s_diffuse = Sprite.from(pixi.renderer.generateTexture(new Graphics()
                .beginFill(0xa6fd29)
                .drawCircle(0, 0, 10)
                .endFill()
            ));
            s_diffuse.parentGroup = diffuseGroup;
            let s_normal = Sprite.from(pixi.renderer.generateTexture(new Graphics()
                .beginFill(0x8080ff)
                .drawCircle(0, 0, 10)
                .endFill()
            ));
            s_normal.parentGroup = normalGroup;

            var s = new PIXI.Container();
            s.addChild(s_diffuse, s_normal);
            scene.addChild(s);
            s.x = station.x;
            s.y = station.y;
            scene.addChild(s);
            s.idx = idx;
            route_stations.push(s);

            const light = new PIXI.lights.PointLight(0xa6fd29, 0.5, 100);
            light.lightHeight = 0.005;
            light.x = station.x;
            light.y = station.y;

            // light.falloff = [-100, 1000, 0];
            scene.addChild(light);
        }
    });

    let player = Player(scene, 0x55ffe1);
    player.x = 420;
    player.y = 200;

    let trams = [
        Tram(scene, stations, 25),
        Tram(scene, stations, 8),
        Tram(scene, stations, 15),
    ];

    let spawn = () => {
        console.log("spawn");
        let man = Man(scene, 0xfafad2);
        let station = stations[Math.floor(getRandomArbitrary(0, stations.length))];
        let next_station = stations[station.next[station.state]];

        man.x = station.x + (
            next_station.x - station.x
        ) * getRandomArbitrary(0, 1);
        man.y = station.y + (
            next_station.y - station.y
        ) * getRandomArbitrary(0, 1);

        mans.push(man);

        murders += 1;
        statistics.text  = "kill " + murders + " to win";

        setTimeout(spawn, getRandomArbitrary(3000, 10000));
    };

    /*
    {
        let message = new Text("Game", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }
    */
    let changing = null;

    scene.update = (delta, now) => {
        player.update(delta, now);
        trams.forEach((tram, idx) => {
            if(hitTestRectangle(player, tram)) {
                console.log("hit", idx);
                enable_glitch();
                player.x = getRandomArbitrary(100, pixi.screen.width - 100);
                player.y = getRandomArbitrary(100, pixi.screen.height - 100);
            }
            mans.forEach((man, idx) => {
                if(hitTestRectangle(man, tram) && man.alive) {
                    console.log("kill1");
                    man.kill();
                    let _kill_sound = kill_sound.cloneNode();
                    _kill_sound.play();
                    murders -= 1;
                    statistics.text  = "kill " + murders + " to win";
                }
            });
            tram.update(delta, now)
        });
        route_stations.forEach(station => {
            if(hitTestRectangle(player, station)) {
                if(!changing) {
                    console.log("change station:", station.idx);
                    station.rotation += Math.PI;
                    stations[station.idx].state ^= 1;
                    changing = true;
                    semaphore_sound.play();
                }
            }
        });

        if(!route_stations.some(station => hitTestRectangle(player, station))) {
            changing = false;
        }

        mans.forEach((man, idx) => {
            man.update();
            if(!man.alive && !man.kill_mode) {
                mans.splice(idx, 1);
            }
        });

        if(murders === 0) {
            select_scene(win_scene);
        }
    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                select_scene(intro_scene);
            }
        }

        if(isPress && (key === 39 || key === 68)) {
            player.vr = 0.1;
        }
        if(isPress && (key === 37 || key === 65)) {
            player.vr = -0.1;
        }
        if(!isPress && (key === 39 || key === 37 || key === 68 || key === 65)) {
            player.vr = 0;
        }

        if(isPress && (key === 40 || key === 83)) {
            player.v = 6;
        }
        if(isPress && (key === 38 || key === 87)) {
            player.v = -6;
        }
        if(!isPress && (key === 38 || key === 40 || key === 83 || key === 87)) {
            player.v = 0;
        }
    };

    scene.select = () => {
        console.log("select game scene");
        setTimeout(spawn, getRandomArbitrary(2000, 10000));
        mans.forEach(man => scene.removeChild(man));

        player.vr = 0;
        player.v = 0;

        murders = 7;

        mans = [
            {x: 699, y: 125},
            {x: 724, y: 125},
            {x: 757, y: 130},
            {x: 732, y: 26},
            {x: 558, y: 416-20},
            {x: 527, y: 490-20},
            {x: 492, y: 500-20},
            {x: 452, y: 515-20},
        ].map(coord => {
            let man = Man(scene, 0xfafad2);
            man.x = coord.x;
            man.y = coord.y;
            return man;
        });


    };

    return scene;
}