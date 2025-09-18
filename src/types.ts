export type Resource = 'Wood' | 'Brick' | 'Sheep' | 'Wheat' | 'Rock';

export type Hex = {
	number: number;
	resource: Resource;
};

export type Settlement = {
	id: string;
	hexes: Hex[];
	multiplier: number; // 1 = settlement, 2 = city
};
