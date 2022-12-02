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

	const initPalette = [
		{ value: genRandomNum(), id: 1 },
		{ value: genRandomNum(), id: 2 },
		{ value: genRandomNum(), id: 3 },
		{ value: genRandomNum(), id: 4 },
		{ value: genRandomNum(), id: 5 },
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
			console.log(palettes[0]);

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

	const handleMerge = (item: PaletteType) => {
		if (palettes.length < 10) {
			const calcPalette = Math.floor(((item.value + palettes[item.id].value) / 2));
			/* const newPalette = [...palettes, { value: calcPalette, id: palettes.length + 1 }]; */
			let palettesArray = [...palettes];
			palettesArray.splice(item.id, 0, { value: calcPalette, id: palettes.length + 1 });
			console.log(palettesArray);
			setPalette(palettesArray);

		} else false;
		/* TODO trovare il modo di inserire il nuovo oggetto in un punto preciso dell'oggetto splice(index, elem da replicare, elem)*/
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
								handleMerge(item)
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
