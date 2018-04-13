import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _3f382a26 = () => import('../src/pages/signin.vue' /* webpackChunkName: "pages/signin" */).then(m => m.default || m)
const _32da2d42 = () => import('../src/pages/post/_slug.vue' /* webpackChunkName: "pages/post/_slug" */).then(m => m.default || m)
const _4a0a738d = () => import('../src/pages/profile/_handle.vue' /* webpackChunkName: "pages/profile/_handle" */).then(m => m.default || m)
const _158dabfe = () => import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/signin",
			component: _3f382a26,
			name: "signin"
		},
		{
			path: "/post/:slug?",
			component: _32da2d42,
			name: "post-slug"
		},
		{
			path: "/profile/:handle?",
			component: _4a0a738d,
			name: "profile-handle"
		},
		{
			path: "/",
			component: _158dabfe,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}