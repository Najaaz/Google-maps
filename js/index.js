var markers =[]
var infoWindow;
var locationSelect;


function initMap(){
    var cmb = {lat:6.8742 , lng:79.8612};
    map = new google.maps.Map(document.getElementById('map'),{
        center: cmb,
        zoom: 16,
        mapTypeId: 'roadmap',
    });

    infoWindow = new google.maps.InfoWindow();
    displayStores()
    showStoreMarkers()
}

function showStoreMarkers(){
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store ,index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);

        var name = store.name
        var address = store.address.streetAddressLine1

        createMarker(latlng , name , address, index)
        bounds.extend(latlng)
    })
    map.fitBounds(bounds);
}


function createMarker (latlng, name , address , index){
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: `${index+1}`,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}


function displayStores(){
    var storesHtml = ''
    stores.forEach(function(stores , index){
        var address = stores.address
        var phonenumber = stores.PhoneNumber

        storesHtml += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address.streetAddressLine1}</span>
                            <span>${address.streetAddressLine2}</span>
                        </div>
                        <div class="store-phone-number">${phonenumber}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${index+1}</div>
                    </div>
                </div>
            </div>
            
        `
    })

    document.querySelector(".stores-list").innerHTML = storesHtml
}
