import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { StaticRouter } from 'react-router'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import flushChunks from 'webpack-flush-chunks'
import Head from '../../helpers/Head'
import Body from '../../helpers/Body'
import { createMemoryHistory } from 'history'
import { flushChunkNames } from 'react-universal-component/server'
import allStore from '../../../client/core/Store'
import App from '../../../client/decorators'

/**
 * Middleware to render initial page for the application
 */
export default ({ clientStats }) => (req, res) => {
  // To prevent memory leaks on server when calling observer (https://github.com/mobxjs/mobx-react/issues/140)
  useStaticRendering(true)

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
  extendedStylesheets[fontawesomeCssIndex] = `assets/css/fontawesome.css`

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
