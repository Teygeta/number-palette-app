import React from "react";
import { useState } from "react";
import "./App.css";
import Palette from "./components/palette";
import Nav from "./components/nav";

type PaletteType = {
	value: number
	id: number
};

function App() {
	const genRandomNum = () => {
		return Math.floor(Math.random() * 100);
	};

	const genRandomId = () => {
		return Math.floor(Math.random() * 1000);
	};

	const initPalette = [
		{ value: genRandomNum(), id: genRandomId() },
		{ value: genRandomNum(), id: genRandomId() },
		{ value: genRandomNum(), id: genRandomId() },
		{ value: genRandomNum(), id: genRandomId() },
		{ value: genRandomNum(), id: genRandomId() },
	]

	const [palettes, setPalette] = useState(initPalette);

	// HANDLE EVENTS
	const handleChangeSingle = (id: Number) => {
		const newPalette = palettes.map((palette: PaletteType) => {
			if (palette.id === id) {
				return { ...palette, value: genRandomNum() };
			}
			return palette;
		});
		setPalette(newPalette);
	}

	const handleChangeAll = () => {
		const newPalette = palettes.map((palette: PaletteType) => {
			return { ...palette, value: genRandomNum() };
		});
		setPalette(newPalette);
	}

	const handleAdd = () => {
		if (palettes.length < 10) {
			const newPalette = [...palettes, { value: genRandomNum(), id: palettes.length + 1 },];
			setPalette(newPalette);
		} else false;
	};

	const handleDelete = (id: Number) => {
		const newPalette = palettes.filter((palette: PaletteType) => palette.id !== id);
		setPalette(newPalette);
	}

	const handleReset = () => {
		palettes.length > 5
			? setPalette(initPalette)
			: false;
	};

	const handleMerge = (item: PaletteType, index: number) => {
		if (palettes.length < 10) {
			const calcPalette = Math.floor(((item.value + palettes[index + 1].value) / 2));
			let palettesArray = [...palettes];
			palettesArray.splice(index + 1, 0, { value: calcPalette, id: item.id + 1 });
			setPalette(palettesArray);
		} else alert("You can't add more than 10 palettes");
	}

	return (
		<div className={'app'}>
			<Nav
				addClick={handleAdd}
				changeAllClick={handleChangeAll}
				resetClick={handleReset}
				palettes={palettes}
			/>
			<div className={"palette-container flex m-2 justify-center align-center pointer"}>
				{palettes.map((item: PaletteType, index: number) => {
					return (
						<Palette
							key={index}
							block={palettes.length > 5}
							onClick={() => handleChangeSingle(item.id)}
							content={item.value}
							onClickDelete={(e: React.ChangeEvent<HTMLInputElement>) => {
								//stopPropagation per evitare un 'doppio evento' (il click sia su delete che su change)
								e.stopPropagation();
								handleDelete(item.id)
							}}
							onClickMerge={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.stopPropagation();
								handleMerge(item, index)
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
