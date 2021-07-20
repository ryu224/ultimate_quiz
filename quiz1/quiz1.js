$(function(){ 
  
  const quiz = [
    { 
      question: 'アルティメットは何の道具を使ったスポーツ？',
      answers: [
        'ボール',
        'フライングディスク',
        'スタンガン',
        '無し'
      ],
      correct:'フライングディスク'
    }, { 
      question: '発祥国は？',
      answers: [
        'アメリカ',
        'イギリス',
        '日本',
        'ドイツ'
      ],
      correct:'アメリカ'
    }, { 
      question: '基本は何人で行うスポーツ？',
      answers: [
        '1 VS 1',
        '5 VS 5',
        '7 VS 7',
        '10 VS 10'
      ],
      correct:'7 VS 7'
    },{
      question: '他のスポーツにはあまりない特徴は？',
      answers: [
      '選手交代は試合中いつでも良い',
      '試合の時には白いハンカチを携帯する',
      '坊主でなければならない',
      '審判がいない(セルフジャッジ)'
      ],
      correct:'審判がいない(セルフジャッジ)'
    }, { 
      question: '世界の競技人口は？',
      answers: [
        '約5万人',
        '約20万人',
        '約50万人',
        '約100万人'
      ],
      correct:'約20万人'
    }
  ];

  const $quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
  const $quiz_html = $quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
  const quizLength = quiz.length;  
  const btnLength = $('.btn').length;
  let quizIndex = 0;　//現在の問題数
  let score = 0; //正解数
  
  //クイズの問題文、選択肢を定義
  function setupQuiz(){
    //何問目かを表示
    $quizArea.find('.quiz_no').text((quizIndex + 1 ));
    //問題文を表示
    $quizArea.find('.quiz_question').text(quiz[quizIndex].question);

    let btnIndex = 0;
    while(btnIndex < btnLength){
      $('.btn').eq(btnIndex).text(quiz[quizIndex].answers[btnIndex]);
      btnIndex++;
    }
  }

  quizReset();

  //回答選択
  $quizArea.on('click','.btn',function(){
      $quizArea.find('.quiz_bg').show();
      if($(this).text() === quiz[quizIndex].correct){
          //正解の処理 
          $quizArea.find('.quiz_result').addClass('true');
          //正解数をカウント
          score++;
      }else{
          //不正解の処理
          $quizArea.find('.quiz_result').addClass('false');
      }
      setTimeout(function(){
          //表示を元に戻す
          $quizArea.find('.quiz_result').removeClass('true false');
          $quizArea.find('.quiz_bg').hide();
          //問題のカウントを進める
          quizIndex++;
          if(quizLength > quizIndex){
              //次の問題を設定する
              setupQuiz();
          }else{
              //結果表示画面を表示
              quizRecord();
          }
      }, 500);
  });
  
      //もう一度挑戦するを押した時の処理
      $quizArea.on('click', '.quiz_restart', function(){
          quizReset();
      });

      //結果を表示する関数
      function quizRecord(){
          $quizArea.find('.quiz_set').hide();
          let text = quizIndex + '問中' + score + '問 正解！';
          if(quizIndex === score){
              text = '全問正解!！';
          }
          text += '<br><button class="quiz_restart"><i class="fas fa-undo-alt"></i>もう一度挑戦する</button>';
          text += '<br><button class="quiz_course"><a href="../index.html"><i class="fas fa-arrow-circle-left"></i>コース選択に戻る</a></button>';
          $quizArea.find('.quiz_record').html(text);
          $quizArea.find('.quiz_record').show();
      }
      
      //リセットを行う関数
      function quizReset(){
          $quizArea.html($quiz_html); //表示を元に戻す
          quizIndex = 0;
          score = 0;
          setupQuiz();
      } 
});