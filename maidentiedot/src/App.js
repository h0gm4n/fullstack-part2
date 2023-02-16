import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [searchWord, setNewSearch] = useState('')
  const [countries, setCountry] = useState([])
  
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  const countrylist = []

  const countrieslength = countries.length

  var countryid = 0

  var languagelist = []

  var flagurl = ""

  for (let i = 0; i < countrieslength; i++) {
    countrylist.push(countries[i].name.common)
  }

  const lista = []
  for (let i = 0; i < countrieslength; i++) {
    if (countrylist[i].toLowerCase().includes(searchWord.toLowerCase())) {
      lista.push(countrylist[i])
    }
  }
  console.log(lista)

  const handleSearchChange = (event) => {  
    setNewSearch(event.target.value)
  }

  console.log(lista.length)

  if (lista.length == 1) {
    const countryName = lista[0]
    for (let i = 0; i < countrieslength; i++) {
      if (countries[i].name.common == countryName)
        countryid = i
        flagurl = countries[countryid].flags.png
    }
  }

  for (const i in countries[countryid]) {
    if (i == 'languages')
      for (const k in countries[countryid].languages) {
        languagelist.push(k)
      }
  }

  
  if (lista.length <= 10 && lista.length != 1) {
    return (
      <div>
          <form>
            filter shown with <input value={searchWord} onChange={handleSearchChange}/>
          </form>
          <div>
            {lista.map(country => <p>{country}</p>)}
          </div>
      </div>
    )
  
  } else if (lista.length == 250) {
    return (
      <div>
          <form>
            filter shown with <input value={searchWord} onChange={handleSearchChange}/>
          </form>
      </div>
    )
  
  } else if (lista.length > 10) {
    return (
      <div>
          <form>
            filter shown with <input value={searchWord} onChange={handleSearchChange}/>
          </form>
          <div>
            Too many matches, specify another filter
          </div>
      </div>
    )
  
  } else if (lista.length == 1) {
    console.log(countryid)
    return (
      <div>
          <form>
            filter shown with <input value={searchWord} onChange={handleSearchChange}/>
          </form>
          <div>
            <h1>{lista[0]}</h1>
            capital {countries[countryid].capital[0]}
            <div>area {countries[countryid].area}</div>

            <p><b>languages:</b></p>

            <div>
              {languagelist.map(language => <div><li>{language}</li></div>)}
            </div>
            <p><img src={flagurl}/></p>
          </div>
      </div>
    )
  }
  
}

export default App
