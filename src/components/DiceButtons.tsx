type Props = {
	action: (n: number) => void;
	selectedNumber: number;
};

export default function DiceButtons({ action, selectedNumber }: Props) {
	return (
		<div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-3">
			{Array.from({ length: 11 }, (_, i) => i + 2)
				.filter((n) => n !== 7)
				.map((n) => (
					<button key={n} onClick={() => action(n)} className={`px-4 py-3 rounded-lg border text-base ${selectedNumber === n ? 'bg-blue-200 text-blue-900' : 'bg-gray-50'}`}>
						{n}
					</button>
				))}
		</div>
	);
}
