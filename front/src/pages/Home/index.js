import { lazy, Suspense, useState, useEffect, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ArticleCard from '../../components/ArticleCard';
import axios from 'axios';
import RhNav from '../../components/RhNav';
import { subNavs } from '../../conf';
import { useGetClassifies } from '../../store/action';

import  '../../mock/test.mock';
import useLoadmore from '../../hooks/useScroll';

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
	const {pathname} = useLocation();
	const [articles, setArticles] = useState([]);
	const { classify } = useSelector(state => state.classify)

	const getMoreArticles1 = function() {
		return axios.get('/api/articles/more')
		.then(res=>{
			const { code, data } = res;
			console.log(data)
			// setArticles(state => state.concat(data.data));
		})
	}	

	const [loadMore, domRef, data] = useLoadmore(getMoreArticles1)

	// useGetClassifies()
	let subNav = subNavs[`/${pathname.split('/')[1]}`] || [];

	// 首页是 所有文章,最新的
	// 
	useEffect(()=>{
		axios.get('/api/articles').then(res=>{
			const { code, data } = res;
			console.log(res, '前后台调试成功')
			if(!code){ setArticles(data.data) }
		})		
	}, []);

	const getMoreArticles = function() {
		axios.get('/api/articles/more').then(res=>{
			const { code, data } = res;
			canGetMoreArticles = true;
			setArticles(articles.concat(data.data));
		})
	}	

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
								title={article.title}
								content={article.content}
								time={article.time}
								read={article.read}
								_id={article._id}
							/>
						})  
					}
			</div>
			<div className="beta">
				
				<div className="m-cube">
				内容构思中
					<div className="cube">
						<div className="front surface"> 博学 </div>
						<div className="surface left"> 笃行 </div>
						<div className="surface right"> 厚德 </div>
						<div className="surface bottom"> 重法 </div>
						<div className="surface top"> 克己 </div>
						<div className="surface back"> 慎独 </div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Home;