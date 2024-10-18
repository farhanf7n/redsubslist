import './App.css'

function App() {

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen gap-2 w-full items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
            <div className="h-9 w-9 rounded-full bg-charcoal-black"></div>
          </div>
          <h1 className='text-2xl text-white'>Loading...</h1>
        </div>
      </div>
    </>
  )
}

export default App
