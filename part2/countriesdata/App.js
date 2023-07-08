import { useState, useEffect } from "react";
import countryServices from "./services/Countries";
import { Searchbar, Countries } from './Display';

const App = () => {
  const [searched, setSearched] = useState('');
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(null);

  const handleSearchChange = event => {
    setShow(null);
    setSearched(event.target.value);
  }

  useEffect(() => {
    countryServices
      .getAllCountries()
      .then(countriesReturned => setCountries(countriesReturned))
  }, []);

  return (
    <div>
      <Searchbar value={searched} handleChange={handleSearchChange} />
      <Countries value={searched} countries={countries} show={show} setShow={setShow} />
    </div>
  )
};

export default App;
