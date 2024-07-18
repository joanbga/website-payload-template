import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export default function AlertBox() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  )
}
