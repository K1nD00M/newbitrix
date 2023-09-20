import Layout from './layout/Layout'
import Header from './layout/Header' 
import AppRouter from './router/router'

function App() {
   return (
      <div className='App h-screen flex flex-col'>
         <Header />
         <Layout>  
            {AppRouter }
         </Layout>
      </div>
   )
}

export default App
