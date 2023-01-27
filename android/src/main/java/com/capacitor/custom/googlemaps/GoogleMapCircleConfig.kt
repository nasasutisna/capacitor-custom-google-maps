package com.capacitor.custom.googlemaps

import com.google.android.gms.maps.model.LatLng
import org.json.JSONObject

class GoogleMapCircleConfig(center: JSONObject, radius: Double) {
    var coordinate: LatLng =  LatLng(0.0, 0.0)
    var radius: Double = radius

    init {
            if(!center.has("lat") || !center.has("lng")) {
                throw InvalidArgumentsError("LatLng object is missing the required 'lat' and/or 'lng' property")
            }

            val lat = center.getDouble("lat")
            val lng = center.getDouble("lng")
            coordinate = LatLng(lat, lng)
    }


}