import { NextApiHandler } from 'next'

const handler: NextApiHandler = (_, res) => {
    return res.status(200).json({ status: 'ok' })
}
export default handler
