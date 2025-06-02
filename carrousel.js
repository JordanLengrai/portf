function moveToSelected(element) {

    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }
  
    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
  
    $(selected).removeClass().addClass("selected");
  
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
  
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
  
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
    
      
    var projectId = $(selected).attr('id');
    updateBackground(projectId);
  }
  
  
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: 
          moveToSelected('prev');
          break;
  
          case 39: 
          moveToSelected('next');
          break;
  
          default: return;
      }
      e.preventDefault();
  });
  
  $('#carousel > div').click(function() {
    moveToSelected($(this));
  });
  
  $('#prev').click(function() {
    moveToSelected('prev');
  });
  
  $('#next').click(function() {
    moveToSelected('next');
  });
  
  
  function updateBackground(projectId) {
    switch(projectId) {
      case 'demonsoul-game':
        $('body').css('background-image','url(newimages/bg_mininuix.png)');
        break;
      case 'dirt-game':
        $('body').css('background-image','url(newimages/bg_agario.png)');
        break;
      case 'sackboy-game':
        $('body').css('background-image','url(newimages/bg_snake.png)');
        break;
      case 'spiderman-game':
        $('body').css('background-image','url(newimages/bg_2048.png)');
        break;
      case 'watchdogs-game':
        $('body').css('background-image','url(newimages/bg_pacman.png)');
        break;
      case 'yakuza-game':
        $('body').css('background-image','url(newimages/bg_pishing.png)');
        break;
      case 'chatbot-game':
        $('body').css('background-image','url(newimages/bg_chatbot.png)');
        break;
      case 'auction-game':
        $('body').css('background-image','url(newimages/bg_auction.png)');
        break;
      case 'bigmatch-game':
        $('body').css('background-image','url(newimages/bg_bigmatch.png)');
        break;
      case 'lexer-game':
        $('body').css('background-image','url(newimages/bg_lexer.png)');
        break;
    }
  }
  
  
  $(document).ready(function() {
    var initialProjectId = $('.selected').attr('id');
    updateBackground(initialProjectId);
  });
  