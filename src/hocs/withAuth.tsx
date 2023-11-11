import { useEffect } from 'react'
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const withAuth = (Component: React.FC<any>) => (props: any) => {
    const { authenticated } = useSelector((state: RootState) => state.authSlice)

    useEffect(() => {
        if (!authenticated) {
            window.location.replace('/login')
        }
    }, [])

    return <Component {...props} />
}