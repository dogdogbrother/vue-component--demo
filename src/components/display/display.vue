<template>
  <div ref="display"></div>
</template>
<script>
import randomStr from '../../utils/random_str.js';
import Vue from 'vue';
  export default {
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        html: '',
        js: '',
        css: '',
        id: randomStr()
      }
    },
    methods: {
      // 第一个参数是组件信息的全部内容，第二个是要分割的内容
      getSource (source, type) {
        // 正则不会
        const regex = new RegExp(`<${type}[^>]*>`);
        let openingTag = source.match(regex);

        if (!openingTag) return '';
        else openingTag = openingTag[0];

        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
      },
      splitCode () {
        // 记得要把 export default 替换成return
        const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
        const style = this.getSource(this.code, 'style');
        // app 的div是容错做法，因为用户有可能不会包裹根元素
        const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';
        this.js = script;
        this.css = style;
        this.html = template;
      },
      renderCode () {
        this.splitCode();
        console.log(this.html);
        console.log(this.js);
        if (this.html !== '' && this.js !== '') {
          // 因为我们的vue实例其实就是个对象，而现在的this.js，就是return{}这种内容。
          // 我们通过 new Function后直接执行的形式，获取到data，当然，用eval也是一样的
          const parseStrToFunc = new Function(this.js)();
          parseStrToFunc.template =  this.html;
          const Component = Vue.extend( parseStrToFunc );
          // 使用 $mount 渲染组件，在挂载到 display 元素下
          this.component = new Component().$mount();
          this.$refs.display.appendChild(this.component.$el);
          if (this.css !== '') {
            // 创建了一个style标签，给他赋值一个随机的id
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = this.id;
            style.innerHTML = this.css;
            document.getElementsByTagName('head')[0].appendChild(style);
          }
        }
      },
      destroyCode () {
        // 当组件销毁的时候，卸载对应的style标签
        const $target = document.getElementById(this.id);
        if ($target) $target.parentNode.removeChild($target);

        if (this.component) {
          // 还要卸载内容元素，并且用vue的$destroy进行卸载
          this.$refs.display.removeChild(this.component.$el);
          this.component.$destroy();
          this.component = null;
        }
      }
    },
    mounted () {
      this.renderCode();
    },
    beforeDestroy () {
      this.destroyCode();
    }
  }
</script>