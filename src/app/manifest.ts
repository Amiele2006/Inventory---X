import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
	return {
		name: 'Inventory-x',
		short_name: 'Inventory-x',
		description: '...',
		start_url: '/',
		display: 'standalone',
		background_color: '#000',
		theme_color: '#fff',
		icons: [
			{
				src: '/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: '/web-app-manifest-512x512.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	};
};

export default manifest;
