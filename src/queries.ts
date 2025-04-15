import { convexQuery } from '@convex-dev/react-query'
import { api } from '~/_generated/api'

export const randomTextQuery = {
  list: (cacheBuster: number) =>
    convexQuery(api.texts.getRandomText, { cacheBuster }),
}
