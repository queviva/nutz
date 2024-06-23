document.addEventListener('DOMContentLoaded', e => {
    
    const log = console.log;
    
    const keyLizzer = e => {
        
      if (e.fromElement) {
        if (nutz0g1.classList.contains('shiver')) {
          return;
        } else {
          nutz0g1.classList.add('shiver');
          nutz0g1.classList.remove('nutz-g-over');
        }
      }

      else if (e.code === 'Space') {
        e.preventDefault();
        if (nutz0g1.classList.contains('shiv-pulse')) {
          return;
        } else {
          nutz0g1.classList.add('shiv-pulse');
          nutz0g1.classList.remove('nutz-g-over');
        }
      }
    
      else if (e.code === 'KeyA') {
        e.preventDefault();
        if (nutz0g8.classList.contains('my-kind')){
          return;
        } else {
          nutz0g8.classList.add('my-kind');
          nutz0g8.classList.remove('nutz-g-over');
        }
      }
      
      else if (e.code === 'KeyW') {
        inxl.querySelectorAll('.nutz-sub')
        .forEach(sp =>
          sp.classList.toggle('nutz-sub-off')
        );
      }
      
      else if (e.code === 'KeyC') {
        capsToggle = !capsToggle;
        document.querySelectorAll(
            'g.nutz-g'
        ).forEach(g => {
          g.inableCaps(capsToggle);
        })
      }
    
      else if (e.code === 'KeyX') {
                
        let KK = inxl.querySelectorAll('.nutz-arc');
        
        nutz0svg.style.pointerEvents = 'none';
        
        inxl.querySelectorAll('.nutz-sub')
        .forEach(sp => {
            sp.classList.add('nutz-sub-off')
        });
        
        KK.forEach((arc, i) => {
            arc.setAttribute(
                'transform-origin',
                JSON.parse(arc.dataset.cg).join(' ')
            );
            setTimeout(() => {
                arc.classList.add('explode');
            }, 2*68.8125*i);
        });
        setTimeout(()=>{
            nutz0svg.style.pointerEvents = 'auto';
            document.body.classList.remove('nutz-body-plode');
            
        },2000);
        document.body.classList.add('nutz-body-plode');
      }
    
      else if (e.code === 'KeyR') {
        
        window.removeEventListener('keydown', keyLizzer);
        let KK = nutz0svg.querySelectorAll('.nutz-arc');
        
        nutz0svg.style.pointerEvents = 'none';
        
        nutz0svg.querySelectorAll('.nutz-sub')
        .forEach(sp => {
            sp.classList.add('nutz-sub-off')
        });
        nutz0poster.classList.add('topper-over');
        
        let arcsum = 0;
        KK.forEach((arc, z) => {
            KK[z].classList.remove('explode');
            KK[z].style.setProperty(
                'd', 'path("M0 0Z")'
            );
            setTimeout(
                KK[z].shit.start,
                20 * arcsum
            );
            arcsum += KK[z].shit.duration;
            
        });
        
        setTimeout(() => {
            nutz0svg.style.pointerEvents = 'auto';
            nutz0poster.classList.remove('topper-over');
            setTimeout(() => {
                window.addEventListener('keydown', keyLizzer)
            }, 300)
        }, 20 * 100);
        
      }
      
    };
    
    let capsToggle = false;
    
    window.addEventListener('keydown',keyLizzer);
    
    nutz0g1.addEventListener('animationend', e => {
        if (e.animationName === 'shiver') {
            nutz0g1.classList.remove('shiver');
            nutz0g1.classList.add('nutz-g-over');
        } else if (e.animationName === 'pulse') {
            nutz0g1.classList.remove('shiv-pulse');
            nutz0g1.classList.add('nutz-g-over');
        }
    });
    
    nutz0g8.addEventListener('animationend', e => {
        nutz0g8.classList.remove('my-kind');
        nutz0g8.classList.add('nutz-g-over');
    });
    
    shiv.addEventListener('mouseover', e => {
        keyLizzer(e)
    });
    
    mykind.addEventListener('mouseover', e => {
        keyLizzer({
            code: 'KeyA',
            preventDefault : () => {}
        });
    });
    
  //keyLizzer({code:'KeyR',preventDefault:_=>{}});
    
});