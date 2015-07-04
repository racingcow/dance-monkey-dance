(function() {
  
  'use strict';
    
  var cursorKeys,
      startTime;
  
  function Game() {}

  Game.prototype = {
    
    create: function () {
      this.advancedTiming = true;
      this.add.audio('song1').play();
      startTime = this.time.now;
      console.log('start time is ' + moment(startTime).toISOString());
      this.add.sprite(80, 80, 'monkey');
      
      var leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    var rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      var downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      
      leftKey.onDown.add(this.leftHandler, this);
      
    },

    update: function () {
        
    },
    
    leftHandler: function() {
      var elapsed = this.time.elapsedSince(startTime);
      console.log('leftHandler pressed at ' + elapsed.toString());
    }
  };

  window['dance-monkey-dance'] = window['dance-monkey-dance'] || {};
  window['dance-monkey-dance'].Game = Game;
}());
