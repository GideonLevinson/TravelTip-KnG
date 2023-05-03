import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const LOC_KEY = 'locDB'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
}

// onAddMarker-> nothing in loc.service
// onAddLoc-> addLoc
// onDeleteLocation-> deleteLoc
// onGoToLocation
// onCopyLocation
// onSearch

// Demo data, in 'pets' we had '_creatPets' to do it

// I want to add id, weather, createdAt, updatedAt 
const locs = [
    { id: 'AaBb1', name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id: 'AaBb2', name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getLoc(term) {
    console.log('Getting from Network')
    term = term.replaceAll(' ', '+')
    const API_KEY = 'AIzaSyCoOL7doqQx-Oz3NrSRgbw4yPpsMBvcAY8'
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${API_KEY}`)
        .then(res => res.data.results[0])
        .then(loc => ({
            name: loc.formatted_address,
            pos: loc.geometry.location
        }))
        .then(loc => {
            addLoc(loc)
        })
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function addLoc(loc) {
    console.log('adding...')
    const newLocId = utilService.makeId()
    loc['id'] = newLocId
    locs.push(loc)
}

function deleteLoc() {
    console.log('deleting...')
}

function getLocIdxById(locId) {
    getLocs()
        .then(res => {
            return locs.findIndex(loc => loc.id === locId)
        })
}
