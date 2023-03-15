lottie.loadAnimation({
    container: document.getElementById('lottie'), // アニメーションをさせたいdivなどhtml要素ににつけた名前
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'Lottie Lego.json' // 自分が書き出したjsonファイルの名前と場所（パス）を記述
  });


// $(function(){

//     var animation = lottie.loadAnimation({

//         container: document.getElementById(“ここにID”),

//         renderer: 'svg',

//         loop: false, //ループ

//         autoplay: false,　//自動再生

//         path: “JSONのファイルパス”

//     });

// });