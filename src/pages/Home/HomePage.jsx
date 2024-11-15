import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx';
import {
	getAll,
	getAllByTag,
	getAllTags,
	search,
} from '../../services/productService.js';
import Search from '../../components/Search/Search.jsx';
import Tags from '../../components/Tags/Tags.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

const initialState = { products: [], tags: [] };

const reducer = (state, action) => {
	switch (action.type) {
		case 'PRODUCTS_LOADED':
			return { ...state, products: action.payload };
		case 'TAGS_LOADED':
			return { ...state, tags: action.payload };
		default:
			return state;
	}
};

function HomePage() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { products, tags } = state;
	const { searchTerm, tag } = useParams(); // obtiene los parametros

	useEffect(() => {
		getAllTags().then((tags) =>
			dispatch({ type: 'TAGS_LOADED', payload: tags })
		);

		const loadProducts = tag
			? getAllByTag(tag)
			: searchTerm
			? search(searchTerm)
			: getAll();
		loadProducts.then((productsResponse) =>
			dispatch({ type: 'PRODUCTS_LOADED', payload: productsResponse })
		);
	}, [searchTerm, tag]);

	return (
		<div>
			<Search />
			<Tags tags={tags} />
			{products.length === 0 && <NotFound linkText="Restablecer Búsqueda" />}
			<Thumbnails products={products} />
		</div>
	);
}

export default HomePage;
