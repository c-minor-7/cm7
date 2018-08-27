/* eslint-disable */
const templates = [
  {
    name: 'jimjim',
    src: `key=Eb

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
  },
  {
    name: 'here we are',
    src: `key = D

:: intro ::
1 4
1 4

:: verse ::
1 4
() Here we are in the (future) now
1 4 2m
() Here we are in the (place) that we wanted to (be)
7b
To (be)

1 4
() Everything in your (fantasy)
1 4 2m
() Everything has be(come) your reali(ty)
7b
(Hmmm)

:: pre-chorus ::
4 5
() What a fool I (used) to be
4 5
() Should have known you mean the (most) to me
4   4
() Now I finally (see) it
2m
Now I finally (know) it

All I really want
2m
() All I really want is


:: chorus ::
1
(I) just wanna be with you
1
(I) just wanna be with you
       4
Right (now)
1
(I) just wanna be with you
1
(I) just wanna be with you
4
Right (now)
2
I (didn't) know
2m
It (runs) so fast
2m7b5
And I (can't) catch up`,
  },
];

new Vue({
  el: '#app',
  data: () => ({
    templates,
    _templateId: 0,
    src: templates[0].src,
    error: '',
  }),
  computed: {
    song() {
        this.error = '';
      try {
        return Cm7({ src: this.src });
      } catch (e) {
        if (!e.message.includes('Cm7')) throw e;
        this.error = e.message;
        return '';
      }
    },
    templateId: {
      set(to) {
        if (to === this.$data._templateId) return;
        if (this.templates.every(t => t.src !== this.src)
          && !window.confirm('Your changes will not be saved!')) {
          this.$refs.select.value = this.$data._templateId;
          return;
        }

        this.$data._templateId = to;
        this.src = this.templates[to].src;
      },
      get() {
        return this.$data._templateId;
      },
    },
  },
});
