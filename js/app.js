function setup(){

  const $playBtn = $('#homeBtn');
  const $gameboard = $('.gameboard');
  const $btn = $('#play');
  const $reset = $('#reset');
  const $first = $('#first');
  const $timer = $('.timer');
  const $scoreboard = $('.scoreboard');
  const $tiles = $('.tile');
  const $lives = $('.lives');
  const $active = $('.active');
  const $wrongTarget = $('.wrongTarget')
  let addClass = null;
  let wrongClass = null;
  let timerId = null;
  let moveTimer = null;
  let gameInPlay = true;
  let delay = 1000;

  let score = 0;
  let time = 30;
  let lives = 5;
  $lives.html(lives);
  $scoreboard.html(score);

  $playBtn.click(function() {
    $('html, body').animate({
      scrollTop: $gameboard.offset().top
    }, 2000);
  });

  function timer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);

      if(time === 0) {
        restart();
      }
    }, 1000);

    highlightTiles();
    $btn.hide();
  }

  function restart() {
    clearInterval(timerId);
    clearInterval(moveTimer);
    $tiles
      .show()
      .removeClass('active wrongTarget');
    $btn.show();
    lives = 5;
    $lives.html(lives);
    score = 0;
    $scoreboard.html(score);
    time = 30;
    $timer.html(time);
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

      if(score <= 4) delay = 1000;
      else if(score > 10) delay = 300;
      else if(score >= 5) delay = 600;

      moveTimer = setTimeout(function() {
        $randomTileTwo.removeClass('wrongTarget');
        $randomTile.removeClass('active');
        highlightTiles();
      }, delay);

      gameInPlay = true;

      gameOver();
      timesUp();
    }
  }

  function stopTimer() {
    clearInterval(timerId);
    $tiles.removeClass('wrongTarget active');

    $tiles.hide();
    $btn.hide();
  }

  function gameOver() {
    if (lives === 0) {
      stopTimer();
    }
  }

  function timesUp() {
    if (time === 0) {
      stopTimer();
      $tiles.removeClass('wrongTarget active');
      ($tiles).off('click');
    }
  }

  //Function for when correct/incorrect clicked
  $tiles.on('click', (e) => {
    // var prevScore = score;
    if (gameInPlay) {
      gameInPlay = false;
      clearTimeout(moveTimer);
      const $tile = $(e.target);
      if($tile.hasClass('active')) {
        score++;
        $tiles.removeClass('active wrongTarget');
        $scoreboard.html(score);
      } else {
        lives--;
        $lives.html(lives);
        $tiles.removeClass('active wrongTarget');
      }

      if (score <= 4) {
        setTimeout(highlightTiles, 600);
      } else if (score >= 5) {
        setTimeout(highlightTiles, 400);
      } else if (score > 10)  {
        setTimeout(highlightTiles, 200);
      }
    }
  }


);

  $playBtn.on('click', play);
  $btn.on('click', timer);
  $reset.on('click', restart);
}
$(setup);
