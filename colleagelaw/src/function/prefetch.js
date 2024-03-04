    let count = 0;
    console.log('aaa')
    var imgs=[]
    //用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
    axios({
          url:`http://8.138.58.77:8806/gdufe/image/pageImage/1/5000`
            }).then((data) =>{
              data.data.data.records.forEach(item =>{
                imgs.push(item.url)
                
              })
            }).then(()=>{
              console.log(imgs);
    for (let img of imgs) {
        let image = new Image();//Image 对象  ，Image 对象代表嵌入的图像。<img> 标签每出现一次，一个 Image 对象就会被创建。创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.jpg”;    这样做就相当于给浏览器缓存了一张图片。
        image.onload = () => {   //onload 事件在图片加载完成后立即执行。   创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.gif”;    这样做就相当于给浏览器缓存了一张图片。
            count++;
        };
        image.src = img;
    }
    console.log('加载完成')
            })
  
