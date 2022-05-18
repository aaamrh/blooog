import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import App from './App';
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
				<Route path='/article' render={()=>
					<HomeLayout>
						<Switch>
							<Route path={['/article/:article_id']} component={PageArticle} />
						</Switch>
					</HomeLayout>
				}/>
				<Route path={['/editor', '/editor/:article_id']} exact component={Editor} />
				<Route path='/' render={()=>{
					return ( 
						<HomeLayout>
							{/* FIXME 更好的实现方式 */}
							<Route exact 
								path={[
									'/',
									'/front-end',
									'/front-end/:type',
									'/back-end',
									'/back-end/:type',
									'/diary',
									'/diary/:type',
									'/database',
									'/database/:type',
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