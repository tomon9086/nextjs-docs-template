import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export const handler = () => nc<NextApiRequest, NextApiResponse>()
