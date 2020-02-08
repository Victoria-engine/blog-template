import React from 'react'
import { RouteProps, Route, Switch } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Post from '../pages/Post'

/**
 * Add routes to your web app here
 */
const routes: RouteProps[] = [
  { path: '/', component: Home, exact: true },
  { path: '/post/:postID', component: Post, exact: true },
]

export default () => (
  <Switch>
    {routes.map(route =>
      <Route path={route.path} exact={route.exact} component={route.component} key={`${route.path}route`} />)}
  </Switch>
)