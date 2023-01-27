package com.capacitor.custom.googlemaps

import com.google.android.gms.maps.model.LatLng
import org.json.JSONObject

class GoogleMapCircleConfig(center: JSONObject, radius: Double, strokeColor: String, fillColor: String, strokeWidth: Int) {
    var coordinate: LatLng =  LatLng(0.0, 0.0)
    var radius: Double = radius
    var strokeColor: String = strokeColor
    var fillColor: String = fillColor
    var strokeWidth: Int = strokeWidth

    init {
            if(!center.has("lat") || !center.has("lng")) {
                throw InvalidArgumentsError("LatLng object is missing the required 'lat' and/or 'lng' property")
            }

            val lat = center.getDouble("lat")
            val lng = center.getDouble("lng")
            coordinate = LatLng(lat, lng)
    }


}