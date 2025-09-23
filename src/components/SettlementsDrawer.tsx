import { useEffect, useState } from 'react';
import SettlementsList from './SettlementsList';
import type { Settlement } from '../types';

type SettlementsDrawerProps = {
	settlements: Settlement[];
	removeSettlement: (id: string) => void;
	toggleUpgrade: (id: string) => void;
};

export default function SettlementsDrawer({ settlements, removeSettlement, toggleUpgrade }: SettlementsDrawerProps) {
	const [open, setOpen] = useState(false);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);

	// Handle swipe gesture
	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			setTouchStartX(e.touches[0].clientX);
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (touchStartX === null) return;
			const diff = touchStartX - e.changedTouches[0].clientX;

			if (diff < -50) {
				// Swipe from right → open
				setOpen(true);
			} else if (diff > 50) {
				// Swipe left → close
				setOpen(false);
			}
			setTouchStartX(null);
		};

		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, [touchStartX]);

	return (
		<>
			{/* Backdrop */}
			{open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}

			{/* Drawer */}
			<div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
				<div className="p-4 border-b flex justify-between items-center">
					<h2 className="font-bold text-lg">Settlements</h2>
					<button onClick={() => setOpen(false)}>✕</button>
				</div>
				<div className="p-4 overflow-y-auto h-[calc(100%-3rem)]">
					<SettlementsList settlements={settlements} removeSettlement={removeSettlement} toggleUpgrade={toggleUpgrade} />
				</div>
			</div>
		</>
	);
}
