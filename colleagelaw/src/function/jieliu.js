export const throttle=(handler, wait)=> {
       
          
    console.log(handler)
    
     
        
    var previous = 0;
    console.log('1')
    return function() {
            let now = Date.now();
            let context = this;  //调用throttle时的上下文，按照我的情况应该是window
            console.log(this);
            if (now - previous > wait) {
                handler()
                previous = now;
            }
        
          }
    
    
    
            
         }