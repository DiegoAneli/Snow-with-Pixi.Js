
var app = new PIXI.Application({        
	resolution: 1.3,       
	transparent: true
  });
  document.body.appendChild(app.view);

//Background
var bg = PIXI.Sprite.fromImage('img/neve/Background.png');
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);


//Canvas particles texture
var textureCanvas = document.createElement('canvas');
document.body.append(textureCanvas);
textureCanvas.width = textureCanvas.height = 16;
var textureContext = textureCanvas.getContext('2d');
textureContext.fillStyle = '#ffffff';
textureContext.beginPath();
textureContext.ellipse(8, 8, 4, 4, 0, 0, 6.28);
textureContext.fill(); 

  

var sprites = new PIXI.particles.ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true
});
app.stage.addChild(sprites);

// create an array to store all the sprites
var maggots = [];


function nevicataLeggera() {

    var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 250 : 10;

    for (var i = 0; i < totalSprites; i++) {
        // create a new Sprite
        var dude = PIXI.Sprite.from(textureCanvas);
    
        // set the anchor point so the texture is centerd on the sprite
        dude.anchor.set(0.2);
    
        // different maggots, different sizes
        dude.scale.set(0.9 + Math.random() * 0.2);
        
        // scatter them all
        dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;

        dude.vy = Math.random() * .5 + .1;

        dude.scale.x = dude.scale.y = Math.random() + 0.10;
    
        // create a random direction in radians
        dude.direction = 0;
    
        // this number will be used to modify the direction of the sprite over time
        dude.turningSpeed = Math.random() - 0.1;
    
        // create a random speed between 0 - 2, and these maggots are slooww
        dude.speed = (2 + Math.random() * 2) * 1.2; //PARAMETRO PER INTENSITA'
    
        dude.offset = Math.random() * 100;
    
        // finally we push the dude into the maggots array so it it can be easily accessed later
        maggots.push(dude);
    
        sprites.addChild(dude);
    }
	
    

}

function nevicataIntensa() {

    var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 500 : 10;

    for (var i = 0; i < totalSprites; i++) {
        // create a new Sprite
        var dude = PIXI.Sprite.from(textureCanvas);
    
        // set the anchor point so the texture is centerd on the sprite
        dude.anchor.set(0.2);
    
        // different maggots, different sizes
        dude.scale.set(0.9 + Math.random() * 0.2);
    
        // scatter them all
        dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;
        dude.vy = Math.random() * .5 + .1;
        dude.scale.x = dude.scale.y = Math.random() + 0.10;
        
        // create a random direction in radians
        dude.direction = -0.2;
    
        // this number will be used to modify the direction of the sprite over time
        dude.turningSpeed = Math.random() - 0.1;
    
        // create a random speed between 0 - 2, and these maggots are slooww
        dude.speed = (2 + Math.random() * 2) * 3.2; //PARAMETRO PER INTENSITA'
    
        dude.offset = Math.random() * 100;
    
        // finally we push the dude into the maggots array so it it can be easily accessed later
        maggots.push(dude);
    
        sprites.addChild(dude);
    }
	

}

function tormentaDiNeve() {

    var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 1000 : 10;

    for (var i = 0; i < totalSprites; i++) {
        // create a new Sprite
        var dude = PIXI.Sprite.from(textureCanvas);
    
        // set the anchor point so the texture is centerd on the sprite
        dude.anchor.set(0.2);
    
        // different maggots, different sizes
        dude.scale.set(0.9 + Math.random() * 0.2);
    
        // scatter them all
        dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;    
        dude.tint = Math.random() * 0x808080;
        dude.vy = Math.random() * .5 + .1;

        dude.scale.x = dude.scale.y = Math.random() + 0.10;
      
        // create a random direction in radians
        dude.direction = -0.5;
    
        // this number will be used to modify the direction of the sprite over time
        dude.turningSpeed = Math.random() - 0.1;
    
        // create a random speed between 0 - 2, and these maggots are slooww
        dude.speed = (2 + Math.random() * 2) * 5.2; //PARAMETRO PER INTENSITA'
    
        dude.offset = Math.random() * 100;
    
        // finally we push the dude into the maggots array so it it can be easily accessed later
        maggots.push(dude);
    
        sprites.addChild(dude);
    }
	

}



// create a bounding box box for the little maggots
var dudeBoundsPadding = 200;
var dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2
);



var tick = 0;

app.ticker.add(function() {
    // iterate through the sprites and update their position
    for (var i = 0; i < maggots.length; i++) {
        var dude = maggots[i];
        
        dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
        
        //dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + Math.PI;
        dude.y += dude.vy;
        
        // wrap the maggots
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }

    // increment the ticker
    tick += 0.1;
});
