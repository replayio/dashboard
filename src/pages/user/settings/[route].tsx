import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const VALID_ROUTES = ["account", "api-keys", "support", "legal"];

export default function Page() {
  const router = useRouter();
  const route = router.query.route as string;

  useEffect(() => {
    if (route && VALID_ROUTES.includes(route)) {
      router.replace(`/home?openSettings=${route}`);
    } else if (route !== undefined) {
      router.replace("/home");
    }
  }, [route, router]);

  return null;
}

Page.Layout = DefaultLayout;

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ route: string }>) {
  return { props: {} };
}
