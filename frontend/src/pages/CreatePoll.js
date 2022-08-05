import React from 'react'
import {useState, Fragment} from 'react'
import { Link } from 'react-router-dom'


export default function CreatePoll(){

  const [title, setpollTitle] = useState('')
  const [choices, setpollChoices] = useState (['']) 
  const [pollErrors, setpollErrors] = useState([])
  const [pollSuccess, setpollSuccess] = useState([])


  //RAJAPINTA//
  const fetchUri = 'http://localhost:4000/aanestykset'


  //LISÄÄ VASTAUKSIA//
  const addChoices = () => {

    setpollChoices([

        ...choices,

        ''       
    ])
    console.log(choices.length)
  }



  //POISTAA VASTAUKSIA//
  const removeChoices = (index) => {
    const newChoices = choices.filter((choices, choiceIndex) =>{
        return choiceIndex !== index;
    })

    setpollChoices(newChoices)
  }


  //MUUTTAA VASTAUKSIA NIIDEN PÄIVITTYESSÄ//
  const onChange = (index, value) => {
    const newChoices = choices.map((choices, choiceIndex) => {
        if(choiceIndex === index){
            return value
        }
        console.log(choices)
        
        return choices

    })

    setpollChoices(newChoices)
  }


  //LISÄÄ ÄÄNESTYKSET PAIKALLISEEN MUISTIIN//
  const addPollsToLocalStorage = (successData) => {

    const existingPolls = JSON.parse(localStorage.getItem('aanestykset')) || []

    const newPolls = [
        ...existingPolls,
        {
            title,
            id: successData.pollId
        }
    ]

    localStorage.setItem('aanestykset',
    JSON.stringify(newPolls))
  }



  //LÄHETTÄÄ UUDEN ÄÄNESTYKSEN RAJAPINTAAN//
  const createNewPoll = async () => {

    const response = await fetch(`${fetchUri}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            choices
        })

    })

    const data = await response.json()

    if(!response.ok){
        
        setpollErrors(data)
        return
    }

    setpollSuccess(data)
    addPollsToLocalStorage(data)

  }


  return (

      <div className="p-12 w-full h-screen bg-gray-800 text-gray-900">

        <div className="bg-white md:my-32 md:mx-60 p-5">
            
            <h1 className="py-5">
            ÄÄNESTYKSEN LUONTI
            </h1>

            <div className="mb-6">
                <label className="text-xl mb-2">Äänestyksen nimi</label>
                <input onChange={(event) => setpollTitle(event.target.value)} value={title} className=' w-full py-2 border-2 px-4' />
            </div>

            <div className="mb-3">
            <label className="text-xl mb-2">Kaikki vastaukset</label>
            {choices.map((choice, index) => (
                <div key={index} className="w-full flex items-center mb-5">
                    <select onChange={(event) => onChange(index, event.target.value)} key={index} type="text" value={choice} className='border-2 w-full py-2 px-4'>
                    <option>VALITSE RUOKAPAIKAT!</option>
                    <option value="burgerit">BURGER MESTAT</option>
                    <option value="grillit">GRILLI MESTAT</option>
                    </select>
                    <button onClick={() => removeChoices(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>X</button>
                </div>
            ))}
            </div>

            <div className="mt-12 text-left">
            <button onClick={addChoices} className='bg-green-700 px-10 font-bold mr-5 py-3 active:border-blue-700 text-md text-white hover:bg-green-700'>LISÄÄ VASTAUS</button>
            <button onClick={createNewPoll} className='bg-blue-600 text-white font-bold px-12 mr-4 py-3 active:border-blue-700 text-md hover:bg-blue-700'>LUO ÄÄNESTYS!</button>
            </div>


            {pollSuccess.pollId ? (
                <div className="px-8">
                    <div className="w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2">
                        Äänestys luotu onnistuneesti.. <Link to={`/aanestykset/${pollSuccess.pollId}`}>
                            {fetchUri}/{pollSuccess.pollId}
                        </Link>
                    </div>
                </div>
            ) : null}

            {!pollSuccess.pollId ? (
                <div className="py-5 px-8">
                {pollErrors.length > 0 ? (
                    <Fragment>
                        {pollErrors.map((error, index) => (
                            <p key={index} className='w-full mb-2 bg-red-500 text-white py-3 px-2 rounded'>{error.message}</p>
                        ))}
                    </Fragment>
                ): null}
        </div>
        ) : null}
        </div>
    </div>
  )
       
}