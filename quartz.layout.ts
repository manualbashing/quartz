import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
    head: Component.Head(),
    header: [],
    afterBody: [
        Component.ConditionalRender({
            component: Component.RecentNotes({ title: "" }),
            condition: (page) => page.fileData.slug == "index",
        }),
    ],
    footer: Component.Footer({
        links: {
            RSS: "https://manuel.batsching.cloud/index.xml",
            Mastodon: "https://nerdculture.de/@mba",
            GitHub: "https://github.com/manualbashing",
        },
    }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
    beforeBody: [
        Component.Flex({
            components: [
                { Component: Component.Search() },
                {
                    Component: Component.Breadcrumbs({
                        rootName: "🏡",
                    }),
                },
            ],
        }),
        Component.Flex({
            components: [
                { Component: Component.ArticleTitle() },
                { Component: Component.Darkmode() },
            ]
        }),
        Component.ContentMeta({ showReadingTime: false }),
        Component.TableOfContents({ layout: "legacy" }),
    ],
    left: [],
    right: []
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
    beforeBody: [
        Component.Flex({
            components: [
                { Component: Component.Search() },
                {
                    Component: Component.Breadcrumbs({
                        rootName: "🏡",
                    }),
                },
            ],
        }),
        Component.Flex({
            components: [
                { Component: Component.ArticleTitle() },
                { Component: Component.Darkmode() },
            ]
        }),
        Component.ContentMeta({ showReadingTime: false }),
    ],
    left: [],
    right: [],
}
