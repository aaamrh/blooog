import { lazy, Suspense, useState, useEffect, memo, useMemo } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ArticleCard from '../../components/ArticleCard';
import axios from 'axios';
import RhNav from '../../components/RhNav';

import  '../../mock/test.mock';
import useLoadmore from '../../hooks/useScroll';
import { getNav } from '../../utils/getNav';
import ArticleApi from '../../api/article';

let canGetMoreArticles = true; // 是否可以获取更多文章

function onScroll(cb) {
	return function(e){
		const { scrollHeight, offsetHeight, scrollTop } = e.target;
			if( scrollHeight <= offsetHeight + scrollTop + 200 ){
				if( canGetMoreArticles ){
					canGetMoreArticles = false;
					cb()
				}
			}
	}
}

function Home (props) {
	const {pathname} = useLocation()
	const history = useHistory()
	const params = useParams()
	const [articles, setArticles] = useState([])
	const { data: classify } = useSelector(state => state.classify)

	const getMoreArticles1 = function() {
		return axios.get('/api/articles/more')
		// .then(res=>{
		// 	const { code, data } = res;
		// 	console.log(data)
		// 	// setArticles(state => state.concat(data.data));
		// })
	}	

	const [loadMore, domRef, data] = useLoadmore(getMoreArticles1)

	useEffect(() => {
		if (data) {
			setArticles(state => state.concat(data.data));
		}
	}, [data])

	let { subNavs = [] } = getNav(classify);
	let subNav = subNavs[`${pathname.split('/')[1]}`] || [];

	// 获取二级分类的默认项
	const getDefaultSecC = () => {
		/** 
		 * /fornt-end/ -> ['', 'front-end', '']
		 * /fornt-end -> ['', 'front-end']
		 */ 
		const firstC = pathname.split('/')[1]
		return subNavs[firstC].find(item => item.isActive)?.type
	}

	// 首页是 所有文章,最新的
	// 
	useEffect(()=>{
		// 有二级分类直接请求API, 没有则获取默认二级分类然后请求
		if (params.type) {
			ArticleApi.getArticles({
				params: { type: params.type }
			}).then(res => {
				const { code, data } = res;
				const { count, articles } = data.data
				if(!code){ setArticles(articles) }
			})
		} else {
		}
	}, []);

	return <div className="page-home">
		<RhNav className='nav' navlist={subNav} pathname={pathname} />

		<div className="content"
			// onScroll={onScroll(getMoreArticles)}
			ref={ domRef }
		>
			<div className="alpha">
					{/* <ArticleCard 
						title="JavaScript 入门"
						content="The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
						Line 28:32:  The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provid"
						time="2022-02-11 12:32"
						read="115"
					/> */}
					{
						articles.length > 0 && 
						articles.map((article, index) => {
							return <ArticleCard 
								key={index}
								article={article}
							/>
						})  
					}
			</div>
			<div className="beta">
				
				<div className="m-cube">
					<div className="cube">
						<div className="front surface"> 博学 </div>
						<div className="surface left"> 笃行 </div>
						<div className="surface right"> 厚德 </div>
						<div className="surface bottom"> 重法 </div>
						<div className="surface top"> 克己 </div>
						<div className="surface back"> 慎独 </div>
					</div>
				</div>

				<div className="m-book">
					<div className="page page-1">
						<h1 className="title">《令人哇塞的网站》</h1>
						<div className='bear'>
							<div className="content"></div>
						</div>
					</div>
					<div className="page page-2">
						<ul className='list'>
							<li><a href="https://www.ruanyifeng.com/blog/archives.html" target={'_blank'}>阮一峰</a></li>
							<li><a href="https://www.zhangxinxu.com/" target={'_blank'}>张鑫旭</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Home;