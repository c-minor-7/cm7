/* eslint-disable */
const songs = {
  'jimjim': `key=Eb

1 6m
()在夜晚 說(早)晨
2m 5sus4 5
()閒談後 你(更)像別(人)
3m 6m
()字幕裡 說(冬)日灰暗
2m 5
回(答)你 這邊的氣(氛)

3sus4 3 6m
()就(像)你 已(記)不起了
2m 5
()連懷舊 也(格)外寂寥
3m 6m
()雜物裡 遺(物)和舊照
4 2m 2m 3m 4 5
誰(變)賣 誰(棄)掉 誰(看)(到)(破)(曉)

1 6m
()漸漸我甚(麼)都不想知道
2m 4/5
()我覺得迷(失)竟比醒覺好
3m 6m
()漸漸我離(開)都不想宣佈
2m 5sus4 5 1
()怕記憶 最(後)變話(題) 太俗(套)

3 6m 5sus4 5
() (寂)寞 寂寞出於(你)的空(白)
6m 1
()剩下我被(記)憶掌摑
2m7 3m 6m
()如留下語(錄)誰來(看)
7b 5/7
懷念(只)可鋪滿被(單)`,
};

new Vue({
  el: '#app',
  data: () => ({
    src: ''
  }),
  computed: {
    song() {
      return Cm7({ src: this.src });
    }
  },
});