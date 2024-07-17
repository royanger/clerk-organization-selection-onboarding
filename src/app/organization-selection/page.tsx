import { auth } from "@clerk/nextjs/server";
import OrganizationSelection from "~/components/organization-selection";

export default async function OrganizationSelectionPage({
  searchParams
}: {
  searchParams: { redirect_url: string }
}) {
  const { userId, orgId } = auth()

  console.log('search params:', searchParams.redirect_url)
  return <OrganizationSelection />

}

