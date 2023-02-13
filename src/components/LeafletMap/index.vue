<script setup lang="ts">
import  {L} from 'leaflet';
import {ref,reactive,nextTick,shallowReactive,isReactive} from 'vue'
import type {Ref} from 'vue'
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
//创建响应式变量
const number = ref(2);
console.log('number ' ,number)//{value : 2}
const year : Ref<String | Number> = ref('2020')
    const month = ref<string | number>('8')

    interface Book {
        title: string
        year?:number
    }
    const book: Book = reactive({title: 'Vue3 指引'})
//创建一个响应式对象或数组 深层
const states = reactive({
    count : 0,
    nested: {count: 0},
    arr: ['foo','bar']
})

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = states.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } =  states 
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
//callSomeFunction(state.count)

//浅层
const sta = shallowReactive({
    foo: 1,
    nested: {
        bar: 2
    }
})
sta.foo++;
isReactive(sta.nested) //false
function increment(){
    states.count++;
    nextTick(() => {
        //等待更新完成
    })
}
function mutateDeeply(){
    //按照期望工作
    states.nested.count++;
    states.arr.push('naz')
}
const row = {}
const proxy = reactive(row)
console.log(row == proxy)//false

console.log(reactive(row) == proxy)//true
console.log(reactive(proxy) == proxy)//true
</script>
<template>
    <div id="map"></div>
</template>