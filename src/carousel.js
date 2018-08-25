  var $imgCt = $('.carousel .ct')  
  var $imgs = $('.carousel .ct>li')  
  var $preBtn = $('.carousel .pre')  
  var $nextBtn = $('.carousel .next')  
  var $buttens = $('.carousel .butten >li')
  var pageIndex = 0;  
  var imgCount = $imgs.length;  
  var imgWidth = $imgs.width();  
  var isAnimate = false;


  $imgCt.append($imgs.first().clone());  
  $imgCt.prepend($imgs.last().clone());  
  $imgCt.width((imgCount + 2)*imgWidth)  
  $imgCt.css({left: -imgWidth})  


  $nextBtn.click(function(){  
      playNext(1)  
  })  
  $preBtn.click(function(){  
      playPre(1)  
  })  
  
  $buttens.click(function(){
      var index = $(this).index()
      if(index > pageIndex){
          playNext(index - pageIndex)
      }else if(index < pageIndex){
          playPre(pageIndex -index)
      }
  })


  function playNext(len){ 
      if(isAnimate) return;
      isAnimate = true
      console.log(isAnimate)
      $imgCt.animate({  
         left: '-='+ len * imgWidth
      },function(){  
          pageIndex += len  
          if(pageIndex === imgCount){
              pageIndex = 0
              $imgCt.css({left: -imgWidth})
          }
          console.log(pageIndex)
          setButten()
          isAnimate = false
      })
  }
  
  function playPre(len){
      if(isAnimate) return;
      isAnimate = true
      $imgCt.animate({
          left:'+='+len*imgWidth
      }, function(){
          pageIndex -=len
          if(pageIndex<0){
              pageIndex = imgCount - 1 
              $imgCt.css({left: -imgCount * imgWidth})
          }
          setButten()
          isAnimate = false
      })
  }

  function setButten(){
      $buttens.removeClass('active')
      .eq(pageIndex)
      .addClass('active')
  }