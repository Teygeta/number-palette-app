import React from 'react'

type NavProps = {
	addClick: any //capire che tipo mettere
	changeAllClick: any
	resetClick: any
	palettes: any
}

export default function Nav({ addClick, changeAllClick, resetClick, palettes }: NavProps) {
	return (
		<>
			<div className={"text-center flex justify-around m-4 w-full"}>
				<button onClick={addClick} className={`${palettes.length < 10 ? "btn" : "btn-disable cursor-not-allowed"}`}>
					Add palette
				</button>
				<br />
				<button onClick={changeAllClick} className={"btn"}>
					Change all value
				</button>
				<br />
				<button
					onClick={resetClick}
					className={`${palettes.length > 5 ? "btn" : "btn-disable cursor-not-allowed"}`}
				>
					Reset
				</button>
			</div>
		</>
	)
}
