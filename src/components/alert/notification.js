// notification.js
import Alert from './alert.vue';
import Vue from 'vue';

// Alert 理论上是一个有这template，script信息的组件。
// 之所以能变成对象是因为被 Webpack 的 vue-loader 编译，把 template 编译为 Render 函数
// 最终就会成为一个 JS 对象
Alert.newInstance = properties => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      });
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  const alert = Instance.$children[0];

  return {
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
};

export default Alert;