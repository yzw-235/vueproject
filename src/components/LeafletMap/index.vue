<script setup lang="ts">
import  {L} from 'leaflet';
import ref from 'vue'
const map = L.map('map',{
    preferCanvas: false,
    attributionControl: false,
    doubleClickZoom: true,
    boxZoom: true,
    closePopupOnClick: true,
    trackResize: true,
    scrollWheelZoom: true,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60,
    keyboard: false,
    crs: L.CRS.EPSG3857,
    center: [],
    zoom: 4,
    minZoom: 1,
    maxZoom: 4,
    layers: [],
    maxBounds: null,
    renderer: L.Canvas,
    zoomAnimation: true,
    zoomAnimationThreshold: 4,
    fadeAnimation: true,
    markerZoomAnimation: true
})


</script>
<template>
    <div id="map"></div>
</template>