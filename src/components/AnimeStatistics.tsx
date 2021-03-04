import React from 'react'
import numeral from 'numeral'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'

interface AnimeStatisticsProps {
  popularity: number
  num_list_users: number
  rank: number
}

export const AnimeStatistics = ({
  rank,
  popularity,
  num_list_users
}: AnimeStatisticsProps) => (
  <List dense={true}>
    <ListItem>
      <ListItemIcon>
        <BarChartRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={`#${rank}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <TrendingUpRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={`#${popularity}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <GroupRoundedIcon />
      </ListItemIcon>
      <ListItemText
        primary={numeral(num_list_users).format('0.0a').toUpperCase()}
      />
    </ListItem>
  </List>
)
