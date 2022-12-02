import React from 'react';

type PaletteProps = {
  onClick: any //capire che tipo mettere
  content: number
  block: boolean
  onClickDelete: any
  onClickMerge: any
}

function Palette({ onClick, content, block, onClickDelete, onClickMerge }: PaletteProps) {
  return (
    <>
      <span onClick={onClick} className={'palette-card'}>
        {content}
        <button onClick={onClickDelete} className={`${block ? 'btn-del hide' : 'hidden'}`}>x</button>
        <button onClick={onClickMerge} className={"btn-merge hide"}>+</button>
      </span>
    </>
  )
}

export default Palette
