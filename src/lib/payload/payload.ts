import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CollectionSlug, GlobalSlug } from 'payload'
import { Options as GlobalOptions } from 'node_modules/payload/dist/globals/operations/local/findOne'
import { Options as CollectionOptions } from 'node_modules/payload/dist/collections/operations/local/find'

export async function getPayload() {
  return getPayloadHMR({ config: configPromise })
}

export async function findGlobal<TSlug extends GlobalSlug>(options: GlobalOptions<TSlug>) {
  const payload = await getPayload()
  return payload.findGlobal(options)
}

export async function findCollection(options: CollectionOptions<CollectionSlug>) {
  const payload = await getPayload()
  return payload.find(options)
}
