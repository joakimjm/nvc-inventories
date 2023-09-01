import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { Anchor } from '@/components/Anchor'
import { MainPanel } from '@/components/Panels'
import { useTranslation } from 'next-i18next'

const Home = () => {
  const { t } = useTranslation();
  return (
    <MainPanel className='flex flex-col gap-8'>
      <Anchor href="/feelings">{t("feelings")}</Anchor>
      <Anchor href="#" className="opacity-20">{t("needs")}</Anchor>
    </MainPanel>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale = "en" }) =>
({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
