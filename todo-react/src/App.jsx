const username = 'Alexander'

const App = () => {
  return (
    <>
      <h1 className="title">To Do List</h1>
      <p style={{color: 'red'}}>Hi, {username}!</p>
      <p>{new Date().toLocaleDateString()}</p>
      {/*это комментарий JSX*/}
      <hr />
      <labal htmlFor='email' >Email:</labal>
      <input id="email" type="email" required/>
    </>
  )
}

export default App