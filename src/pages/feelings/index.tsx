import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { MainPanel } from '@/components/Panels'
import { SentimentGroup, getSentimentGroups } from '@/features/feelings'
import { Anchor } from '@/components/Anchor'

interface FeelingGroupsPageProps {
  groups: SentimentGroup[];
}

const FeelingGroupsPage = ({ groups }: FeelingGroupsPageProps) => {
  const { t } = useTranslation('feelings');
  return (
    <MainPanel className="gap-8">
      {groups
        .map(sentiment =>
          <dl key={sentiment.id} className={
            sentiment.id === "positive"
              ? "text-green-200"
              : "text-red-200"
          }>
            <dt>{t(sentiment.name)}</dt>
            {sentiment.groups.map(group =>
              <dd key={group.id}>
                <Anchor href={`/feelings/${group.id}`}>{t(group.name)}</Anchor>
              </dd>
            )}
          </dl>
        )
      }
    </MainPanel>
  )
}

export default FeelingGroupsPage;

export const getStaticProps: GetStaticProps<FeelingGroupsPageProps> = async ({ locale = "en" }) =>
({
  props: {
    groups: getSentimentGroups(),
    ...(await serverSideTranslations(locale, undefined, undefined, ["en", "da"])),
  }
})