import data from '../../public/locales/en/feelings.json'

export interface Feeling {
  id: string;
  name: string;
}

export interface FeelingsGroup {
  id: string;
  sentimentId: string;
  name: string;
  feelings: Feeling[];
}

export interface SentimentGroup {
  id: string;
  name: string;
  groups: FeelingsGroup[];
}

export const getSentimentGroups = (): SentimentGroup[] =>
  Object.entries(data)
    .filter(([_, value]) => typeof value !== 'string')
    .map(([sentimentId, value]) => ({
      id: sentimentId,
      name: `${sentimentId}.term`,
      groups: Object.entries(value)
        .filter(([_, value]) => typeof value !== 'string')
        .map(([groupId, value]) => ({
          id: groupId,
          sentimentId,
          name: `${sentimentId}.${groupId}.term`,
          feelings: Object.keys(value).map((feelingId) => ({
            id: feelingId,
            name: `${sentimentId}.${groupId}.${feelingId}`,
          }))
        }))
    }))

export const getFeelingsGroups = (): FeelingsGroup[] =>
  getSentimentGroups().flatMap(({ groups }) => groups)