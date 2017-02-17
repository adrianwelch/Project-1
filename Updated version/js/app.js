$(() => {

  const $playBtn = $('#takeToMain');
  const $lastPage = $('#lastPage');
  const $home = $('#backHome');
  const $homePage = $('#welcome');
  const $playAgain = $('#playAgain');
  const $gameboard = $('#goal');
  const $btn = $('#play');
  const $reset = $('#reset');
  const $timer = $('.timer');
  const $score = $('.score');
  const $tiles = $('.tile');
  const $livestxt = $('.livestxt');
  const $ready = $('.ready');
  const $goal = $('#goal div');
  const $ball = $('#ball')
  // sounds
  const $cl = $('audio').get(0);
  const $footballCrowd = $('audio').get(1);
  const $gameOverAud = $('audio').get(2);

  let timerId = null;
  let moveTimer = null;
  let gameInPlay = true;
  let gameIsOver = false;
  let delay = 1000;
  let score = 0;
  let time = 30;
  let lives = 5;
  $livestxt.html(lives);
  $score.html(score);

  $goal.on('click', (e) => {
    const pos = $(e.target).position();
    if ($(e.target).hasClass('active') || $(e.target).hasClass('wrongTarget')) {
      $ball.animate(pos);

      setTimeout(() => {
        $ball.removeAttr('style');
      }, 500);
    }
  });

  // takes you from homepage to main game page
  function play() {
    pauseMusic();
    // $ready.show();
    // $btn.show();
    $('html, body').animate({
      scrollTop: $gameboard.offset().top
    }, 2000);
  }
// goes to bottom page
  function lastPage() {
    console.log('lastpage');
    $('html, body').animate({
      scrollTop: $lastPage.offset().top
    }, 2000);
  }
// goes to home page
  function home() {
    $('html, body').animate({
      scrollTop: $homePage.offset().top
    }, 800);
  }

// timer goes off and runs highlight tiles
  function timer() {
    footballCrowd();
    timerId = setInterval(() => {
      time--;
      $timer.html(time);

      if(time === 0) {
        restart();
        lastPage();
      }
    }, 1000);
    highlightTiles();
  }

// resets timer, removes targets, lives = 5, score = 0
  function restart() {
    clearInterval(timerId);
    clearInterval(moveTimer);
    gameIsOver = false;
    $tiles
      .show()
      .removeClass('active wrongTarget');
    $ready.show();
    $btn.show();
    lives = 5;
    $livestxt.html(lives);
    score = 0;
    $score.html(score);
    time = 30;
    $timer.html(time);
  }

// 2 random targets generated and assigned either right or wrong class (target image)
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
      else if(score > 15) delay = 400;
      else if(score > 10) delay = 600;
      else if(score >= 5) delay = 800;

      if(!gameIsOver) {
        moveTimer = setTimeout(function() {
          $randomTileTwo.removeClass('wrongTarget');
          $randomTile.removeClass('active');
          highlightTiles();
        }, delay);
      }

      gameInPlay = true;

      gameOver();
      timesUp();
    }
  }

  function stopTimer() {
    clearInterval(timerId);
    $tiles.removeClass('wrongTarget active');
  }

  function gameOver() {
    if (lives === 0) {
      pauseCrowd();
      gameOverAudio();
      gameIsOver = true;
      stopTimer();
      lastPage();
    }
  }
  // sound functions
  function introMusic(){
    $cl.play();
  }
  function pauseMusic(){
    $cl.pause();
  }
  function footballCrowd() {
    $footballCrowd.play();
  }
  function pauseCrowd(){
    $footballCrowd.pause();
  }
  function gameOverAudio() {
    $gameOverAud.play();
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
        setTimeout(highlightTiles, 500);
      } else if (score > 10)  {
        setTimeout(highlightTiles, 300);
      }
    }
  }

  );
  introMusic();
  $playBtn.on('click', play);
  $btn.on('click', timer);
  $reset.on('click', restart);
  $home.on('click', home);
  $playAgain.on('click', play);
}

);
