function setup(){

  const $btn = $('#play');
  const $reset = $('#reset');
  const $first = $('#first');
  const $timer = $('.timer');
  const $scoreboard = $('.scoreboard');
  const $tiles = $('.tile');
  const $lives = $('.lives');
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
    }, 31000);
    highlightTiles();
    ($btn).hide();
  }

  function restart() {
    ($tiles).show();
    ($btn).show();
    lives = 5;
    $lives.html(lives);
    score = 0;
    $scoreboard.html(score);
    time = 30;
    $timer.html(time);
  }

  // function toggleDiv() {
  //     setTimeout(function () {
  //         $("#myDiv").hide();
  //         setTimeout(function () {
  //             $("#myDiv").show();
  //             toggleDiv();
  //         }, 30000);
  //     }, 10000);
  // }
  // toggleDiv();


// function buttonShow() {
//   setTimeout(function() {
//     ($btn).show()
//   } ,4000);
// }

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

      if(score <= 4) {
        moveTimer = setTimeout(function() {
          $randomTileTwo.removeClass('wrongTarget');
          $randomTile.removeClass('active');
          highlightTiles();
        }, 1000);

    } else if(score >= 5) {
      moveTimer = setTimeout(function() {
        $randomTileTwo.removeClass('wrongTarget');
        $randomTile.removeClass('active');
        highlightTiles();
      }, 600);

    } else if(score > 10) {
      moveTimer = setTimeout(function() {
        $randomTileTwo.removeClass('wrongTarget');
        $randomTile.removeClass('active');
        highlightTiles();
      }, 300);
    }

      gameInPlay = true;

      gameOver();
      timesUp();
    }
  }

  function stopTimer() {
    clearInterval(timerId);
    $tiles.removeClass('wrongTarget active');

    ($tiles).hide();
    ($btn).hide();
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

  $btn.on('click', timer);
  $reset.on('click', restart);
}
$(setup);
