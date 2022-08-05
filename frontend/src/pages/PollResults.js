import {useEffect, useState} from 'react';
import Button from '../components/viewButton'
import { useParams } from 'react-router-dom';
import Map from '../components/Map'


export default function PollResults() {

    const [ip, setIp] = useState(null)
    const [usedPoll, setusedPoll] = useState(null)
    const [hasVoted, sethasVoted] = useState(false)
    const [pollSuccess, setpollSuccess] = useState([])
    const [pollResultData, setpollResultData] = useState()//KÄYTETÄÄN VOITTAVAN ÄÄNEN TUNNISTAMISEEN
    let pollWinnerCount;
    
    const noob = ["burgerit"]


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

        //ENITEN ÄÄNIÄ SAANUT VASTAUS
        setpollResultData([data.choices[0].count, data.choices[1].count])
        console.log(pollResultData)
        pollWinnerCount = ("Voittaja ääni määrä", Math.max(pollResultData[0], pollResultData[1]))
        console.log(pollWinnerCount)
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
        }

    }



    return (
        <div className="container mx-auto mt-16 px-5 text-white">
            <h1 className="my-5 text-3xl text-center text-dark">
                Äänestys!
            </h1>

            {usedPoll ? (
                <div className="w-full max-w-3xl mx-auto bg-black shadow">
                    <header className='px-5 py-4 flex justify-between items-center'>
                        {usedPoll.title}

                        {hasVoted && <span className="fw-bold">ÄÄNET - {getAllVotes()} </span>}

                        <Button onClick={checkResult}>TARKISTA TULOKSET</Button>
                    </header>
                    

                    {usedPoll.choices.map(choice => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={choice.name}>
                                
                                {choice.name}

                                {hasVoted ? (
                                    <span className='text-blue-500'>{getChoicePercentage(choice)}% </span>
                                ) :  <Button onClick={() => userVote(choice._id)}>Äänestä</Button>}
                            </div>
                        )
                    })}

                    {hasVoted ? (
                        <div>
                            <Map pollWinner={noob} />
                        </div>
                    ): null}
                </div>
            ) : null}
        </div>
    )
}
