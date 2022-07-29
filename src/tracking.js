/* eslint-disable no-console */
import { use } from '@wordpress/data';

const REDUX_TRACKING = {
	'core/notices': {
		createErrorNotice: () => undefined,
	},
};

use( ( registry ) => ( {
	dispatch: ( namespace ) => {
		const namespaceName =
			typeof namespace === 'object' ? namespace.name : namespace;
		const actions = registry.dispatch( namespaceName );
		const trackers = REDUX_TRACKING[ namespaceName ];
		if ( trackers ) {
			Object.keys( trackers ).forEach( ( actionName ) => {
				const originalAction = actions[ actionName ];
				const tracker = trackers[ actionName ];
				actions[ actionName ] = ( ...args ) => {
					if ( typeof tracker === 'function' ) {
						tracker( ...args );
					}
					return originalAction( ...args );
				};
			} );
		}
		return actions;
	},
} ) );
