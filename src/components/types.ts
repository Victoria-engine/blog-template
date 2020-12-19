import { VictoriaClient } from 'victoria-sdk/lib/core'
import { Blog } from '../pages/types'


export interface NavbarProps {
  blog: Blog,
}

export type UseVictoria = Blog & {
  client: VictoriaClient
}