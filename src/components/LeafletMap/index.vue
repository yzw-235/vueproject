<script setup lang="ts">
import { L } from 'leaflet';
import { ref, reactive, nextTick, shallowReactive, isReactive ,computed} from 'vue'
import type { Ref } from 'vue'
import { extend } from '@vue/shared';
const map = L.map('map', {
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
//拓展类 ，创建自定义方法
L.TileLayer.CustomTencent = L.TileLayer.extend({
    getTileUrl: function(coords){
        //腾讯坐标处理
        coords.y = Math.pow(2, coords.x) - coords.y -1; 
        return L.TileLayer.prototype.getTileUrl.call(this, coords)
    }
})
L.tileLayer.tencent = function(templateUrl, options){
    return new L.TileLayer.CustomTencent(templateUrl,options)
}

L.tileLayer.tencent("url",{
    minZoom: 3,
    maxZoom: 4,
    tms: false,
    continuousWorld: 'false',
    noWarp: false,
    defaultRadius: 1
}).addTo(map)
//响应式对象其实是 JavaScript Proxy，其行为表现与一般对象相似。不同之处在于 Vue 能够跟踪对响应式对象属性的访问与更改操作
//创建响应式变量
const number = ref(2);
console.log('number ', number)//{value : 2}
const year: Ref<String | Number> = ref('2020')
//一个包含对象类型的ref可以响应式的替换整个对象
const objectRef = ref({ count: 0 })
//这是响应式的替换
objectRef.value = { count: 1 }
//ref被传递给函数或是从一般对象上被解构时，不会失去响应式
const obj = {
    foo: ref(1),
    bar: ref(2)
}
// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
//callSomeFunction(obj.foo)
const {foo, bar} = obj;
// ref() 让我们能创造一种对任意值的 “引用”，
//并能够在不丢失响应性的前提下传递这些引用。这个功能很重要，因为它经常用于将逻辑提取到 组合函数 中。

const month = ref<string | number>('8')

interface Book {
    title: string
    year?: number
}
const book: Book = reactive({ title: 'Vue3 指引' })
//创建一个响应式对象或数组 深层
const states = reactive({
    count: 0,
    nested: { count: 0 },
    arr: ['foo', 'bar']
})

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = states.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = states
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
//callSomeFunction(state.count)

// ref 在模板中的解包
const count2= ref(0);
//{{ count2++ }}
// const object = { foo: ref(0)} {{object.foo+1}} [object Object]1
// const { foo } = object {{foo + 1}} 2

const state2 = reactive({count2})
console.log(state2.count2) //0
state2.count2 = 2
console.log(count2.value) //2
//跟响应式对象不同，当 ref 作为响应式数组或像 Map 这种原生集合类型的元素被访问时，不会进行解包。
const books = reactive([ref('Vue3 Guide')])
console.log(books[0].value)
const map2 = reactive(new Map([['count',ref(0)]]))
console.log(map2.get('count').value)

//计算属性
const author = reactive({
    name: 'jack',
    books: [
        "apple",
        'orange',
        'banana'
    ]
})
const publishedBookMessage = computed<string>(() => {
    return author.books.length == 2 ? 'yes' : 'no'
})
const firstname = ref('li')
const lastname = ref('si')
//不要在 getter 中做异步请求或者更改 DOM！
//从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。
const fullname = computed<string>({
    get(){
        return firstname + " " + lastname
    },
    set(newValue){
        [firstname.value, lastname.value] = newValue.split(' ')
    }
})
//计算属性值会基于其响应式依赖被缓存
//方法调用总是会在重渲染发生时再次执行函数。
console.log(publishedBookMessage.value)

//浅层
const sta = shallowReactive({
    foo: 1,
    nested: {
        bar: 2
    }
})
sta.foo++;
isReactive(sta.nested) //false
function increment() {
    states.count++;
    nextTick(() => {
        //等待更新完成
    })
}
function mutateDeeply() {
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