import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import { User } from '../User'

export type FlashMessage = {
    message: string
    time: number
}

export type PageProps = InertiaPageProps & {
    auth?: {
        user?: User
    }

    flash?: {
        success?: FlashMessage
        error?: FlashMessage
        info?: FlashMessage
        warning?: FlashMessage
    }
}