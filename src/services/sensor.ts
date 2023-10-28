import { AxiosResponse } from 'axios'
import api from "./api"

export const listSensorData = async (companyId: string, days?: number) => {
    const { data }: AxiosResponse<Record<string, any>[]> = await api.get(`/sensor/${companyId}?days=${days}`)

    const labels = data.map(({ timestamp }) => timestamp.split(' ')[1])
    const values = data.map(({ Value }) => Value)

    return [labels, values]
}