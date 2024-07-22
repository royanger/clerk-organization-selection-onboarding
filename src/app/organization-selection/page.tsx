import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrganizationSelectionPage({
  searchParams
}: {
  searchParams: { redirect_url: string }
}) {
  const { orgId } = auth()

  if (orgId) {
    // If the orgId is truthy, then redirect the user to the redirect_url if present
    if (searchParams.redirect_url) {
      redirect(searchParams.redirect_url)
    }

    // If there is no redirect_url, redirect to /dashboard
    redirect("/dashboard")

  }
  return (
    <>
      <h1>Select an organization</h1>
      <OrganizationList hidePersonal />
    </>
  )

}

