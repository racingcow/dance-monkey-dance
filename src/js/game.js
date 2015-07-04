(function() {
  
  'use strict';
    
  var cursorKeys,
      startTime, 
      timeText,
      nextText,
      balloon,
      leftMargin = 30,
      bottomRow = 375,
      tolerance = 2000,
      songMap = [{
        time: 10000,
        keyCode: Phaser.Keyboard.LEFT
      },{
        time: 20000,
        keyCode: Phaser.Keyboard.RIGHT
      }];
  
  function Game() {}

  Game.prototype = {
    
    create: function () {
      this.advancedTiming = true;
      //this.add.audio('song1').play();
      startTime = this.time.now;
      console.log('start time is ' + startTime.toString());
      
      var monkey = this.add.sprite(leftMargin + 80, bottomRow, 'monkey');
      monkey.scale.x = -1;
      
      balloon = new Phaser.Polygon();
      balloon.setTo([
        new Phaser.Point(110, bottomRow + 30),
        new Phaser.Point(150, bottomRow - 10),
        new Phaser.Point(150, bottomRow - 20),
        new Phaser.Point(600, bottomRow - 20),
        new Phaser.Point(600, bottomRow + 20),
        new Phaser.Point(150, bottomRow + 20),
        new Phaser.Point(150, bottomRow + 10),
      ]);
      var graphics = this.add.graphics(0, 0);
      graphics.beginFill(0xffffff);
      graphics.drawPolygon(balloon.points);
      graphics.endFill();
      
      this.bindKey(Phaser.Keyboard.LEFT);
	    this.bindKey(Phaser.Keyboard.RIGHT);
      this.bindKey(Phaser.Keyboard.UP);
      this.bindKey(Phaser.Keyboard.DOWN);
      
      this.add.text(leftMargin + 125, bottomRow + 40, 'time:', {
        font: '36px Arial',
        fill: '#ffffff'
      });
      timeText = this.add.text(leftMargin + 225, bottomRow + 40, '0', {
        font: '36px Arial',
        fill: '#ffffff'
      });
      
      this.add.text(leftMargin + 375, bottomRow + 40, 'next:', {
        font: '36px Arial',
        fill: '#ffffff'
      });
      nextText = this.add.text(leftMargin + 465, bottomRow + 40, '0', {
        font: '36px Arial',
        fill: '#ffffff'
      });
      
    },
    
    bindKey: function(keyCode) {
      var key = this.input.keyboard.addKey(keyCode);
      key.onDown.add(this.keyHandler, this);
    },

    update: function () {
      timeText.setText(this.time.now.toString());
      nextText.setText(songMap.length ? songMap[0].time.toString() : '');
    },
    
    keyHandler: function(data) {
      
      if (!songMap.length) return;
      var elapsed = this.time.now - startTime;      
      var next = songMap.shift();
      
      if (data.keyCode === next.keyCode) {
        console.log('you pressed the correct key!');
      }
      else {
        console.log('wrong key (expected ' + next.keyCode + ')');
      }
      
      if ((elapsed <= (next.time + (tolerance / 2))) && (elapsed >= (next.time - (tolerance / 2)))) {
          console.log('your timing is great');
      }
      else {
        console.log('your timing is off - elapsed = ' + elapsed.toString() + ', expected = ' + next.time.toString());
      }
    }
  };

  window['dance-monkey-dance'] = window['dance-monkey-dance'] || {};
  window['dance-monkey-dance'].Game = Game;
}());
