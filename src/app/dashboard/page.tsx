'use client'

import { useOrganization } from "@clerk/nextjs"

export default function DashboardPage() {
  const { isLoaded, organization } = useOrganization()

  if (!isLoaded) return null

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard. You are part of the {organization?.name} organization.</p>
    </>
  )
}
