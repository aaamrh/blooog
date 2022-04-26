const navs = [
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

const subNavs = {
	"/front-end": [
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
	"/back-end": [
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
			exact: true
		},
		
	]
}

export {
	navs,
	subNavs
}