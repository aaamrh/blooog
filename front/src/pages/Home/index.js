import { lazy, Suspense, useState, useEffect, memo, useMemo, useRef } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '../../components/ArticleCard';
import axios from 'axios';
import RhNav from '../../components/RhNav';

import  '../../mock/test.mock';
import useLoadmore from '../../hooks/useScroll';
import { getNav } from '../../utils/getNav';
import ArticleApi from '../../api/article';
import { useGetArticles } from '../../store/action/article';
import { GET_ARTICLES, GET_MORE_ARTICLES } from '../../store/reducer/articles';
import { useGetClassify } from '../../store/action';
import { SET_CURRENT_CLASSIFY } from '../../store/reducer/classify';
import img from '/public/images/3dr_mono.png'

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

// 计算函数
function computedTransform(num, doc) {
  return (num / doc * 30 - 15).toFixed(1)
}

// 计算
function computedBGPosition(num, doc) {
  return (60 - Number((num / doc * 70).toFixed(1)) + '%')
}

function Home (props) {
	const { data: classifies, curClassify } = useSelector(state => state.classify)
	const { data: articles, count } = useSelector(state => state.articles)
	const { pathname } = useLocation()
	const params = useParams()
	const getArticles = useGetArticles()
	const dispatch = useDispatch()
	const [domRef, isLoadingMore, msg] = useLoadmore()
	const ctntRef = useRef()
	const cardRef = useRef()
	const imgRef = useRef()

	let { subNavs = [] } = getNav(classifies);
	let subNav = subNavs[`${pathname.split('/')[1]}`] || [];

	const getArticleType = () => {
		let type ='';

		if (pathname === '/') {
			type = 'all'
		} else if ( params?.type ) {
			type = params.type
		} else {
			type = subNav[0]?.type
		}

		dispatch({ type: SET_CURRENT_CLASSIFY, classify: type })
	}

	useEffect(() => {
		if (ctntRef.current) {
			console.log('didmount')
			document.addEventListener('mousemove', (e) => {
				// cardRef.current.style.transform = `
				// 	rotateX(${-computedTransform(e.clientY, window.innerHeight)}deg)
				// 	rotateY(${computedTransform(e.clientX, window.innerWidth)}deg)
				// `
				cardRef.current.style.backgroundPosition = `
					${computedBGPosition(e.clientX, window.innerWidth)} 
					${computedBGPosition(e.clientY, window.innerHeight)}
				`
				imgRef.current.style.transform = `
					translateX(${-computedTransform(e.clientX, window.innerWidth)}px)
					translateY(${computedTransform(e.clientY, window.innerHeight)}px)
				`

			})
		}
	}, [])

	// FIXME: 获取到分类后才能获取初始化的数据
	useEffect(() => {
		if (count === -1) { getArticleType() }
	}, [classifies])

	useEffect(() => {
		getArticleType() // 切换导航, 则获取分类
	}, [pathname])

	useEffect(() => {
		getArticles(curClassify, 0, GET_ARTICLES)
	}, [curClassify])

	return <div className="page-home" ref={ctntRef}>
		<RhNav className='nav' navlist={subNav} pathname={pathname} />

		<div className="content" ref={ domRef } >
			{/* 中间主要内容部分 */}
			<div className="alpha">
				{
					articles.length > 0 && 
					articles.map((article, index) => {
						return <ArticleCard 
							key={index}
							article={article}
						/>
					})  
				}
				<p className='msg'>{ msg }</p>
			</div>

			{/* 右侧栏 */}
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

				<div className="m-book type-a">
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

				<div className="m-card" >
					<div className="card" ref={ cardRef }>
						<img ref={imgRef} src={img} alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Home;