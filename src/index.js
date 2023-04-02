import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import App from './App'

import './index.css'

const useHistory = () => {
  const [ route, setRoute ] = useState(window.location.pathname)

  useEffect(() => {
    const listener = () => setRoute(window.location.pathname)

    window.addEventListener('popstate', listener)
    return () => {
      window.removeEventListener('popstate', listener)
    }
  }, [])

  return {
    route,
    push: route => {
      setRoute(route)
      window.history.pushState({ route }, document.title, route)
    },
    replace: route => {
      setRoute(route)
      window.history.replaceState({ route }, document.title, route)
    },
    go: window.history.go,
    back: window.history.back,
    forward: window.history.forward,
  }
}

const useRouteList = () => {
  const { route, replace } = useHistory()
  const [_ignored, listString ] = route.split('/')
  const list = listString ? listString.split(',') : []

  const setList = list => replace(`/${list.join(',')}`)

  return [ list, setList ]
}

function useHash() {
  const [ hash, setHash ] = useState(window.location.hash.substr(1))

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.substr(1))

    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return [
    hash,
    hash => window.location.hash = hash || ''
  ]
}


  /*
const App = () => {
  const [ playlist, setPlaylist ] = useRouteList()
  const [ expanded, setExpanded ] = useHash('')

  const addToPlaylist = (songId, next) => {
    if(next) {
      const filtered = playlist.filter(s => s !== songId)
      setPlaylist([
        ...filtered.slice(0, filtered.indexOf(expanded) + 1),
        songId,
        ...filtered.slice(filtered.indexOf(expanded) + 1)
      ])
    } else if(!playlist.find(s => s === songId)) {
      setPlaylist([...playlist, songId])
    }
  }

  return (
    <div id="application" className="bg-zinc-900">
      <div id="content">
        <Playlist
          songs={songs}
          playlist={playlist}
          setPlaylist={setPlaylist}
          expanded={expanded}
          setExpanded={setExpanded} />
        <Songs
          songList={Object.values(songs)}
          addToPlaylist={addToPlaylist}
          setExpanded={setExpanded} />
      </div>
    </div>
  ) 
}

const Header = ({ playlist }) =>
  <header>
    <div className="header-inner">
      <div className="row">
        <div className="header-left col-md-3"></div>
        <div className="col-md-6"><h2>/dev/audio</h2></div>
        <div className="header-right col-md-3"></div>
      </div>
    </div>
  </header>*/
ReactDOM.render(<App/>, document.getElementById('root'))
registerServiceWorker()
