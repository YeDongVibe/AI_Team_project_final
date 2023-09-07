// 리덕스 스토어
import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'

const initializeStore = () => {
    const store = configureStore({reducer: {}})

    return store
}

// 리덕스 스토어 사용 커스텀 훅
export function useStore() {
    const store = useMemo(() => initializeStore(), [])
    return store
}