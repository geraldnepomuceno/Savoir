;(function(){
  
    // marquee web animation variable
    var marquee;
  
    // js will select the marquee web animation variable
    var marquee_el = document.querySelector( '.grid.marquee' );
    var children = marquee_el.querySelectorAll( '.cell');

    // container grid animation
    function createMarquee(){
      
      // animation method
      if ('animate' in marquee_el && typeof marquee_el.animate === 'function') {
        
        if( typeof marquee !== 'undefined' ) marquee.cancel();
  
        // automatic grid style animation
        marquee_el.style.whiteSpace = 'nowrap';
  
        // discplacement variable
        var displacement = 0;
  
        // width element variable
        for ( var j = 0; j < children.length; ++j ) displacement += children[j].clientWidth;
  
        displacement = (displacement - marquee_el.clientWidth) << 0;
  
        //marquee parent scope
        // marquee animation section
        marquee = marquee_el.animate([
       
          { transform: 'matrix(1, 0.00, 0.00, 1, 0, 0)', offset: 0 },
          { transform: 'matrix(1, 0.00, 0.00, 1,' + -displacement + ', 0)', offset: 1 }

        ],
        {

          // arbitrary decision
          // animation duration for each grid
          duration: children.length * 4e3,
  

          // ease animation
          easing: 'linear',
  
          // delay has been set to 0 to start the animation immediately when opening the web page
          delay: 0,
  

          iterations: Infinity,
  
          // direction will be alternate once the animation has been completed
          direction: 'alternate',
          fill: 'forwards'
        });
      } 
    }
  
    // Web animation api marquee method
    if ('animate' in marquee_el && typeof marquee_el.animate === 'function') {
      
      // marquee creation method
      createMarquee();
  
      // for playing and pausing the marquee api 
      marquee_el.addEventListener('mouseenter', pauseMarquee, false);
      marquee_el.addEventListener('mouseleave', playMarquee, false);
      window.addEventListener('resize', debounce( createMarquee ), false);
      
    } else {

        // indicator which states that some of the browser cannot be supported by this api
        document.querySelector('h1').innerHTML = 'Your browser does not appear to <br> support the Web Animation API';
    }
  
    // play animation section
    function playMarquee(){
      if( marquee.playState === 'paused' ) marquee.play();
    }
    
    // pause animation section
    function pauseMarquee(){
      if( marquee.playState === 'running' ) marquee.pause();
    }
  
    // debounce function to pause and play the animation
    function debounce(func){
      var scheduled, context, args;
      return function(){
        context = this; args = [];
        for(var i = 0; i < arguments.length; ++i) args[i] = arguments[i];
        !!scheduled && window.cancelAnimationFrame(scheduled);
        scheduled = window.requestAnimationFrame(function(){
          func.apply(context, args);
          scheduled = null;
        });
      }
    }
  })();