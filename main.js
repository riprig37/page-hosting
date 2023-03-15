var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), 
  renderer: 'svg', // 描画形式
  loop: true, // trueにしたらループ。1回再生の場合はfalse
  autoplay: true, // 自動再生
  path: 'Lottie Lego.json' // jsonのパスを指定
  name: "Hello World", // 今後のリファレンスとして名前を指定（オプション）
  });