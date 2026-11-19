import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './extra.css'
// 风格主题层：theme-plugin.css（插件审美，当前） / theme-apple.css（灰白混排） / theme-light.css（亮色）
import './theme-plugin.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#050506',
            color: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#f5f5f7', fontSize: 22, fontWeight: 600, letterSpacing: '0.2em' }}>
              MUSHAN DESIGN
            </div>
            <p style={{ marginTop: 14, color: '#a1a1a6' }}>
              页面加载出错，请刷新重试。若持续出现，请告诉我具体现象。
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
