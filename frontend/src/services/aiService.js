import { request } from './api.js'

export const aiService = {
    triage: async (assetId, complaint) => {
        const res = await request('/ai/triage', {
            method: 'POST',
            body: JSON.stringify({ assetId, complaint })
        })

        return res.data
    }
}
