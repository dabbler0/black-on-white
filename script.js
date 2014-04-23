(function() {
  var game;

  game = new Phaser.Game(800, 600, Phaser.AUTO, 'black-on-white', (function() {
    var adviceText, blackDrops, blackSlider, cursors, gameOver, score, scoreText, stateText, timer, whiteDrops, whiteSlider;
    whiteDrops = blackDrops = whiteSlider = blackSlider = cursors = stateText = scoreText = blackDrops = timer = adviceText = null;
    score = 0;
    gameOver = false;
    return {
      preload: function() {
        this.load.image('white-drop', 'assets/white-drop.png');
        this.load.image('black-drop', 'assets/black-drop.png');
        this.load.image('white-bin', 'assets/white-bin.png');
        return this.load.image('black-bin', 'assets/black-bin.png');
      },
      create: function() {
        this.game.stage.backgroundColor = '#888888';
        this.physics.startSystem(Phaser.Physics.ARCADE);
        whiteDrops = this.add.group();
        whiteDrops.enableBody = true;
        whiteDrops.physicsBodyType = Phaser.Physics.ARCADE;
        blackDrops = this.add.group();
        blackDrops.enableBody = true;
        blackDrops.physicsBodyType = Phaser.Physics.ARCADE;
        whiteSlider = this.add.sprite(this.world.centerX - 102.5, 500, 'white-bin');
        blackSlider = this.add.sprite(this.world.centerX - 102.5, 530, 'black-bin');
        this.physics.enable(whiteSlider, Phaser.Physics.ARCADE);
        this.physics.enable(blackSlider, Phaser.Physics.ARCADE);
        whiteSlider.body.collideWorldBounds = true;
        whiteSlider.body.bounce.set(1);
        whiteSlider.body.immovable = true;
        blackSlider.body.collideWorldBounds = true;
        blackSlider.body.bounce.set(1);
        blackSlider.body.immovable = true;
        stateText = this.add.text(this.world.centerX, this.world.centerY, ' ', {
          font: '84px Arial',
          fill: '#000'
        });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
        adviceText = this.add.text(this.world.centerX, this.world.centerY + 84, ' ', {
          font: '32px Arial',
          fill: '#000'
        });
        adviceText.anchor.setTo(0.5, 0.5);
        adviceText.visible = false;
        scoreText = this.add.text(10, 10, '0', {
          font: '34px Arial',
          fill: '#000'
        });
        cursors = this.input.keyboard.createCursorKeys();
        return timer = this.game.time.events.loop(500, (function() {
          var drop;
          if (Math.random() > 0.5) {
            drop = whiteDrops.create(Math.random() * 800, 0, 'white-drop');
          } else {
            drop = blackDrops.create(Math.random() * 800, 0, 'black-drop');
          }
          drop.body.velocity.setTo(0, Math.random() * 100 + 100 * Math.log(2 + score));
          return drop.outOfBoundsKill = true;
        }), this);
      },
      update: function() {
        if (!gameOver) {
          whiteSlider.body.velocity.setTo(0, 0);
          blackSlider.body.velocity.setTo(0, 0);
          if (cursors.left.isDown) {
            whiteSlider.body.velocity.x = -400;
            blackSlider.body.velocity.x = 400;
          } else if (cursors.right.isDown) {
            whiteSlider.body.velocity.x = 400;
            blackSlider.body.velocity.x = -400;
          }
          this.physics.arcade.overlap(whiteDrops, whiteSlider, (function(slider, drop) {
            score += 1;
            scoreText.text = score;
            return drop.kill();
          }), null, this);
          this.physics.arcade.overlap(whiteDrops, blackSlider, ((function(_this) {
            return function(slider, drop) {
              stateText.text = 'You lose.';
              stateText.visible = true;
              adviceText.text = 'Any key to restart.';
              adviceText.visible = true;
              _this.time.events.remove(timer);
              gameOver = true;
              whiteSlider.body.velocity.setTo(0, 0);
              blackSlider.body.velocity.setTo(0, 0);
              whiteDrops.setAll('body.velocity.y', 0);
              blackDrops.setAll('body.velocity.y', 0);
              return game.input.keyboard.onDownCallback = function() {
                return _this.restart();
              };
            };
          })(this)), null, this);
          this.physics.arcade.overlap(blackDrops, blackSlider, (function(slider, drop) {
            score += 1;
            scoreText.text = score;
            return drop.kill();
          }), null, this);
          return this.physics.arcade.overlap(blackDrops, whiteSlider, ((function(_this) {
            return function(slider, drop) {
              stateText.text = 'You lose.';
              stateText.visible = true;
              adviceText.text = 'Any key to restart.';
              adviceText.visible = true;
              _this.time.events.remove(timer);
              gameOver = true;
              whiteSlider.body.velocity.setTo(0, 0);
              blackSlider.body.velocity.setTo(0, 0);
              whiteDrops.setAll('body.velocity.y', 0);
              blackDrops.setAll('body.velocity.y', 0);
              return game.input.keyboard.onDownCallback = function() {
                return _this.restart();
              };
            };
          })(this)), null, this);
        }
      },
      restart: function() {
        game.input.keyboard.onDownCallback = function() {};
        stateText.visible = false;
        adviceText.visible = false;
        score = 0;
        scoreText.text = '0';
        whiteSlider.reset(this.world.centerX - 102.5, 500, 0);
        blackSlider.reset(this.world.centerX - 102.5, 530, 0);
        whiteDrops.callAll('kill');
        blackDrops.callAll('kill');
        timer = this.game.time.events.loop(500, (function() {
          var drop;
          if (Math.random() > 0.5) {
            drop = whiteDrops.create(Math.random() * 800, 0, 'white-drop');
          } else {
            drop = blackDrops.create(Math.random() * 800, 0, 'black-drop');
          }
          drop.body.velocity.setTo(0, Math.random() * 100 + 100 * Math.log(2 + score));
          return drop.outOfBoundsKill = true;
        }), this);
        return gameOver = false;
      }
    };
  }));

}).call(this);

//# sourceMappingURL=script.js.map
