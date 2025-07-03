const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>
        So you were probably born {bornYear()}
      </p>
    </div>
  );
}


const App = () => {
  const old = 79;
  const young = 16;
  const ages = [45, 45, 234];
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name="Aaro" age={old}/>
      <Hello name="Bossman" age={young + old}/>
      <p>{ages}</p>
    </div>
  );
}

export default App;