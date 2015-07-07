(function(_) {
  
  'use strict';
    
  var startTime, 
      timeText,
      nextText,
      balloon,
      leftMargin = 30,
      bottomRow = 375,
      textOpts = {
        font: '24px Arial',
        fill: '#ffffff'
      },
      ratings = [{
        name: 'bad',
        points: 0,
        tolerance: 600000
      },{
        name: 'meh',
        points: 1,
        tolerance: 5000
      },{
        name: 'good',
        points: 3,
        tolerance: 3000
      },{
        name: 'great',
        points: 4,
        tolerance: 2000
      },{
        name: 'perfect',
        points: 5,
        tolerance: 1000
      }],
      songMap = [{
        time: 5000,
        keyCode: Phaser.Keyboard.UP
      },{
        time: 10000,
        keyCode: Phaser.Keyboard.DOWN
      },{
        time: 15000,
        keyCode: Phaser.Keyboard.UP
      },{
        time: 20000,
        keyCode: Phaser.Keyboard.DOWN
      },{
        time: 25000,
        keyCode: Phaser.Keyboard.LEFT
      },{
        time: 30000,
        keyCode: Phaser.Keyboard.RIGHT
      },{
        time: 35000,
        keyCode: Phaser.Keyboard.LEFT
      },{
        time: 40000,
        keyCode: Phaser.Keyboard.RIGHT
      },{
        time: 45000,
        keyCode: Phaser.Keyboard.B
      },{
        time: 50000,
        keyCode: Phaser.Keyboard.A
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
      
      this.add.text(leftMargin + 125, bottomRow + 40, 'time:', textOpts);
      timeText = this.add.text(leftMargin + 185, bottomRow + 40, '0', textOpts);
      
      this.add.text(leftMargin + 340, bottomRow + 40, 'next:', textOpts);
      nextText = this.add.text(leftMargin + 400, bottomRow + 40, '0', textOpts);
      
    },
    
    bindKey: function(keyCode) {
      var key = this.input.keyboard.addKey(keyCode);
      key.onDown.add(this.keyHandler, this);
    },

    update: function () {
      
      timeText.setText(this.time.now.toString());
      
      var elapsed = this.time.now - startTime;
      var next = _.chain(songMap)
       .filter(function(mapItem) {
         return mapItem.time > elapsed;
       })
       .first()
       .value();

      nextText.setText(next && next.time ? next.keyCode.toString() + ' @ ' + next.time.toString() : '');

    },
    
    keyHandler: function(data) {
      
      var elapsed = this.time.now - startTime;
      
      var map = songMap;
      var result = _.chain(ratings)
        .map(function(rating) {
        
          map = _.filter(map, function(mapItem) { //a little faster, perhaps
          
           var halfTolerance = rating.tolerance / 2,
               low = elapsed - halfTolerance,
               high = elapsed + halfTolerance;
          
           return (mapItem.time >= low) && (mapItem.time <= high) && (mapItem.keyCode === data.keyCode);
          });
          
          rating.hits = map;
          return rating;
        })
        .filter(function(rating) {
          return rating.hits && rating.hits.length;
        })
        .sortBy('tolerance')
        .first()
        .value();
        
      if (result) {
        console.log(result.name);
      }
      
    }

  }; 

  window['dance-monkey-dance'] = window['dance-monkey-dance'] || {};
  window['dance-monkey-dance'].Game = Game;
}(_));