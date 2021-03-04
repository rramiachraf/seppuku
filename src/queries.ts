import { gql } from '@apollo/client'

export const GET_ANIME = gql`
  query GET_ANIME($animeID: Int!) {
    anime(animeID: $animeID) {
      title
      synopsis
      media_type
      num_episodes
      status
      mean
      main_picture {
        medium
      }
      genres {
        id
        name
      }
      studios {
        name
      }
      source
      start_date
      end_date
      rank
      popularity
      num_list_users
      num_scoring_users
      my_list_status {
        status
        num_episodes_watched
      }
    }
  }
`

export const GET_AUTH_USER = gql`
  {
    me {
      name
      picture
    }
  }
`

export const GET_OAUTH_LINK = gql`
  {
    getOauthLink
  }
`

export const UPDATE_ANIME_STATUS = gql`
  mutation updateAnimeStatusMutation($animeID: Int!, $status: AnimeStatus!) {
    updateAnimeStatus(animeID: $animeID, status: $status)
  }
`

export const UPDATE_SEEN_EPISODES = gql`
  mutation updateSeenEpisodesMutation($animeID: Int!, $watchedEpisodes: Int!) {
    updateAnimeEpisodes(animeID: $animeID, watchedEpisodes: $watchedEpisodes)
  }
`
