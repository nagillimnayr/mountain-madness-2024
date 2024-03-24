import { Layout } from './components/dom/layout/Layout';
import { Scene } from './components/canvas/Scene';
import { UserInterface } from './components/dom/user-interface/UserInterface';

function App() {

  return (
    <>
      <Layout>
        <Scene />
        <UserInterface />
      </Layout>
    </>
  )
}

export default App
