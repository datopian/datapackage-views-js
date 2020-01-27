import "./i18n/i18n"
import React from "react"
import Vega from 'react-vega';
import './index.css'
import "./App.css"
import Table from "./Table.js"
import Map from './Map.js'
import PdfViewer from './Document.js'
import Chart from './Chart.js'
import {getResourceCachedValues, simpleToPlotly, plotlyToPlotly, vegaToVega} from 'datapackage-render'
import Loader from 'react-loader-spinner'
import tableToGeoData from './utils'
import {useTranslation} from "react-i18next"

export function DataView(props) {

  const { t } = useTranslation();

  if (props.loading) {
    return (
      <div className="App">
        <Loader
           type="Grid"
           color="#D3D3D3"
           height="50"
           width="50"
        />
      </div>
    )
  }
  const countViews = props.datapackage.views ? props.datapackage.views.length : 0
  if (countViews === 0) {
    return (<div className="App">{t('No views available')}</div>)
  }
  for (let i = 0; i < countViews; i++) {
    const view = props.datapackage.views[i]
    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data
    }
    if (view.specType === 'table' && view.resources[0]._values) {
      const data = getResourceCachedValues(view.resources[0], true)
      const schema = view.resources[0].schema || {}
      return (
        <div className="App">
          <Table data={data} schema={schema} />
        </div>
      )
    } else if (view.specType === 'map' && view.resources[0]._values) {
      return (
        <div className="App">
          <Map data={view.resources[0]._values} />
        </div>
      )
    } else if (view.specType === 'tabularmap' && view.resources[0]._values) {
      let geoData
      try {
        geoData = tableToGeoData(view)
        return (
          <div className="App">
            <Map data={geoData} />
          </div>
        )
      } catch (e) {
        return (<div className={e}></div>)
      }
    } else if (view.specType === 'document') {
      return (
        <div className="App">
          <PdfViewer file={view.resources[0].path} />
        </div>
      )
    } else if (view.specType === 'simple') {
      let plotlySpec
      try {
        plotlySpec = simpleToPlotly(view)
        if (plotlySpec) {
          return (
            <div className="App">
              <Chart spec={plotlySpec} />
            </div>
          )
        }
      } catch (e) {
        return (<div className={e}></div>)
      }
    } else if (view.specType === 'plotly') {
      let plotlySpec
      try {
        plotlySpec = plotlyToPlotly(view)
        if (plotlySpec) {
          return (
              <div className="App">
                <Chart spec={plotlySpec} />
              </div>
          )
        }
      } catch (e) {
        return (<div className={e}></div>)
      }
    } else if (view.specType === 'vega') {
      let vegaSpec
      try {
        vegaSpec = vegaToVega(view)
        return (
          <Vega spec={vegaSpec} />
        )
      } catch (e) {
        return (<div className={e}></div>)
      }
    } else if (view.specType === 'web') {
      const src = view.page_url || view.resources[0].path
      return (
        <div className="App">
          <iframe src={src} width="100%" height="475px">
            {t('Your browser doesn\'t support "iframe".')}
          </iframe>
        </div>
      )
    } else if (view.resources[0].unavailable || view.specType === 'unsupported') {
      return (
        <div className="App">
          <p>{t('Data view unavailable.')}</p>
          <a href={view.resources[0].path} className="text-primary font-bold">{t('Download the data.')}</a>
        </div>
      )
    }
  }
}
