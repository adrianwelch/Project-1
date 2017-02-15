function setup(){

  const $playBtn = $('#homeBtn');
  const $lastPage = $('.lastPage');
  const $home = $('#backHome');
  const $playAgain = $('#playAgain')
  const $gameboard = $('.gameboard');
  const $btn = $('#play');
  const $reset = $('#reset');
  const $first = $('#first');
  const $timer = $('.timer');
  const $h1 = $('h1');
  const $scoreboard = $('.scoreboard');
  const $score = $('.score');
  const $tiles = $('.tile');
  const $livestxt = $('.livestxt');
  const $lives = $('.lives');
  const $active = $('.active');
  const $wrongTarget = $('.wrongTarget');
  let addClass = null;
  let wrongClass = null;
  let timerId = null;
  let moveTimer = null;
  let gameInPlay = true;
  let delay = 1000;
  const audio = $('#crowd');

  let score = 0;
  let time = 30;
  let lives = 5;
  $livestxt.html(lives);
  $score.html(score);

  function play() {
    $('html, body').animate({
      scrollTop: $gameboard.offset().top
    }, 2000);
  }

  function lastPage() {
    $('html, body').animate({
      scrollTop: $lastPage.offset().top
    }, 2000);
  }

  // GOES TO TOP BUT GOES BACK DOWN
  function home() {
    $('html, body').animate({scrollTop : 0},800);
  }



  function timer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);

      if(time === 0) {
        lastPage();
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
    $livestxt.html(lives);
    score = 0;
    $score.html(score);
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
      $tiles.removeClass('shake');
      $randomTile.addClass('active');
      $randomTileTwo.addClass('wrongTarget');

      // time between tile and next appearing without click
      if(score <= 4) delay = 2000;
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
      lastPage();
      audioPlay();
    }
  }

  function audioPlay() {
    audio.play();
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
    $(e.target).addClass('shake');
    // var prevScore = score;
    if (gameInPlay) {
      gameInPlay = false;
      clearTimeout(moveTimer);
      const $tile = $(e.target);
      if($tile.hasClass('active')) {
        score++;
        $tiles.removeClass('active wrongTarget');
        $score.html(score);
      } else {
        lives--;
        $livestxt.html(lives);
        $tiles.removeClass('active wrongTarget');
      }

      // time from clicking to next tile
      if (score <= 4) {
        setTimeout(highlightTiles, 1000);
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
  $home.on('click', home);
  $playAgain.on('click', play);
}
$(setup);
