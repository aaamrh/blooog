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
  {id: 100, title: "前端", value: "front-end", pid: 0, },
  {id: 101, title: "JavaScript", value: "js", pid: 100, },
  {id: 102, title: "React", value: "react", pid: 100, },
  {id: 103, title: "Vue", value: "vue", pid: 100, },
  {id: 104, title: "Threejs", value: "threejs", pid: 100, },
  {id: 105, title: "WebGL", value: "webgl", pid: 100, },
  {id: 106, title: "CSS", value: "css", pid: 100, },
  // 后端
  {id: 200, title: "后端", value: "back-end", pid: 0, },
  {id: 201, title: "Node", value: "node", pid: 200, },
  {id: 202, title: "Koa", value: "koa", pid: 200, },
  {id: 203, title: "Express", value: "express", pid: 200, },
  {id: 204, title: "Flask", value: "flask", pid: 200, },
  // 日记
  {id: 300, title: "日记", value: "diary", pid: 0, },
  {id: 301, title: "理财", value: "financing", pid: 300, },
  {id: 302, title: "健康", value: "health", pid: 300, },
  {id: 303, title: "观点与感悟", value: "think", pid: 300, },
  // service
  {id: 400, title: "服务器", value: "service", pid: 0, },
  {id: 401, title: "Nginx", value: "nginx", pid: 400, },
  {id: 402, title: "MySQL", value: "mysql", pid: 400, },
  {id: 403, title: "MongoDB", value: "mongodb", pid: 400, },
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