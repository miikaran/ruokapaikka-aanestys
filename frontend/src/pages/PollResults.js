import {useEffect, useState} from 'react';
import Button from '../components/viewButton'
import { useParams } from 'react-router-dom';
import Map from '../components/Map'


export default function PollResults() {

    const [ip, setIp] = useState(null)
    const [usedPoll, setusedPoll] = useState(null)
    const [hasVoted, sethasVoted] = useState(false)
    const [displayMap, setdisplayMap] = useState(false)
    const [pollSuccess, setpollSuccess] = useState([])
    const [pollResultData, setpollResultData] = useState()//KÄYTETÄÄN VOITTAVAN ÄÄNEN TUNNISTAMISEEN   
    const [winner, setWinner] = useState([])//VOITTAVA ÄÄNI
    let pollWinnerCount;  


    //UUID ÄÄNESTYKSEEN
    const { poll } = useParams();
    //TIETOKANNAN COLLECTION HOMMA
    const mongoCollection = "aanestykset"

    //ÄÄNESTYKSEN URL
    const pollUrl = `http://localhost:4000/${mongoCollection}/${poll}`


    //NOUTAA TIEDOT LUODUSTA ÄÄNESTYKSESTÄ//
    const fetchPoll = async () => {
        
        const response = await fetch(pollUrl)
        const data = await response.json()
        setusedPoll(data)
        console.log(data)

        /*//ENITEN ÄÄNIÄ SAANUT VASTAUS
        setpollResultData([data.choices[0].count, data.choices[1].count])
        console.log(pollResultData)
        pollWinnerCount = ("Voittaja ääni määrä", Math.max(pollResultData[0], pollResultData[1]))
        console.log(pollWinnerCount)*/
    }

    useEffect(() => {
        fetchPoll()
    }, [hasVoted])

    


    //PÄIVITTÄÄ TIEDOT MONGOON//
    const userVote = async (choice) => {
        
        await fetch(pollUrl, {
            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ip, choice})
        })

        sethasVoted(true)
    }



    //NÄYTTÄÄ KAIKKI ÄÄNET//
    const getAllVotes = () => {

        let allVotes = 0

        usedPoll.choices.forEach(choice => {
            
            allVotes += choice.count
        })

        return allVotes
    }


    //LASKEE PROSSAN VALITTUIHIN VASTAUKSIIN//
    const getChoicePercentage = (selectedChoice) => {

        const allVotes = getAllVotes()

        if(allVotes === 0){
            return 0
        }
        return Math.round((selectedChoice.count / allVotes) * 100)
    }


    //TARKISTA TULOKSET ÄÄNESTYKSEN JÄLKEEN//   
    const checkResult = async () => {

        if(hasVoted === true){

            fetchPoll()
            setdisplayMap(true)
        }
        setWinner("grillit");
    }



    return (
        <div className="container mt-52 text-white">
            <h1 className="fw-bold my-5 text-6xl text-center text-gray-800">
                ÄÄNESTYS!!!
            </h1>

            {usedPoll ? (
                <div className="w-full max-w-4xl mx-auto bg-gray-700 shadow">
                    <header className='px-5 py-4 text-2xl flex justify-between items-center'>
                        {usedPoll.title}

                        {hasVoted && <span>ÄÄNET - {getAllVotes()} </span>}

                        <Button onClick={checkResult}>TARKISTA TULOKSET & KARTTA</Button>
                    </header>
                    

                    {usedPoll.choices.map(choice => {
                        return (
                            <div className='px-5 py-4 text-2xl border-t border-gray-400 flex justify-between items-center' key={choice.name}>
                                
                                {choice.name}

                                {hasVoted ? (
                                    <span className='text-2xl'>{getChoicePercentage(choice)}% </span>
                                ) :  <Button onClick={() => userVote(choice._id)}>Äänestä</Button>}
                            </div>
                        )
                    })}

                    {displayMap ? (
                        <div>
                            <Map pollWinner={winner} />
                        </div>
                    ): null}
                </div>
            ) : null}
        </div>
    )
}
