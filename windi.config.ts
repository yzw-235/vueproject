import {defineConfig} from 'vite-plugin-windicss'

export default defineConfig({
    darkMode: 'class',
    plugins: [createEnterPlugin()],
    theme: {
        extend: {
            zIndex: {
                '-1': '-1'
            },
            colors:{
                primary: 'primaryColor'
            },
            screens: {
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1600px'
            }

        }
    }    
})
/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
// 当元素之间重叠的时候，z-index 较大的元素会覆盖较小的元素在上层进行显示。
// 元素将保留由最后一个关键帧设置的样式值forwards
// ...将一个数组转为用逗号分隔的参数序列。
function createEnterPlugin(maxOutput = 6){
    const createCss = (index:number,d ='x') => {
        const upd = d.toUpperCase()
        return {
            [`*> .enter-${d}:nth-child(${index})`]: {
                transform: `translate${upd}(50px)`,
            },
            [`*> .enter-${d}:nth-child(${index})`]: {
                transform: `translate${upd}(50px)`,
            },
            [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:ntd-child(${index})`]: {
                'z-index': `${10 - index}`,
                opacity: 0,
                animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
                'animation-fill-mode': `forwards`,
                'animation-delay': `${(index * 1) / 10}s`
            },
        }
    }
    const handler = ({addBase}) => {
        const addRawCss = {}
        for(let index = 1; index < maxOutput; index++){
            Object.assign(addRawCss, {
                ...createCss(index, 'x'),
                ...createCss(index, 'y')
            })
        }
        addBase({
            ...addRawCss,
            [`@keyframs enter-x-animation`]: {
                to:{
                    opacity: '1',
                    transform: 'translateX(0)'
                }
            },
            [`@keyframs enter-y-animation`]: {
                to: {
                    opacity: '1',
                    transform: 'translateY(0)'
                }
            }
        })
    }
    return { handler }
}