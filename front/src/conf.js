const _navs = [
	{
		title: '首页',
		path: '/',
		exact: true,
	},
	{
		title: '前端',
		path: '/front-end',
		exact: false,
		// isActive(pathname){
		// 	return pathname === "/" || pathname.split('/').indexOf('front-end') > -1
		// }
	},
	{
		title: '后端',
		path: '/back-end',
		exact: false,
	}
];

const _subNavs = {
	"front-end": [
		{
			title: 'React',
			path: '/front-end/react',
			exact: false,
			isActive(pathname){
				return pathname === '/front-end'|| pathname === '/front-end/react' 
			}
		},
		{
			title: 'Vue',
			path: '/front-end/vue',
			exact: true
		},
		{
			title: 'Threejs',
			path: '/front-end/threejs',
			exact: true
		},
	],
	"back-end": [
		{
			title: 'Node',
			path: '/back-end/node',
			isActive(pathname){
				return pathname === '/back-end'|| pathname === '/back-end/node';
			},
			exact: true
		},
		{
			title: 'Express',
			path: '/back-end/express',
			exact: true
		},
		{
			title: 'Koa',
			path: '/back-end/koa',
			exact: false
		},
		
	]
}

const _classify = [
	{id: 1, type: 'front-end', name: '前端', parentId: 0},
	{id: 2, type: 'back-end', name: '后端', parentId: 0},
	{id: 3, type: 'diary', name: '日记', parentId: 0},
	{id: 4, type: 'database', name: '数据库', parentId: 0},
	{id: 5, type: 'js', name: 'JavaScript', parentId: 1},
	{id: 6, type: 'react', name: 'React', parentId: 1},
	{id: 7, type: 'vue', name: 'Vue', parentId: 1},
	{id: 8, type: 'threejs', name: 'Threejs', parentId: 1},
	{id: 9, type: 'webgl', name: 'WebGL', parentId: 1},
	{id: 10, type: 'node', name: 'Node', parentId: 2},
	{id: 11, type: 'koa', name: 'Koa', parentId: 2},
	{id: 12, type: 'express', name: 'Express', parentId: 2},
	{id: 13, type: 'flask', name: 'Flask', parentId: 2},
	{id: 14, type: 'financing', name: '理财', parentId: 3},
	{id: 15, type: 'health', name: '健康', parentId: 3},
	{id: 16, type: 'think', name: '观点与感悟', parentId: 3},
	{id: 17, type: 'mysql', name: 'MySQL', parentId: 4},
	{id: 18, type: 'mongodb', name: 'MongoDB', parentId: 4}
]

let navs = [
	{
		title: '首页',
		path: '/',
		exact: true,
	}
]
let subNavs = {}

_classify.forEach(item => {
	if (+item.parentId === 0) {
		navs.push({
			id: item.id,
			title: item.name,
			type: item.type,
			path: `/${item.type}`
		})
	}
})

// 生成二级分类
navs.forEach(item => {
	if (item.path !== '/') {
		subNavs[item.type] = []
		_classify.forEach(i => {
			if (i.parentId === item.id) {
				const o = {
					id: i.id,
					title: i.name,
					path: `/${item.type}/${i.type}`, // '/front-end/react'
					exact: true,
				}
				// 如果是第一项, 则需要设置isActive
				if (subNavs[item.type].length === 0) {
					o.isActive = (pathname) => pathname === `/${item.type}` || pathname === `/${item.type}/${i.type}`
				}
				
				subNavs[item.type].push ( o )
			}
		})
	}
})

console.log(navs, subNavs)

export {
	navs,
	subNavs
}