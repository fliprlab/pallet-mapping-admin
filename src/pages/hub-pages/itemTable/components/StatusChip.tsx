import { Chip, Group, createStyles } from '@mantine/core';
import React, { memo, useState } from 'react'
import { COLORS } from '../../../../colors';

export type TItemStatus="all"|"created"|"asgin-grid"|"out"|"cancelled"

interface IProps{
    value:TItemStatus,
    setValue:React.Dispatch<React.SetStateAction<TItemStatus>>
}

const StatusChip:React.FC<IProps> = ({setValue,value}) => {
    const {classes} = useStyles()
  return (
    <Chip.Group multiple={false} value={value} onChange={(e)=>setValue(e as TItemStatus)}>
    {/* <Group position="center" > */}
      <Chip  color='blue' value="all">All</Chip>
      <Chip value="created">created</Chip>
      <Chip value="asgin-grid">Assgin grid</Chip>
      <Chip value="out">Out</Chip>
      <Chip value="cancelled">
        Cancelled
      </Chip>
    {/* </Group> */}
  </Chip.Group>
  )
}

export default memo(StatusChip)

const useStyles = createStyles({
    root: {
      borderColor: COLORS.primary,
      color: COLORS.primary,
      fontWeight: 500,
      fontSize: 16,
      padding: "10px 16px",
      "&:focus-visible": {
        outline: "none",
      },
    },
  });