import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { MainPanel } from '@/components/Panels'
import { getFeelingsGroups, FeelingsGroup } from '@/features/feelings'
import { Anchor } from '@/components/Anchor'

interface FeelingsPageProps {
  group: FeelingsGroup;
}

const FeelingsPage = ({ group }: FeelingsPageProps) => {
  const { t } = useTranslation('feelings');
  return (
    <MainPanel className={group.sentimentId === "positive" ? "text-green-200" : "text-red-200"}>
      {group.feelings.map(value =>
        <Anchor key={value.id} href={`/feelings/${group.id}/${value.id}`}>{t(value.name)}</Anchor>
      )}
    </MainPanel>
  )
}

export default FeelingsPage;

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  return {
    paths: locales.flatMap(locale =>
      getFeelingsGroups()
        .map(x => ({
          params: {
            group: x.id,
          },
          locale
        }))
    ),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps<FeelingsPageProps, { group: string }> = async ({ params, locale = "en" }) => {
  const result = getFeelingsGroups().find(x => x.id === params?.group)
  if (!result) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      group: result,
      ...(await serverSideTranslations(locale, ['feelings'])),
    }
  }
}