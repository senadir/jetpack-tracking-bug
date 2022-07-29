import { useDispatch, useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

import './tracking';

export default function Edit() {
	const { createErrorNotice } = useDispatch( 'core/notices' );

	useSelect( () => {
		return ( message ) => {
			createErrorNotice( message );
		};
	}, [ createErrorNotice ] );

	return <p { ...useBlockProps() }>test</p>;
}
