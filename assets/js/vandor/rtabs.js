(function($) {
  $.fn.rTabs = function(options) {
    var defaultVal = {
      defaultShow: 0, //é»˜è®¤æ˜¾ç¤ºç¬¬å‡ ä¸ª
      prev: '#prev',
      next: '#next',
      btnClass: '.j-tab-nav' /*æŒ‰é’®çš„çˆ¶çº§Class*/,
      conClass: '.j-tab-con' /*å†…å®¹çš„çˆ¶çº§Class*/,
      bind: 'hover' /*äº‹ä»¶å‚æ•° click,hover*/,
      animation: '0' /*åŠ¨ç”»æ–¹å‘ left,up,fadein,0 ä¸ºæ— åŠ¨ç”»*/,
      speed: 300 /*åŠ¨ç”»è¿åŠ¨é€Ÿåº¦*/,
      delay: 200 /*Tabå»¶è¿Ÿé€Ÿåº¦*/,
      auto: true /*æ˜¯å¦å¼€å¯è‡ªåŠ¨è¿è¡Œ true,false*/,
      autoSpeed: 3000 /*è‡ªåŠ¨è¿è¡Œé€Ÿåº¦*/
    };

    //å…¨å±€å˜é‡
    var obj = $.extend(defaultVal, options),
      evt = obj.bind,
      btn = $(this).find(obj.btnClass),
      con = $(this).find(obj.conClass),
      prev = $(obj.prev),
      next = $(obj.next),
      anim = obj.animation,
      conWidth = con.width(),
      conHeight = con.height(),
      len = con.children().length,
      sw = len * conWidth,
      sh = len * conHeight,
      i = obj.defaultShow,
      len,
      t,
      timer;

    // æ ¹æ®é”šç‚¹æ˜¾ç¤ºå†…å®¹
    if (obj.defaultShow == true) {
      var hash = window.location.hash.slice(1);
      btn.children().each(function() {
        if (hash == $(this).attr('show-index')) {
          i = $(this).index();
          return false;
        }
        i = 0;
      });
    }

    return this.each(function() {
      //åˆ¤æ–­åŠ¨ç”»æ–¹å‘
      function judgeAnim() {
        var w = i * conWidth,
          h = i * conHeight;
        btn
          .children()
          .removeClass('current')
          .eq(i)
          .addClass('current');
        switch (anim) {
          case '0':
            con
              .children()
              .hide()
              .eq(i)
              .show();
            break;
          case 'left':
            con
              .css({ position: 'absolute', width: sw })
              .children()
              .css({ float: 'left', display: 'block' })
              .end()
              .stop()
              .animate({ left: -w }, obj.speed);
            break;
          case 'up':
            con
              .css({ position: 'absolute', height: sh })
              .children()
              .css({ display: 'block' })
              .end()
              .stop()
              .animate({ top: -h }, obj.speed);
            break;
          case 'fadein':
            con
              .children()
              .hide()
              .eq(i)
              .fadeIn();
            break;
        }
      }
      judgeAnim();

      prev.click(function() {
        i--;
        if (i < 0) {
          i = 0;
          return true;
        }
        judgeAnim();
      });

      next.click(function() {
        i++;
        if (i >= len) {
          i = len - 1;
          return true;
        }
        judgeAnim();
      });

      //åˆ¤æ–­äº‹ä»¶ç±»åž‹
      if (evt == 'hover') {
        btn.children().hover(
          function() {
            var j = $(this).index();
            function s() {
              i = j;
              judgeAnim();
            }
            timer = setTimeout(s, obj.delay);
          },
          function() {
            clearTimeout(timer);
          }
        );
      } else {
        btn.children().bind(evt, function() {
          i = $(this).index();
          judgeAnim();
        });
      }

      //è‡ªåŠ¨è¿è¡Œ
      function startRun() {
        t = setInterval(function() {
          i++;
          if (i >= len) {
            switch (anim) {
              case 'left':
                con.stop().css({ left: conWidth });
                break;
              case 'up':
                con.stop().css({ top: conHeight });
            }
            i = 0;
          }
          judgeAnim();
        }, obj.autoSpeed);
      }

      //å¦‚æžœè‡ªåŠ¨è¿è¡Œå¼€å¯ï¼Œè°ƒç”¨è‡ªåŠ¨è¿è¡Œå‡½æ•°
      if (obj.auto) {
        $(this).hover(
          function() {
            clearInterval(t);
          },
          function() {
            startRun();
          }
        );
        startRun();
      }
    });
  };
})(jQuery);
