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

  let score = 0;
  let time = 30;
  let lives = 5;
  $lives.html(lives);
  $scoreboard.html(score);


  function timer() {
    const timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
    }, 30000);
    highlightTiles();
  }

  let timerId = null;

  function highlightTiles() {
    clearTimeout(timerId);

    var target = Math.floor(Math.random() * 14);
    var $randomTile = $tiles.eq(target);

    var wrongTarget = Math.floor(Math.random() * 14);
    var $randomTileTwo = $tiles.eq(wrongTarget);

    if($randomTile[0] === $randomTileTwo[0]) {
      highlightTiles();
    }
    $randomTile.addClass('active');
    $randomTileTwo.addClass('wrongTarget');

    timerId = setTimeout(function() {
      $randomTileTwo.removeClass('wrongTarget');
      $randomTile.removeClass('active');
      setTimeout(highlightTiles, 1000);
    }, 3000);
  }

  function gameOver() {
    if (lives === 0) {
      $tiles.removeClass('wrongTarget');
      $tiles.removeClass('active');
      alert('gameover');
      score = 0;
      lives = 5;
      $lives.html(lives);
    }
  }


  //Function for when correct/incorrect clicked
  $tiles.on('click', (e) => {
    const $tile = $(e.target);

    if($tile.hasClass('active')) {
      score++;
      $tiles.removeClass('active wrongTarget');
      $scoreboard.html(score);
    } else {
      lives--;
      $lives.html(lives);
      $tiles.removeClass('active wrongTarget');
      gameOver();
    }

    setTimeout(highlightTiles, 500);
  });







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
