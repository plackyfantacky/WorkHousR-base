import './bootstrap'

import React from "react"

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = window.document.getElementsByTagName('title')[0]?.innerText

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Screens/${name}.jsx`, import.meta.glob('./Screens/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <App {...props} />
        )
    }
})