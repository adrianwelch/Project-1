function setup(){

  // const $gameboard = $('.gameboard');
  const $btn = $('button');
  const $first = $('#first');
  const $timer = $('.timer');
  const $scoreboard = $('.scoreboard');
  const $tiles = $('.tile');
  const $lives = $('.lives');
  // var playing = false;
  let addClass = null;
  let wrongClass = null;
  let timerId = null;
  let moveTimer = null;
  let gameInPlay = true;


  let score = 0;
  let time = 30;
  let lives = 5;
  $lives.html(lives);
  $scoreboard.html(score);


  function timer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
    }, 30000);
    highlightTiles();
  }





  function highlightTiles() {
    var target = Math.floor(Math.random() * 14);
    var $randomTile = $tiles.eq(target);

    var wrongTarget = Math.floor(Math.random() * 14);
    var $randomTileTwo = $tiles.eq(wrongTarget);

    if($randomTile[0] === $randomTileTwo[0]) {
      highlightTiles();
    } else {
      $randomTile.addClass('active');
      $randomTileTwo.addClass('wrongTarget');

      moveTimer = setTimeout(function() {
        $randomTileTwo.removeClass('wrongTarget');
        $randomTile.removeClass('active');
        highlightTiles();
      }, 3000);

      gameInPlay = true;

      gameOver();
    }

  }

  function stopTimer() {
    clearInterval(timerId);
  }

  function gameOver() {
    if (lives === 0) {
      console.log(timerId);
      console.log($tiles);
      stopTimer();
      $tiles.removeClass('wrongTarget active');
      score = 0;
      lives = 5;
      $lives.html(lives);
      gameInPlay = false;
    }
  }



  //Function for when correct/incorrect clicked
  $tiles.on('click', (e) => {
    // var prevScore = score;
    if (gameInPlay) {
      gameInPlay = false;
      clearTimeout(moveTimer);
      console.log('gameInPlay is:', gameInPlay);
      const $tile = $(e.target);
      if($tile.hasClass('active')) {
        score++;
        $tiles.removeClass('active wrongTarget');
        $scoreboard.html(score);
      } else {
        // noClick();
        lives--;
        $lives.html(lives);
        $tiles.removeClass('active wrongTarget');
        // gameOver();
      }
      setTimeout(highlightTiles, 500);
    }
  }


);







  $btn.on('click', timer);


















  // $second.on('click',)
  // $third.on('click',)
  // $fourth.on('click',)
  // $fifth.on('click',)
  // $sixth.on('click',)
  // $seventh.on('click',)
  // $eighth.on('click',)
  // $ninth.on('click',)
  // $tenth.on('click',)
  // $eleventh.on('click',)
  // $twelfth.on('click',)
  // $thirteenth.on('click',)
  // $fourteenth.on('click',)
  // $fifteenth.on('click',)




}
$(setup);
