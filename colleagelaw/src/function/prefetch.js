let count = 0;
console.log('aaa')
var imgs = []

axios({
  url: `http://8.138.58.77:8806/gdufe/image/pageImage/1/5000`
}).then((data) => {
  data.data.data.records.forEach(item => {
    imgs.push(item.url)

  })
}).then(() => {
  console.log(imgs);
  for (let img of imgs) {
    let image = new Image();
    image.onload = () => {
      count++;
    };
    image.src = img;
  }
  console.log('加载完成')
})

