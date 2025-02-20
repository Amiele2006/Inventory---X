import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Page Not Found ;( ~ Memoire',
	description: 'The page you requested for does not exist.'
};

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-svh gap-y-4'>
			<Image
				src='/images/error-dark.svg'
				height='300'
				width='300'
				alt='Error'
				fetchPriority='high'
				className='hidden dark:block'
			/>
			<Image
				src='/images/error-light.svg'
				height='300'
				width='300'
				alt='Error'
				fetchPriority='high'
				className='block dark:hidden'
			/>
			<h2 className='text-xl font-medium'>Page Not Found ;</h2>
			<Link href='/'>
				<button 
				style={{ borderRadius: '10px' }}
                className="w-full rounded-lg bg-[#1C2331] px-6 py-4 text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
				>
					Go home
				</button>
			</Link>
		</div>
	)
}

