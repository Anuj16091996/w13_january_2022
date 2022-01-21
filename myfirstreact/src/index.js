import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Nav from './Nav.js'
import Header from './Header'
import Footer from './Footer'
import SelectList from './SelectList'
import HeaderWithButton from './HeaderWithButton'
import LoginForm from './LoginForm'

// function Footer () {
//     return <footer>test</footer>
// }
// ReactDOM.render(
//     <React.StrictMode>
//         <Nav mylink='https://stackoverflow.com/'/>
//         <Nav  />
//         <Footer />
//     </React.StrictMode>,
//     document.getElementById('root')
// )

const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

console.log()


class Page extends React.Component{
    render(){
              return (
              <div >
                 <Header name='Anuj' />
                  <p>Hello World !</p>
                  <div id='Inline'>
                  <SelectList array={provinces}/>
                  <SelectList array={countries}/>
                  <LoginForm username='toto' pw='123456' />
                  {/* <HeaderWithButton /> */}
                  </div>

                <Footer name='Narang'/>
              </div>
          )
      }
  }

  ReactDOM.render(
      <Page/>,
      document.getElementById('root')
  )



// const myh1 = (
//     <div>

//         <h1>Hello</h1>
//         <h2>World</h2>

//     </div>
// )

// ReactDOM.render(
//     myh1,
//     document.getElementById('root')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
