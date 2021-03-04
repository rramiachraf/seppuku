import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DoneIcon from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import Pause from '@material-ui/icons/Pause'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Schedule from '@material-ui/icons/Schedule'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { useMutation } from '@apollo/client'
import { UPDATE_ANIME_STATUS } from '../queries'
import { useParams } from 'react-router-dom'

interface MyListStatus {
  status: 'watching' | 'completed' | 'onHold' | 'dropped' | 'planToWatch'
}

interface StatusProps {
  my_list_status: MyListStatus | null
}

export const Status = ({ my_list_status }: StatusProps) => {
  const status = my_list_status ? my_list_status.status : my_list_status

  const options: MyListStatus['status'][] = [
    'watching',
    'completed',
    'onHold',
    'dropped',
    'planToWatch'
  ]

  const { animeID } = useParams() as { animeID: string }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(
    options.findIndex(option => option === status)
  )

  const [updateAnimeStatus] = useMutation(UPDATE_ANIME_STATUS)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSubmitting(true)
    setAnchorEl(null)
    updateAnimeStatus({
      variables: {
        animeID: Number(animeID),
        status: options.find((_, optionIndex) => optionIndex === index)
      }
    }).then(() => {
      setSelectedIndex(index)
      setSubmitting(false)
    })
  }
  return (
    <>
      <StatusMenu
        handleMenuItemClick={handleMenuItemClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        selectedItem={selectedIndex}
        options={options}
      />
      <Button
        disabled={submitting}
        startIcon={<StatusIcon status={options[selectedIndex]} />}
        variant="contained"
        color="primary"
        onClick={handleClick}
        fullWidth
      >
        {getStatus(options[selectedIndex])}
      </Button>
    </>
  )
}

interface StatusMenuProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  handleMenuItemClick: (e: any, index: number) => void
  selectedItem: number
  options: MyListStatus['status'][]
}

const StatusMenu = ({
  handleClose,
  anchorEl,
  handleMenuItemClick,
  selectedItem,
  options
}: StatusMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {options.map((option, index) => (
        <MenuItem
          selected={index === selectedItem}
          onClick={e => handleMenuItemClick(e, index)}
          key={option}
        >
          {getStatus(option)}
        </MenuItem>
      ))}
    </Menu>
  )
}

const getStatus = (status: MyListStatus['status'] | null) => {
  switch (status) {
    case 'watching':
      return 'Watching'
    case 'completed':
      return 'Completed'
    case 'dropped':
      return 'Dropped'
    case 'onHold':
      return 'On hold'
    case 'planToWatch':
      return 'Plan to watch'
    default:
      return 'Add to list'
  }
}

interface StatusIconProps {
  status: MyListStatus['status'] | null
}

const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === 'watching') return <PlayArrow />

  if (status === 'completed') return <DoneIcon />

  if (status === 'dropped') return <Clear />

  if (status === 'onHold') return <Pause />

  if (status === 'planToWatch') return <Schedule />

  return <AddRoundedIcon />
}
