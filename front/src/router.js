import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import App from './App';
import AuthRoute from './components/AuthRoute';
import AdminLayout from './layout/AdminLayout';
import HomeLayout from './layout/HomeLayout';
import PageArticle from './pages/Article';
import Editor from './pages/Editor';
import Home from './pages/Home';
import Login from './pages/Login';

function MyRouter () {
	return <BrowserRouter>
		<App>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/admin' render={()=>{
					return (
						<AdminLayout>
							<Switch></Switch>
						</AdminLayout>
					)
				}}/>

				{/* 文章 */}
				<Route path='/article' render={()=>
					<HomeLayout>
						<Switch>
							<Route path={['/article/:article_id']} component={PageArticle} />
						</Switch>
					</HomeLayout>
				}/>

				{/* 编辑器 */}
				<AuthRoute path={['/e', '/e/:article_id']} exact component={Editor} />

				{/* FIXME 更好的实现方式: 首页 */}
				<Route path='/' render={()=>{
					return ( 
						<HomeLayout>
							<Route exact 
								path={[
									'/',
									'/front-end/:type?',
									'/back-end/:type?',
									'/diary/:type?',
									'/database/:type?',
									'/service/:type?',
								]} 
								component={Home}  
							/>
						</HomeLayout>
					)
				}}/>
			</Switch>
		</App>
	</BrowserRouter>
} 

export default MyRouter;