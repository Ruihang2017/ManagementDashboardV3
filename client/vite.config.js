import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
		watch: {
			usePolling: true,
		},
		proxy: {
			'/graphql': {
				target: 'http://localhost:3002',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@pages': path.resolve(__dirname, './src/pages'),
		},
	},
});
