import './App.css';
import { useEffect } from 'react';
import AppRoutes from './AppRoutes.jsx';
import Header from './components/Header/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import { useLoading } from './hooks/useLoading.jsx';
import setLoadingInterceptor from './interceptors/loadingInterceptor.js';

function App() {
	const { showLoading, hideLoading } = useLoading();

	useEffect(() => {
		setLoadingInterceptor({ showLoading, hideLoading });
	}, []);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
		>
			<Header />
			<Loading />
			<AppRoutes />
		</div>
	);
}

export default App;
