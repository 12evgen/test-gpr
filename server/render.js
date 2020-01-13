import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Head from './helpers/Head'
import Body from './helpers/Body'

import allStore from '../src/core/Store'
import App from '../src/decorators'

useStaticRendering(true)

export default ({ clientStats }) => (req, res) => {
  const history = createMemoryHistory({ initialEntries: [req.path] })
  const context = {}

  const app = renderToString(
    <Provider {...allStore}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App history={history} />
      </StaticRouter>
    </Provider>
  )

  const chunkNames = flushChunkNames()

  const { scripts, stylesheets } = flushChunks(clientStats, {
    chunkNames
  })

  const extendedStylesheets = stylesheets.slice(0)
  const fontawesomeCssIndex = extendedStylesheets.push(null) - 1

  // Add "fontawesome.css" file
  extendedStylesheets[fontawesomeCssIndex] = `public/css/fontawesome.css`

  const headHtml = renderToStaticMarkup(
    <Head
      siteName={'Pokemon'}
      siteDescription={'Pokemon App'}
      stylesheets={extendedStylesheets}
    />
  )

  // First bytes (ASAP)
  res.setHeader('Content-Type', 'text/html')
  res.write(`<!doctype html>\n<html>${headHtml}`)

  const bodyHtml = renderToStaticMarkup(
    <Body
      scripts={scripts}
      html={app}
    />
  )

  // Last bytes
  res.write(`${bodyHtml}</html>`)
  res.end()
}
