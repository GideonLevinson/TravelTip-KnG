import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch
window.renderLocs = renderLocs
window.onDelete = onDelete


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    getPosition()
    //: addlistenter
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            return pos
        })
        .then(pos => {
            const posLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            onPanTo(posLatLng)
            mapService.addMarker(posLatLng)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo({ lat, lng }) {
    mapService.panTo(lat, lng)
}

function onSearch() {
    const elInputSearch = document.querySelector('input[name=search]')
    const searchValue = elInputSearch.value
    locService.getLoc(searchValue)
        .then(res => locService.getLocs())
        .then(res => {
            console.log('res: ', res)
            renderLocs(res)
        })
}

function renderLocs(locations) {
    const elLocationsList = document.querySelector('.locations-container ul')

    const strHTML = locations.map(loc => {
        const { name, id } = loc
        const locationItem = `
                    <li class="location-item">
                       <h3>${name}</h3>
                       <button class="go-btn btn" onclick="onGo('${id}')">Go</button>
                       <button class="delete-btn btn" onclick="onDelete('${id}')" >Delete</button>
                    </li>
                `
        return locationItem
    })
    elLocationsList.innerHTML = strHTML.join('')
}

function onDelete(locId) {
    locService.deleteLoc(locId)
    locService.getLocs()
        .then(res => renderLocs(res))
}

function getLocById(locId) {
    const locs = getLocs()
    return locs.find(loc => loc.id === locId)
}