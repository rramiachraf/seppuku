import React from 'react'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { parseStatus } from '../helpers/parseStatus'
import dayjs from 'dayjs'

interface AnimeInfosProps {
  status: string
  studios: { name: string }[]
  source: string
  num_episodes: number
  start_date: string
  end_date: string
  media_type: string
}

export const AnimeInfos = ({
  status,
  studios,
  source,
  num_episodes,
  start_date,
  end_date,
  media_type
}: AnimeInfosProps) => {
  const startDate = start_date ? dayjs(start_date).format('MMM DD, YYYY') : '?'
  const endDate = end_date ? dayjs(end_date).format('MMM DD, YYYY') : '?'

  return (
    <List dense={true}>
      <ListItemText primary="Type" secondary={media_type.toUpperCase()} />
      <ListItemText
        primary="Episodes"
        secondary={num_episodes !== 0 ? num_episodes : 'Unknown'}
      />
      <ListItemText primary="Status" secondary={parseStatus(status)} />
      <ListItemText
        primary="Studios"
        secondary={studios.map(({ name }) => name).join(', ')}
      />

      <ListItemText
        primary="Source"
        style={{ textTransform: 'capitalize' }}
        secondary={source}
      />
      <ListItemText primary="Aired" secondary={`${startDate} to ${endDate}`} />
    </List>
  )
}
