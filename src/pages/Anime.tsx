import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

import { GET_ANIME } from '../queries'
import { Status } from '../components/Status'
import { AnimeInfos } from '../components/AnimeInfos'
import { AnimeStatistics } from '../components/AnimeStatistics'
import { EpisodesSeen } from '../components/EpisodesSeen'

export const AnimePage = () => {
  const { animeID } = useParams() as { animeID: string }

  const { loading, data, error } = useQuery(GET_ANIME, {
    variables: { animeID: Number(animeID) }
  })

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Not found</h1>

  const {
    media_type,
    status,
    studios,
    source,
    num_episodes,
    start_date,
    end_date,
    popularity,
    rank,
    num_list_users,
    my_list_status,
    num_scoring_users
  } = data.anime

  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      <Grid item lg={3}>
        <img
          style={{ borderRadius: '3px', width: '100%' }}
          src={data.anime.main_picture.medium}
        />
        <Status my_list_status={my_list_status} />
        {my_list_status && (
          <EpisodesSeen
            num_episodes={num_episodes}
            num_episodes_watched={my_list_status.num_episodes_watched}
          />
        )}
      </Grid>
      <Grid item lg={6}>
        <Typography variant="h5" color="primary">
          {data.anime.title}
        </Typography>
        <Typography variant="body2" paragraph>
          {data.anime.synopsis}
        </Typography>
        <Grid container spacing={1}>
          {data.anime.genres.map((genre: any) => (
            <Grid item>
              <Chip
                size="small"
                key={genre.id}
                color="primary"
                label={genre.name}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <Typography variant="button">Statistics</Typography>
        <AnimeStatistics
          popularity={popularity}
          rank={rank}
          num_list_users={num_list_users}
        />
        <Typography variant="button">Information</Typography>
        <AnimeInfos
          media_type={media_type}
          status={status}
          studios={studios}
          source={source}
          start_date={start_date}
          end_date={end_date}
          num_episodes={num_episodes}
        />
      </Grid>
    </Grid>
  )
}
