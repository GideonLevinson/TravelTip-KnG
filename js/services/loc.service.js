import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const LOC_KEY = 'locDB'

export const locService = {
    getLocs,
    addLoc,
    deletLoc,
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
console.log('locs:', locs)

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function get(locId) {
    return storageService.get(PET_KEY, petId)
}

function addLoc() {
    console.log('adding...')
}

function deletLoc() {
    console.log('deleting...')
}
