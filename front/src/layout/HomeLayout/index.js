import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import RhNav from '../../components/RhNav';
import RhProgress from '../../components/RhProgress';
import { getNav } from '../../utils/getNav';

function HomeLayout (props) {
	const {pathname} = useLocation();
	const [progressWidth, setProgressWidth] = useState(0);
	const { data: classify } = useSelector(state => state.classify)
	const { navs = [] } = getNav(classify)

	let onScroll = (e)=>{
		const { scrollHeight, scrollTop, offsetHeight } = e.target;
		let overflowHeight = scrollHeight - offsetHeight;
		setProgressWidth(scrollTop / overflowHeight * 100 + '%') ;
	}

	return <div className="page-home-layout">
		<RhProgress width={progressWidth} />

		{/* 左侧自我介绍 */}
		<div className="profile">
			{/* <div className="avatar">
				<img src="/avatar.png" alt='头像' />
			</div> */}
			<div className="monster" title="CSS大眼仔">
				<div className="eye"></div>
			</div>
			<h1 className="name">山海行</h1>
			<div className="intro">
				<h3 className="tit">名字由来</h3>
				<code>
					很喜欢《让大象飞》中，行动教育集团董事长李践的推荐语：
					<p className="underline highlight">高高山顶立，深深海底行。</p>
					<p className="underline highlight">无论做人、做事、做企业还是写书，高度和深度的结合都非常重要。</p>
					{/* 于是起名：<b className="underline">山海行</b>。 */}
				</code>
			</div>
		</div>
		<div className="main">
			<header>
				<RhNav className="nav" navlist={navs} pathname={pathname} />
				<Link to='/e'>写文章</Link>
			</header>
			<section className="body" onScroll={onScroll}>
				{ props.children }
			</section>
		</div>
	</div>
}

export default HomeLayout;