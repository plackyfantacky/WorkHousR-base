import './bootstrap'
import '../css/app.css'

import React from "react"
//import { RecoilRoot, RecoilEnv } from 'recoil'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

//RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const appName = window.document.getElementsByTagName('title')[0]?.innerText

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Screens/${name}.jsx`, import.meta.glob('./Screens/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            // <RecoilRoot>
                <App {...props} />
            //</RecoilRoot>
        )
    }
})