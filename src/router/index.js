import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'

Vue.use(Router)


// 利用webpack的import()来异步加载一个页面
const loadCmp = cmpName => resolve => {
  // 开始加载新页面
  import('../views/' + cmpName + '/index.vue')
    .then(cmp => {
      // 页面加载完成
      setTimeout(() => {
        // vuex.commit('loadingPageEnd');
        resolve(cmp);
      }, 200);
    })
    .catch(e => {
      // 页面加载失败
      // vuex.commit('loadingPageEnd');
    });
};
const router = new Router({
  routes: [
    {
      // 竞猜标题页A1
      path: '/guess',
      component: loadCmp('guess'),
      children: [
        {
          name: 'guess-title',
          path: 'guess-title',
          component: loadCmp('guess/guess-title'),
        },
        {
          name: 'guess-ranking',
          path: 'guess-ranking',
          component: loadCmp('guess/guess-ranking'),
        },
        //更多奖励
        {
          name: 'extend-bonus',
          path: 'extend-bonus',
          component: loadCmp('guess/extend-bonus'),
        },
        {
          path: '/',
          redirect: {
            path: 'guess-title'
          }
        }
      ]
    },
    {
      // 竞猜成功
      name: 'guess-success',
      path: '/guess/guess-success',
      component: loadCmp('guess/guess-success')
    },
    {
      // 测试
      name: 'test',
      path: '/test',
      component: loadCmp('test')
    },
    {
      path: '/',
      redirect: {
        path: '/guess'
      }
    },
  ]
});

export default router;

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     }
//
//   ]
// })
