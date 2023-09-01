import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { MainPanel } from '@/components/Panels'
import { getFeelingsGroups, FeelingsGroup, Feeling } from '@/features/feelings'
import { List } from 'purify-ts'

interface FeelingPageProps {
  group: FeelingsGroup;
  feeling: Feeling;
}

const FeelingPage = ({ group, feeling }: FeelingPageProps) => {
  const { t } = useTranslation('feelings');
  return (
    <MainPanel className={classNames("flex flex-col", group.sentimentId === "positive" ? "text-green-200" : "text-red-200")}>
      <h1 className="text-7xl font-bold">{t(feeling.name)}</h1>
    </MainPanel>
  )
}

export default FeelingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getFeelingsGroups()
      .flatMap((group) => group.feelings.map(feeling => ({ group, feeling })))
      .map(({ feeling, group }) => ({
        params: {
          group: group.id,
          feeling: feeling.id
        }
      })),
    fallback: true, // false or "blocking"
  }
}

export const getStaticProps: GetStaticProps<FeelingPageProps, { group: string, feeling: string }> = async ({ params, locale = "en" }) => {
  const result = List.find(x => x.id === params?.group, getFeelingsGroups())
    .map(group => ({
      group,
      feeling: group.feelings.find(y => y.id === params?.feeling)!
    }))
    .filter(x => !!x.feeling)

  if (result.isNothing()) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      ...result.unsafeCoerce(),
      ...(await serverSideTranslations(locale, ['feelings'])),
    }
  }
}