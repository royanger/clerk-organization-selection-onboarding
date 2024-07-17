'use client'

import * as React from 'react'
import { OrganizationList, useOrganization } from "@clerk/nextjs";

export default function OrganizationSelection() {
  const { isLoaded, organization } = useOrganization()

  React.useEffect(() => {

    if (isLoaded) {
      console.log('organization', organization)
    }

  }, [isLoaded, organization])


  return (
    <>
      <p>Select an Org</p>
      <OrganizationList hidePersonal />
    </>
  )
}


