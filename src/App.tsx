import { InputImage } from '@/components/upload/InputImage';
import { Layout } from './components/dom/layout/Layout';
import { Scene } from './components/canvas/Scene';

function App() {

  return (
    <>
      <Layout>
        <Scene />
      </Layout>
      {/* <div className='w-screen h-screen flex flex-col justify-start items-center  border-2 border-blue-500 gap-16 p-16'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-extrabold w-fit h-fit rounded-md p-2 text-red-500'>
            Hello, Mountain Madness 2024!
          </h2>
          <h3 className='text-2xl font-extrabold text-green-500'>
            A New Perspective!
          </h3>
        </div>
        <InputImage />
      </div> */}

    </>
  )
}

export default App
