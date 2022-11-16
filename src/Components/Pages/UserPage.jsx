import React, { useState, useEffect } from 'react'
import UserPageTemplate from '../Templates/UserPageTemplate'
import CardStore from '../../Modules/CardStore'

const gbsPlaylist = ['53434', '561', '1487', '821153', '187', '705996', '9437', '361743', '241', '8329']
let gbsPlaylistData = []

function UserPage() {
    const [gbsPick, setGbsPick] = useState(new Array(0))

    useEffect(() => {
        async function getGBSPick() {
            for (const element of gbsPlaylist) {
                let elementResult
                let ifNoOverview = false
                try {
                    await fetch(`https://api.themoviedb.org/3/movie/${element}?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`)
                        .then((response) => response.json())
                        .then((data) => {
                            elementResult = data
                            if (data.overview == '') ifNoOverview = true
                        })
                    if (ifNoOverview == true) {
                        await fetch(`https://api.themoviedb.org/3/movie/${element.id}?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=en-US`)
                            .then((response) => response.json())
                            .then((data) => (elementResult.overview = data.overview))
                    }
                    await fetch(`https://api.themoviedb.org/3/movie/${element}/images?api_key=6199da9940f55ef72ddc1512ea6eca9a`)
                        .then((response) => response.json())
                        .then((data) => {
                            elementResult.bigImage = data.backdrops[0].file_path
                            gbsPlaylistData.push(elementResult)
                        })
                } catch (error) {}
            }
            CardStore.increaseMaxCount(gbsPlaylistData.length)
            setGbsPick(gbsPlaylistData)
        }

        async function clearArray() {
            gbsPlaylistData = []
        }

        clearArray()
        getGBSPick()
    }, [])

    return <UserPageTemplate gbsPick={gbsPick}></UserPageTemplate>
}

export default UserPage
