game = new Phaser.Game 800, 600, Phaser.AUTO, 'black-on-white', (->
  whiteDrops = blackDrops = whiteSlider = blackSlider = cursors = stateText = scoreText = blackDrops = timer = adviceText = null
  score = 0
  gameOver = false
  {
    preload: ->
      @load.image 'white-drop', 'assets/white-drop.png'
      @load.image 'black-drop', 'assets/black-drop.png'
      @load.image 'white-bin', 'assets/white-bin.png'
      @load.image 'black-bin', 'assets/black-bin.png'

    create: ->
      @game.stage.backgroundColor = '#888888'
      @physics.startSystem Phaser.Physics.ARCADE
      
      whiteDrops = @add.group()
      whiteDrops.enableBody = true
      whiteDrops.physicsBodyType = Phaser.Physics.ARCADE

      blackDrops = @add.group()
      blackDrops.enableBody = true
      blackDrops.physicsBodyType = Phaser.Physics.ARCADE

      whiteSlider = @add.sprite @world.centerX - 102.5, 500, 'white-bin'
      blackSlider = @add.sprite @world.centerX - 102.5, 530, 'black-bin'

      @physics.enable whiteSlider, Phaser.Physics.ARCADE
      @physics.enable blackSlider, Phaser.Physics.ARCADE

      whiteSlider.body.collideWorldBounds = true
      whiteSlider.body.bounce.set 1
      whiteSlider.body.immovable = true

      blackSlider.body.collideWorldBounds = true
      blackSlider.body.bounce.set 1
      blackSlider.body.immovable = true

      stateText = @add.text @world.centerX, @world.centerY, ' ', font: '84px Arial', fill: '#000'
      stateText.anchor.setTo 0.5, 0.5
      stateText.visible = false

      adviceText = @add.text @world.centerX, @world.centerY + 84, ' ', font: '32px Arial', fill: '#000'
      adviceText.anchor.setTo 0.5, 0.5
      adviceText.visible = false

      scoreText = @add.text 10, 10, '0', font: '34px Arial', fill: '#000'

      cursors = @input.keyboard.createCursorKeys()

      timer = @game.time.events.loop 500, (->
        if Math.random() > 0.5
          drop = whiteDrops.create Math.random() * 800, 0, 'white-drop'
        else
          drop = blackDrops.create Math.random() * 800, 0, 'black-drop'

        drop.body.velocity.setTo 0, Math.random() * 100 + 100 * Math.log 2 + score
        drop.outOfBoundsKill = true
      ), this

    update: ->
      unless gameOver
        whiteSlider.body.velocity.setTo 0, 0
        blackSlider.body.velocity.setTo 0, 0

        if cursors.left.isDown
          whiteSlider.body.velocity.x = -400
          blackSlider.body.velocity.x = 400
        else if cursors.right.isDown
          whiteSlider.body.velocity.x = 400
          blackSlider.body.velocity.x = -400

        @physics.arcade.overlap whiteDrops, whiteSlider, ((slider, drop)->
          score += 1
          scoreText.text = score
          drop.kill()
        ), null, this
        @physics.arcade.overlap whiteDrops, blackSlider, ((slider, drop) =>
          stateText.text = 'You lose.'
          stateText.visible = true

          adviceText.text = 'Any key to restart.'
          adviceText.visible = true
          
          @time.events.remove timer
          gameOver = true

          whiteSlider.body.velocity.setTo 0, 0
          blackSlider.body.velocity.setTo 0, 0

          whiteDrops.setAll 'body.velocity.y', 0
          blackDrops.setAll 'body.velocity.y', 0

          game.input.keyboard.onDownCallback = => @restart()
        ), null, this

        @physics.arcade.overlap blackDrops, blackSlider, ((slider, drop)->
          score += 1
          scoreText.text = score
          drop.kill()
        ), null, this
        @physics.arcade.overlap blackDrops, whiteSlider, ((slider, drop) =>
          stateText.text = 'You lose.'
          stateText.visible = true

          adviceText.text = 'Any key to restart.'
          adviceText.visible = true
          
          @time.events.remove timer
          gameOver = true

          whiteSlider.body.velocity.setTo 0, 0
          blackSlider.body.velocity.setTo 0, 0

          whiteDrops.setAll 'body.velocity.y', 0
          blackDrops.setAll 'body.velocity.y', 0

          game.input.keyboard.onDownCallback = => @restart()
        ), null, this

    restart: ->
      game.input.keyboard.onDownCallback = ->

      stateText.visible = false
      adviceText.visible = false

      score = 0
      scoreText.text = '0'

      whiteSlider.reset @world.centerX - 102.5, 500, 0
      blackSlider.reset @world.centerX - 102.5, 530, 0

      whiteDrops.callAll 'kill'
      blackDrops.callAll 'kill'

      timer = @game.time.events.loop 500, (->
        if Math.random() > 0.5
          drop = whiteDrops.create Math.random() * 800, 0, 'white-drop'
        else
          drop = blackDrops.create Math.random() * 800, 0, 'black-drop'

        drop.body.velocity.setTo 0, Math.random() * 100 + 100 * Math.log 2 + score
        drop.outOfBoundsKill = true
      ), this

      gameOver = false
  }
)
