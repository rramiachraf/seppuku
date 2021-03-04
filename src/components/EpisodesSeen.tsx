import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { UPDATE_SEEN_EPISODES } from '../queries'

interface EpisodesSeenProps {
  num_episodes: number
  num_episodes_watched: number
}

export const EpisodesSeen = ({
  num_episodes,
  num_episodes_watched
}: EpisodesSeenProps) => {
  const [seenEpisodes, setSeenEpisodes] = useState(Number(num_episodes_watched))
  const { animeID } = useParams() as { animeID: string }
  const [updateSeenEpisodes, { loading }] = useMutation(UPDATE_SEEN_EPISODES)

  const handleIncrementEpisodes = async () => {
    const watchedEpisodes = Number(num_episodes_watched) + 1
    await updateSeenEpisodes({
      variables: { animeID: Number(animeID), watchedEpisodes }
    })
    setSeenEpisodes(seenEpisodes + 1)
  }

  const handleInputChange = (e: any) => {
    const value = Number(e.target.value)
    setSeenEpisodes(value <= 100_000_000 ? value : 0)
  }

  const handleSeenEpisodesUpdate = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await updateSeenEpisodes({
        variables: { animeID: Number(animeID), watchedEpisodes: seenEpisodes }
      })
    }
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ marginTop: '5px' }}
    >
      <Grid item lg={8}>
        <TextField
          label={`Eps seen of ${num_episodes ? num_episodes : '?'}`}
          value={seenEpisodes}
          size="small"
          variant="outlined"
          disabled={loading}
          onChange={handleInputChange}
          onKeyUp={handleSeenEpisodesUpdate}
        />
      </Grid>
      <Grid item lg={4}>
        <Button
          title="Add Episode"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleIncrementEpisodes}
        >
          + 1
        </Button>
      </Grid>
    </Grid>
  )
}
